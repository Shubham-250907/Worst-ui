# 📟 The Worst Calculator™ (Turn Arithmetic into a Test of Patience)

A delightfully infuriating single-page web app built with React, Vite, and Tailwind CSS designed to turn basic arithmetic into an absurd test of endurance and motor control.

## 💀 Features

### 1. Persistent Top Bar & Perpetual Lockdown
- **Unclickable Exit Button:** Fixed red exit button at `top: 12px, left: 12px`. Smoothly dodges away whenever the cursor moves within 70px or hovers over it. It is permanently unclickable.
- **Top Search Bar & Jumpscares:** Entering any search query triggers a 1.5-second full-screen jumpscare overlay cycling through terrifying images, accompanied by a piercing high-pitched screech generated via the **Web Audio API** (`3200Hz - 4400Hz` sweep at `0.45` gain).
- **No Escape:** Even typing `"Stig Heil"` mocks the user—exit is permanently disabled.

### 2. Three-Stage Gatekeeper Flow
1. **Stage 1 — Annoying Registration Form:** Requires username, password (strictly must contain at least 1 number), and a mandatory "Reason for Doing Math". Features typing jitter animations and sarcastic low buzzers on clicks.
2. **Stage 2 — 20-Tile Captcha (Minimum 10 Images Required):** 20 crisp inline SVG illustrations in a 5x4 grid. The user must correctly identify **a minimum of 10 suspiciously happy triangles** with zero mistakes. Selecting any decoy or submitting fewer than 10 reshuffles the grid and buzzes.
3. **Stage 3 — Mandatory Re-Login:** Forces the user to re-enter their Stage 1 credentials to prove short-term memory before granting calculator access.

### 3. The Worst Functional Calculator
- **Giant Jumbled Number Buttons:** Digits `0-9` scrambled (`7, 1, 9, 4, 0, 8, 2, 6, 3, 5`). Giant `1` covers ~15% of the screen area near the top right, while other digits cover 10%-15% each with clashing colors, tilts, and Comic Sans/Papyrus fonts.
- **Microscopic Operators in Crevices:** Tiny operators (`+`, `-`, `*`, `/`, `=`, `C`) wedged into hairline gaps (~`14px x 14px` with `9px` font). A tiny `+` is wedged directly to the right of Giant `1`.
- **Bottom Red-on-Red Result Screen:** Pinned across the bottom with a `#e60000` background and `#990000` text, producing barely legible low-contrast numbers that are readable up close.
- **Accurate Arithmetic Engine:** Performs exact calculations, resets with `C`, and plays high-pitch beeps on every button press.

## 🛠️ Tech Stack
- React 18
- Vite
- Tailwind CSS
- Web Audio API (Synthesized screamers, beeps, and buzzers)
- Crisp Inline SVGs

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Shubham-250907/Worst-ui.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
