---
name: Neo-Manga Cyberpunk
colors:
  surface: '#12121d'
  surface-dim: '#12121d'
  surface-bright: '#393844'
  surface-container-lowest: '#0d0d17'
  surface-container-low: '#1b1b25'
  surface-container: '#1f1f29'
  surface-container-high: '#292934'
  surface-container-highest: '#34343f'
  on-surface: '#e4e1f0'
  on-surface-variant: '#e3bdc5'
  inverse-surface: '#e4e1f0'
  inverse-on-surface: '#302f3b'
  outline: '#aa888f'
  outline-variant: '#5b3f46'
  surface-tint: '#ffb1c5'
  primary: '#ffb1c5'
  on-primary: '#65002f'
  primary-container: '#ff4a8e'
  on-primary-container: '#590028'
  inverse-primary: '#ba005c'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#dec800'
  on-tertiary: '#373100'
  tertiary-container: '#c0ad00'
  on-tertiary-container: '#484000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e1'
  primary-fixed-dim: '#ffb1c5'
  on-primary-fixed: '#3f001b'
  on-primary-fixed-variant: '#8f0045'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#fde400'
  tertiary-fixed-dim: '#dec800'
  on-tertiary-fixed: '#201c00'
  on-tertiary-fixed-variant: '#504700'
  background: '#12121d'
  on-background: '#e4e1f0'
  surface-variant: '#34343f'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Chivo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Chivo
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Chivo
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.14em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system pairs high-octane cyberpunk anime aesthetics with tactile comic book energy and mechanical game HUD elements. Engineered for high-impact creative portfolios, experimental tech showcases, and game dev showcases, the interface presents content as an interactive anime UI overlay.

The style merges neo-brutalism, manga halftone screentones, and dynamic game-quest interfaces:
- **Graphic Contrast:** Razor-sharp 2px to 3px solid black contours isolate vivid electronic pigments against pitch-dark voids.
- **Harsh Kinetic Shadows:** Pure un-blurred directional drop shadows anchor elements to an active 2D comic plane.
- **Diegetic Metadata:** HUD accents, Japanese kanji/katakana index markers (`// 作品番号`, `SYS.RDY`, `STATUS: LV.MAX`), scanline textures, and angled corner cuts reinforce the feeling of an in-engine terminal.
- **Emotional Stance:** Bold, kinetic, defiant, high-energy, and unmistakably stylized.

## Colors
The color palette draws directly from classic cel-shaded anime nightscapes, screen prints, and glowing arcade CRTs.

- **Primary (`#ff2a85` - Neon Sakura):** Used for focal action items, lethal states, hero tags, active interactive states, and glowing edge accents.
- **Secondary (`#00f0ff` - Electric Cyan):** Dedicated to technical data, live terminals, HUD dividers, secondary buttons, and active skill indicators.
- **Tertiary (`#ffe600` - High-Voltage Yellow):** Reserved for quest objective highlights, warning badges, notification counters, and critical tags.
- **Neutral Surface Canvas (`#0a0a14` & `#0f172a`):** Deep abyssal ink base that maximizes neon vibrancy while maintaining deep contrast.
- **Structural Black (`#000000`):** Strict outline boundaries, hard drop shadows, and comic divider strips.
- **Pure White (`#ffffff`):** Display headers, max-contrast text nodes, and halftone dot matrices.

## Typography
Typography is treated as narrative architecture. 

- **Display & Headings (Space Grotesk):** Aggressive, futuristic proportions with geometric authority. Headings should be styled uppercase when used in hero placements or project section headers. Pair with tilted 4° or 6° italicized skews where extreme kinetic force is needed.
- **Body Text (Chivo):** Crisp, readable grotesque structure delivering effortless legibility against dark slate and halftone backgrounds.
- **Labels, Telemetry, and Badges (Space Mono):** Fixed-pitch code type providing industrial terminal diagnostics, Japanese bracketed annotations (e.g. `【 アーカイブ // 01 】`), stats tickers, and mission objective indicators.

## Layout & Spacing
The layout leverages a dynamic 12-column modular grid across desktop viewports, 8 columns on tablets, and 4 columns on mobile screens. 

- **Grid Alignment:** Canvas sections rely on clear, deliberate bounding boxes. Elements conform tightly to hard coordinate lines, echoing manga page panels and video game HUD viewports.
- **Framing & Insets:** Generous page margins ensure UI components float cleanly away from browser edges, framed within stylized outer coordinate brackets (`+`, `L-shaped markers`).
- **Asymmetry & Overlap:** Feature banners and portfolio asset thumbnails intentionally break their frame by 8px to 16px along the X/Y axes to create manga-style pop-out depth.

## Elevation & Depth
Elevation abandons soft physical blurs entirely in favor of flat comic-cel pop and directional ink offset:

- **Comic Hard Drop Shadow:** Elevated elements cast sharp, un-feathered `4px 4px 0px #000000` or `6px 6px 0px #000000` shadows. Hover states compress or expand this offset (`2px 2px` on active press, `6px 6px` on hover).
- **Ink Outlines:** All interactive items, cards, badges, and structural dialogs are bounded by `2px` or `3px` solid `#000000` borders. On dark backgrounds, an inner border or hairline outline of `#00f0ff` or `#ff2a85` provides a glowing dual-stroke effect.
- **Halftone Screentones:** Low-elevation panels incorporate a subtle 45-degree dot matrix pattern (`radial-gradient(#00f0ff 1px, transparent 1px)` spaced at `6px`), evoking traditional manga print screens.
- **HUD Reticles:** Floating contextual menus sit on high z-indices with neon corner brackets and scanline backdrops rather than standard blurred glass.

## Shapes
The shape grammar is rigorously sharp (`roundedness: 0`). Curved radii are eliminated to mirror mechanical displays, weapon HUDs, and angular comic panels.

- **Chamfered Cuts:** Key interactive elements and modal headers feature 45-degree corner bevels (`clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)`).
- **Angular Notches:** Section badges and tags utilize asymmetric cutouts and jagged warning-stripe divider ends.
- **Bracket Motifs:** Card edges frequently integrate mechanical corner caps or target crosshairs at the vertices.

## Components

### Buttons
- **Primary Action (Strike Button):** Solid `#ff2a85` fill, `2px solid #000000` border, `Space Mono` bold uppercase text in `#ffffff`. Hard offset shadow `4px 4px 0px #000000`. Hover state triggers translation (`transform: translate(-2px, -2px)`) with expanded shadow `6px 6px 0px #ffe600`. Active state compresses to `0px 0px`.
- **Secondary (Cyber Deck):** Dark `#0f172a` fill, `2px solid #00f0ff` inner edge with `#000000` structural border, cyan monospace label. Hover shifts background to `#00f0ff` with `#000000` text.
- **Ghost/HUD Icon Button:** Transparent background, corner brackets, glowing neon icon, sharp hover fill.

### Cards & Quest Boards
- **Portfolio Project Card:** Framed in `2px solid #000000` on `#0f172a` canvas, topped with an index bar featuring Japanese typography (e.g. `PROJ_004 // 境界線`). Drop shadow: `5px 5px 0px #000000`. 
- **Quest Board Entry:** Includes high-contrast status ribbons (`LV.MAX`, `IN PROGRESS`, `MISSION CLEAR`), stylized EXP/Skill bars in `#ffe600`, and pixel-style asset tags.
- **Halftone Backdrop:** Card media thumbnails include a 2px inner black border with a neon-tinted halftone overlay that clears on hover.

### Badges & Chips
- **Telemetry Chips:** Flat `#ffe600` or `#00f0ff` backgrounds, bold `#000000` text, zero border-radius, accompanied by leading technical glyphs (`[ SYS ]`, `// 01`).
- **Status Pills:** Angled edges via chamfer cuts, solid neon background with blinking status indicator squares.

### Form Inputs & Fields
- **Input Fields:** `#0a0a14` interior, `2px solid #0f172a` resting state, transitioning to `2px solid #00f0ff` on focus with an immediate `3px 3px 0px #00f0ff` shadow. 
- **Labels:** Uppercase `Space Mono` fixed directly above the field with technical prefixes (`INPUT://_`).

### Checkboxes & Radios
- **Checkboxes:** Square boxes with `2px solid #000000`, background `#0f172a`. Checked state displays a solid `#ff2a85` fill with a stark white graphic slash or pixel checkmark.
- **Radio Buttons:** Diamond-rotated squares (`rotate-45`) with sharp corners; selected state features an inner diamond in `#ffe600`.

### Data Meters & HUD Elements
- **HP/Skill Status Gauges:** Segmented block meters with individual cell cutoffs, filling from `#00f0ff` through `#ffe600` to `#ff2a85`.
- **Corner Target Brackets:** Absolute positioned `L` marks on outer containers measuring 8px by 8px with 2px stroke in `#00f0ff`.