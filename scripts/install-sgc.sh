#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Starehe Girls' Centre — Git Clone + Docker + Apache2 (2896, 2685, HTTPS)
# ==============================================================================
# Usage:
#   chmod +x scripts/install-sgc.sh
#   sudo REPO_URL="https://github.com/<org>/<repo>.git" ./scripts/install-sgc.sh
#
# Optional environment overrides:
#   DOMAIN=sgc.kkdes.co.ke
#   APP_DIR=/var/www/sgc.kkdes.co.ke
#   BRANCH=master
#   REPO_URL=<git-repo-url>
#   ADMIN_SEED_EMAIL=<admin-email>
#   ADMIN_SEED_PASSWORD=<admin-password>
# ==============================================================================

DOMAIN="${DOMAIN:-sgc.kkdes.co.ke}"
APP_DIR="${APP_DIR:-/var/www/${DOMAIN}}"
BRANCH="${BRANCH:-master}"
REPO_URL="${REPO_URL:-https://github.com/Alee24/SGC.git}"
COMPOSE_FILE="docker-compose.prod.yml"
APACHE_SITE="/etc/apache2/sites-available/${DOMAIN}.conf"

log() { printf '\n[starehe-install] %s\n' "$*"; }
warn() { printf '\n[starehe-install][WARN] %s\n' "$*" >&2; }
fail() { printf '\n[starehe-install][ERROR] %s\n' "$*" >&2; exit 1; }

if [[ "${EUID}" -ne 0 ]]; then
  fail "Please run this script as root or with sudo: sudo $0"
fi

# 1. Install prerequisites, Apache2, Certbot, and Docker Engine + Compose v2
log "Installing system packages, Apache2, and Certbot..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq \
  ca-certificates curl git gnupg openssl dnsutils \
  apache2 certbot python3-certbot-apache

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

docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 plugin is required."

# 2. Create target folder and clone/update from Git
log "Preparing application directory: ${APP_DIR}"
mkdir -p "${APP_DIR}"

if [[ -d "${APP_DIR}/.git" ]]; then
  log "Repository already exists in ${APP_DIR}. Pulling latest (${BRANCH})..."
  git -C "${APP_DIR}" fetch --all --prune
  git -C "${APP_DIR}" checkout "${BRANCH}"
  git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
else
  if [[ -z "${REPO_URL}" ]]; then
    read -r -p "Enter Git repository URL to clone into ${APP_DIR}: " REPO_URL
  fi
  [[ -n "${REPO_URL}" ]] || fail "REPO_URL is required when ${APP_DIR} is not yet a git repository."
  log "Cloning ${REPO_URL} (branch: ${BRANCH}) into ${APP_DIR}..."
  git clone --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
fi

cd "${APP_DIR}"

# 3. Configure .env securely (never overwrite existing .env)
if [[ ! -f "${APP_DIR}/.env" ]]; then
  log "Creating ${APP_DIR}/.env..."
  SESSION_SECRET="$(openssl rand -hex 32)"

  if [[ -z "${ADMIN_SEED_EMAIL:-}" ]]; then
    if [[ -r /dev/tty ]]; then
      read -r -p "Enter Admin Email (e.g. admin@starehegirlscentre.co.ke): " ADMIN_SEED_EMAIL < /dev/tty
    else
      read -r -p "Enter Admin Email (e.g. admin@starehegirlscentre.co.ke): " ADMIN_SEED_EMAIL
    fi
  fi
  if [[ -z "${ADMIN_SEED_PASSWORD:-}" ]]; then
    if [[ -r /dev/tty ]]; then
      read -r -s -p "Enter Admin Password: " ADMIN_SEED_PASSWORD < /dev/tty
      printf '\n' > /dev/tty
    else
      read -r -s -p "Enter Admin Password: " ADMIN_SEED_PASSWORD
      printf '\n'
    fi
  fi

  [[ -n "${ADMIN_SEED_EMAIL}" ]] || fail "ADMIN_SEED_EMAIL cannot be empty. Pass it via: sudo ADMIN_SEED_EMAIL='you@example.com' ADMIN_SEED_PASSWORD='YourPassword' ./scripts/install-sgc.sh"
  [[ -n "${ADMIN_SEED_PASSWORD}" ]] || fail "ADMIN_SEED_PASSWORD cannot be empty. Pass it via: sudo ADMIN_SEED_EMAIL='you@example.com' ADMIN_SEED_PASSWORD='YourPassword' ./scripts/install-sgc.sh"

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

# 4. Build and start Docker container on 127.0.0.1:3001
log "Building Docker image and starting starehe_girls_web..."
docker compose -f "${COMPOSE_FILE}" build --no-cache
docker compose -f "${COMPOSE_FILE}" up -d
docker image prune -f >/dev/null || true

log "Waiting for starehe_girls_web healthcheck..."
for i in $(seq 1 30); do
  STATUS="$(docker inspect --format='{{.State.Health.Status}}' starehe_girls_web 2>/dev/null || echo "starting")"
  if [[ "${STATUS}" == "healthy" ]]; then
    log "starehe_girls_web is healthy."
    break
  fi
  if [[ "${i}" -eq 30 ]]; then
    docker compose -f "${COMPOSE_FILE}" logs --tail=50 web
    fail "starehe_girls_web did not become healthy in time (status: ${STATUS})."
  fi
  sleep 3
done

# 5. Configure Apache2 modules and Ports 2896, 2685, 80, 443
log "Enabling required Apache2 modules..."
a2enmod proxy proxy_http proxy_wstunnel ssl headers rewrite >/dev/null

for port in 2896 2685; do
  if ! grep -Eq "^[[:space:]]*Listen[[:space:]]+${port}\b" /etc/apache2/ports.conf; then
    echo "Listen ${port}" >> /etc/apache2/ports.conf
    log "Added Listen ${port} to /etc/apache2/ports.conf"
  fi
done

mkdir -p /var/www/certbot/.well-known/acme-challenge

# 6. Issue Let's Encrypt SSL certificate (with temporary self-signed fallback)
LE_CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
LE_KEY="/etc/letsencrypt/live/${DOMAIN}/privkey.pem"
FALLBACK_DIR="/etc/ssl/${DOMAIN}"

# Start with HTTP-only bootstrap vhost for ACME challenge if cert doesn't exist yet
if [[ ! -f "${LE_CERT}" ]]; then
  cat > "${APACHE_SITE}" <<EOF
<VirtualHost *:80>
    ServerName ${DOMAIN}
    DocumentRoot /var/www/certbot
    Alias /.well-known/acme-challenge/ /var/www/certbot/.well-known/acme-challenge/
    <Directory "/var/www/certbot/.well-known/acme-challenge/">
        Options None
        AllowOverride None
        Require all granted
    </Directory>
    ProxyPreserveHost On
    ProxyPass /.well-known/acme-challenge/ !
    ProxyPass / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/
</VirtualHost>
EOF
  a2dissite 000-default.conf default-ssl.conf >/dev/null 2>&1 || true
  a2ensite "${DOMAIN}.conf" >/dev/null
  apache2ctl configtest
  systemctl enable --now apache2
  systemctl reload apache2

  CERT_EMAIL="$(grep -E '^ADMIN_SEED_EMAIL=' "${APP_DIR}/.env" | cut -d'=' -f2- || true)"
  if [[ -n "${CERT_EMAIL}" ]]; then
    log "Attempting Let's Encrypt certificate issuance for ${DOMAIN}..."
    if ! certbot certonly --webroot -w /var/www/certbot -d "${DOMAIN}" \
      --non-interactive --agree-tos -m "${CERT_EMAIL}"; then
      warn "Let's Encrypt failed (ensure DNS A record points to this server). Creating temporary self-signed cert."
    fi
  fi
fi

if [[ -f "${LE_CERT}" && -f "${LE_KEY}" ]]; then
  SSL_CERT="${LE_CERT}"
  SSL_KEY="${LE_KEY}"
  log "Using Let's Encrypt certificate: ${SSL_CERT}"
else
  mkdir -p "${FALLBACK_DIR}"
  SSL_CERT="${FALLBACK_DIR}/fullchain.pem"
  SSL_KEY="${FALLBACK_DIR}/privkey.pem"
  if [[ ! -f "${SSL_CERT}" ]]; then
    openssl req -x509 -nodes -newkey rsa:2048 -days 90 \
      -keyout "${SSL_KEY}" -out "${SSL_CERT}" \
      -subj "/CN=${DOMAIN}" >/dev/null 2>&1
  fi
  warn "Using temporary self-signed certificate at ${SSL_CERT}. Run certbot once DNS resolves."
fi

# 7. Install complete Apache VirtualHost config (ports 80, 443, 2896, 2685)
sed \
  -e "s|/etc/letsencrypt/live/sgc\.kkdes\.co\.ke/fullchain\.pem|${SSL_CERT}|g" \
  -e "s|/etc/letsencrypt/live/sgc\.kkdes\.co\.ke/privkey\.pem|${SSL_KEY}|g" \
  -e "s|sgc\.kkdes\.co\.ke|${DOMAIN}|g" \
  "${APP_DIR}/apache/sgc.kkdes.co.ke.conf" > "${APACHE_SITE}"

a2dissite 000-default.conf default-ssl.conf >/dev/null 2>&1 || true
a2ensite "${DOMAIN}.conf" >/dev/null
apache2ctl configtest
systemctl enable --now apache2
systemctl reload apache2

# 8. Open firewall ports if UFW is active
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  log "Allowing ports 80, 443, 2896, and 2685 through UFW..."
  ufw allow 80/tcp >/dev/null
  ufw allow 443/tcp >/dev/null
  ufw allow 2896/tcp >/dev/null
  ufw allow 2685/tcp >/dev/null
fi

# 9. Verify endpoints (forcing Host header & local SNI resolution)
log "Verifying endpoints..."
printf '  Docker backend (127.0.0.1:3001) : HTTP %s\n' "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo '000')"
printf '  Apache Port 2896 (HTTP)         : HTTP %s\n' "$(curl -s -o /dev/null -w '%{http_code}' -H "Host: ${DOMAIN}" http://127.0.0.1:2896/ || echo '000')"
printf '  Apache Port 2685 (HTTPS)        : HTTP %s\n' "$(curl -sk -o /dev/null -w '%{http_code}' --resolve "${DOMAIN}:2685:127.0.0.1" "https://${DOMAIN}:2685/" || echo '000')"
printf '  Apache Port 443 (HTTPS)         : HTTP %s\n' "$(curl -sk -o /dev/null -w '%{http_code}' --resolve "${DOMAIN}:443:127.0.0.1" "https://${DOMAIN}/" || echo '000')"

cat <<EOF

==============================================================================
Installation Complete for ${DOMAIN}
==============================================================================
App Folder      : ${APP_DIR}
Apache Config   : ${APACHE_SITE}
Docker Compose  : ${APP_DIR}/${COMPOSE_FILE}
Ports Active    : 80 (HTTP->HTTPS), 443 (HTTPS), 2896 (HTTP), 2685 (HTTPS)
==============================================================================
EOF
