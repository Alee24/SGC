#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Starehe Girls' Centre — Production Docker Installer for sgc.kkdes.co.ke
# ==============================================================================
# Usage:
#   chmod +x scripts/install-sgc.sh
#   sudo ./scripts/install-sgc.sh
#
# Optional environment overrides:
#   DOMAIN=sgc.kkdes.co.ke
#   APP_DIR=/opt/starehe
#   REPO_URL=<git-repo-url>
#   ADMIN_SEED_EMAIL=admin@example.com
#   ADMIN_SEED_PASSWORD=<strong-password>
# ==============================================================================

DOMAIN="${DOMAIN:-sgc.kkdes.co.ke}"
APP_DIR="${APP_DIR:-/opt/starehe}"
REPO_URL="${REPO_URL:-}"
COMPOSE_FILE="docker-compose.prod.yml"

log() { printf '\n[starehe-install] %s\n' "$*"; }
warn() { printf '\n[starehe-install][WARN] %s\n' "$*" >&2; }
fail() { printf '\n[starehe-install][ERROR] %s\n' "$*" >&2; exit 1; }

if [[ "${EUID}" -ne 0 ]]; then
  fail "Please run this script as root or with sudo: sudo $0"
fi

# 1. Install base dependencies & Docker Engine + Compose plugin if missing
log "Checking system prerequisites..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ca-certificates curl git gnupg openssl dnsutils

if ! command -v docker >/dev/null 2>&1; then
  log "Installing Docker Engine and Docker Compose plugin..."
  install -m 0755 -d /etc/apt/keyrings
  . /etc/os-release
  curl -fsSL "https://download.docker.com/linux/${ID}/gpg" | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${ID} ${VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  systemctl enable --now docker
else
  log "Docker is already installed: $(docker --version)"
fi

if ! docker compose version >/dev/null 2>&1; then
  fail "Docker Compose v2 plugin is required (docker compose)."
fi

# 2. Resolve application directory (use current repo if already inside it)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${REPO_ROOT}/Dockerfile" && -f "${REPO_ROOT}/${COMPOSE_FILE}" ]]; then
  APP_DIR="${REPO_ROOT}"
  log "Using existing project directory: ${APP_DIR}"
elif [[ -n "${REPO_URL}" ]]; then
  if [[ -d "${APP_DIR}/.git" ]]; then
    log "Updating existing repository in ${APP_DIR}..."
    git -C "${APP_DIR}" pull --ff-only
  else
    log "Cloning repository into ${APP_DIR}..."
    git clone "${REPO_URL}" "${APP_DIR}"
  fi
else
  fail "Run this script from inside the Starehe repository or provide REPO_URL=<git-url>."
fi

cd "${APP_DIR}"

# 3. Check DNS for the target domain before issuing TLS certificates
RESOLVED_IP="$(dig +short "${DOMAIN}" A | tail -n 1 || true)"
SERVER_IP="$(curl -4 -fsS https://ifconfig.me 2>/dev/null || true)"
if [[ -z "${RESOLVED_IP}" ]]; then
  warn "DNS A record for ${DOMAIN} did not resolve yet. Caddy HTTPS issuance will retry automatically once DNS points to this server."
elif [[ -n "${SERVER_IP}" && "${RESOLVED_IP}" != "${SERVER_IP}" ]]; then
  warn "${DOMAIN} resolves to ${RESOLVED_IP}, while this server's public IPv4 appears to be ${SERVER_IP}."
else
  log "DNS verified: ${DOMAIN} -> ${RESOLVED_IP}"
fi

# 4. Configure .env securely (never overwrite existing .env without preserving secrets)
if [[ ! -f "${APP_DIR}/.env" ]]; then
  log "Creating ${APP_DIR}/.env..."
  SESSION_SECRET="$(openssl rand -hex 32)"

  if [[ -z "${ADMIN_SEED_EMAIL:-}" ]]; then
    read -r -p "Enter Admin Email (e.g. admin@starehegirlscentre.co.ke): " ADMIN_SEED_EMAIL
  fi
  if [[ -z "${ADMIN_SEED_PASSWORD:-}" ]]; then
    read -r -s -p "Enter Admin Password: " ADMIN_SEED_PASSWORD
    printf '\n'
  fi

  [[ -n "${ADMIN_SEED_EMAIL}" ]] || fail "ADMIN_SEED_EMAIL cannot be empty."
  [[ -n "${ADMIN_SEED_PASSWORD}" ]] || fail "ADMIN_SEED_PASSWORD cannot be empty."

  cat > "${APP_DIR}/.env" <<EOF
DOMAIN=${DOMAIN}
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
NODE_ENV=production
PORT=3000
COOKIE_SECURE=true
ADMIN_SEED_EMAIL=${ADMIN_SEED_EMAIL}
ADMIN_SEED_PASSWORD=${ADMIN_SEED_PASSWORD}
ADMIN_SESSION_SECRET=${SESSION_SECRET}
EOF
  chmod 600 "${APP_DIR}/.env"
  log "Saved ${APP_DIR}/.env with 600 permissions."
else
  log "Using existing ${APP_DIR}/.env"
fi

# 5. Open HTTP/HTTPS ports if UFW is active
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  log "Allowing HTTP (80) and HTTPS (443) through UFW..."
  ufw allow 80/tcp >/dev/null
  ufw allow 443/tcp >/dev/null
  ufw allow 443/udp >/dev/null
fi

# 6. Build and start containers
log "Building Docker images (no-cache) and starting stack..."
docker compose -f "${COMPOSE_FILE}" build --no-cache
docker compose -f "${COMPOSE_FILE}" up -d
docker image prune -f >/dev/null || true

# 7. Wait for application healthcheck
log "Waiting for starehe_girls_web to become healthy..."
for i in $(seq 1 30); do
  STATUS="$(docker inspect --format='{{.State.Health.Status}}' starehe_girls_web 2>/dev/null || echo "starting")"
  if [[ "${STATUS}" == "healthy" ]]; then
    log "Container starehe_girls_web is healthy."
    break
  fi
  if [[ "${i}" -eq 30 ]]; then
    docker compose -f "${COMPOSE_FILE}" logs --tail=50 web
    fail "starehe_girls_web did not become healthy in time (status: ${STATUS})."
  fi
  sleep 3
done

# 8. Verify local & domain HTTP responses
LOCAL_CODE="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/ || echo "000")"
log "Local container check (http://127.0.0.1:3000/): HTTP ${LOCAL_CODE}"

HTTPS_CODE="$(curl -s -o /dev/null -w '%{http_code}' "https://${DOMAIN}/" || echo "000")"
log "Public domain check (https://${DOMAIN}/): HTTP ${HTTPS_CODE}"

cat <<EOF

==============================================================================
Deployment Complete: https://${DOMAIN}
==============================================================================
Useful commands:
  cd ${APP_DIR}
  docker compose -f ${COMPOSE_FILE} ps
  docker compose -f ${COMPOSE_FILE} logs -f web caddy
  curl -I https://${DOMAIN}
==============================================================================
EOF
