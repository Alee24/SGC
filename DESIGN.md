# Starehe Girls' Centre — Institutional Design System (DESIGN.md)

## Brand World & Subject
Starehe Girls' Centre is a prestigious national charitable boarding high school in Njathaini, Nairobi, Kenya. Founded in 2005 under the patronage of Dr. Geoffrey William Griffin, Dr. Manu Chandaria, Hon. Jane Miano, and leading Kenyan women educationalists. It provides full boarding scholarships and holistic academic nurturing to high-potential girls from disadvantaged backgrounds across all 47 Kenyan counties.

The design must radiate **academic distinction, venerable heritage, and servant leadership** — like an East African Oxford or Eton with deep humanitarian roots — NOT a generic Silicon Valley SaaS startup or AI landing page template.

---

## 1. Palette & Roles

| Token | Hex | Role | Contrast Notes |
|---|---|---|---|
| `starehe-blue-950` | `#061324` | Primary brand background & deep text | 16:1 against white |
| `starehe-blue-900` | `#0c2340` | Starehe Institutional Navy (blazers, banners) | 14.5:1 against white |
| `starehe-maroon-800`| `#8b1e22` | Starehe Crimson/Maroon (school crest, accents, primary CTAs) | 7.2:1 against white |
| `starehe-gold-accent`| `#d4af37` | Antique Gold (heraldic crest highlight, honors, distinctions) | Text on navy: 7:1 |
| `starehe-sand` | `#faf8f5` | Editorial paper canvas (warm linen/stone background) | Warm, replaces sterile gray |
| `stone-900` | `#1c1917` | Primary editorial body text | 15:1 against stone-50 |
| `stone-600` | `#57534e` | Secondary body text & captions | 4.8:1 against stone-50 |

### Anti-AI Palette Rules:
- **No purple gradients** (`from-indigo-500 to-purple-600`).
- **No random emerald green** used as an alternative to purple (`text-emerald-600` or `bg-emerald-50`). Accents must remain true to school colors: Starehe Navy, Crimson Maroon, and Antique Gold.
- **No gradient clip text** on titles (`bg-clip-text text-transparent`).

---

## 2. Typography

- **Headlines & Serif Accents**: `Merriweather`, `Georgia`, `serif`.
  - Conveys academic gravitas, historic continuity, and institutional dignity.
- **Body & Data Tables**: `Inter`, system sans-serif.
  - Crisp, legible, standard line-heights (1.6 to 1.75).
- **Kickers / Subheads**: Sentence case or subtle small-caps, avoiding the repetitive `text-xs uppercase tracking-wider` template chrome on every badge.

---

## 3. Layout & Architectural Principles

- **Hero Sections**: Clean photographic documentary imagery of students, faculty, and campus with solid, legible typography.
- **Editorial Sidebars**: Sharp, tactile list navigation with clear active indicators (`border-l-4 border-starehe-maroon-800`).
- **Cards & Surfacing**: Clean 1px solid borders (`border-stone-200/80`), subtle natural shadow (`shadow-subtle`), and authentic photography.
- **No artificial glassmorphism**: Drop `backdrop-blur-md` on solid cards, sidebars, and stat callouts.
- **No decorative sparkle icons**: Remove `Sparkles` from headings, badges, and tabs.

---

## 4. Voice, Tone & Microcopy

- Authentic Kenyan educational context:
  - Mention specific facts: "Operation Plus 5", "KCSE mean score of 8.90 (B)", "CBC Senior School STEM and Arts pathways", "47 counties", "Free Blue Application Form".
  - Strictly avoid generic AI boilerplate: "world-class", "seamlessly elevate", "cutting-edge solutions", "supercharge".

