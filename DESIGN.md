# Design System: QuizApp
**Project ID:** 4286182700766597812

## 1. Visual Theme & Atmosphere
**"The Obsidian Lens."** We are not building a flat interface; we are crafting a high-end digital instrument. This system moves beyond the standard "template" look by treating the screen as a dark, physical chamber where light is trapped and refracted through layers of polished glass. Intentional asymmetry and tonal layering are used to break away from rigid, boxy grids. Elements hover in a deep, viscous fluid, prioritizing breathing room over information density so interactions feel deliberate, tactile, and premium.

## 2. Color Palette & Roles
* **Obsidian Base (`#0e0e0e`)**: The primary `surface` background setting the foundational dark tone.
* **Deep Recess (`#000000`)**: The `surface-container-lowest` color, used for deep, inset areas like search bars or code blocks.
* **Elevated Chamber (`#191919` to `#262626`)**: The `surface-container` tiers used to physically stack elevation (e.g., cards and modals) organically without borders.
* **Silver Sheen (`#c6c6c7`)**: The `primary` base that acts as the starting tone for textual pop and interactive elements.
* **Muted Platinum (`#454747`)**: The `primary-container` color, supplying the dark anchor for the liquid metal button gradients.
* **Soft Starlight (`#e5e5e5`)**: The core `on-surface` color for primary legible text. Pure white is prohibited to reduce glare.
* **Receding Dust (`#ababab`)**: The `on-surface-variant` tone used for secondary text to naturally push auxiliary information out of focus.
* **Liquid Ghost (`#484848`)**: The `outline-variant` structural color, used strictly at 15% opacity when defining boundaries is required for accessibility purposes.
* **Error Rust (`#bb5551` / `#7f2927`)**: The `error_dim` / `error_container` shades to warn users subtly while adhering to the dark, moody environment.

## 3. Typography Rules
* **Display & Headlines (Manrope):** The "Editorial Voice." Utilized for high-impact, sophisticated headers (e.g., 3.5rem sizes) tightly letter-spaced (-0.02em). The organic curves of Manrope contrast beautifully against the sharp, heavily toned UI constraints.
* **Body & UI (Inter):** The "Functional Voice." Apple-inspired cleanliness that anchors legibility. Primarily sized at 0.875rem with a generous 1.6 line height to support the airy, "Liquid Glass" physical arrangement. Use the `Soft Starlight` color for main readability and `Receding Dust` for secondary hierarchy to define depth.

## 4. Component Stylings
* **Buttons (Primary):** "Liquid Metal" aesthetic powered by a gradient from the `Silver Sheen` to `Muted Platinum` colors. Edges are softly rounded (0.75rem / `md`).
* **Buttons (Secondary):** Glassmorphic handling using a transparent background, heavy `backdrop-blur`, and a "Ghost Border" structural boundary.
* **Buttons (Tertiary):** Clean, text-only interactive element employing an animated hover underline painted with the `Silver Sheen` hue.
* **Cards/Containers:** Emphasize a soft and tactile appearance through `lg` (1rem) corner radiuses. Bounded entirely by background shifts (varying `Elevated Chamber` tier heights) rather than lines. Floating containers utilize a "liquid shadow"—a highly diffused ambient light (40-60px blur, 4-8% opacity) tinted with `Soft Starlight`.
* **Inputs/Forms:** Flat, borderless fields coated in a low-tier `Elevated Chamber` variant. Focusing transitions to a higher tier accompanied by a sharp `Silver Sheen` glow (2px blur).
* **Floating Action Navigation:** A pill-shaped `full` (9999px rounded) dock planted at the bottom of the viewport. Borrows from the highest container elevation bathed in 50% opacity and heavy `backdrop-blur` to allow the design below to pool through softly.

## 5. Layout Principles
* **Tonal Layering First:** Avoid all explicit 1px solid container borders. The interface defines blocks and boundaries solely by cascading background tones across `surface` variants.
* **Spacious Containment:** Divider lines between elements are forbidden. Structure content separation using expansive white space padding distances (1.5rem–2rem) or hover state background shifts.
* **Intentional Asymmetry:** Grids favor subtle alignment variances over hard centralization, enabling empty `Obsidian Base` spaces to act as structural guides holding the tension of the UI elements.
* **Liquid Refraction & Bleeding:** Z-index floating layers strictly command `backdrop-blur` configurations (ranging 20px–40px over 40–60% opacity) deliberately liquifying the underlying canvas features beneath overlays.
