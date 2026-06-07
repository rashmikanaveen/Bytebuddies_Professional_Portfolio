---
name: Institutional Stability Dark
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c0c7d3'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8a919c'
  outline-variant: '#404751'
  surface-tint: '#9ecaff'
  primary: '#9ecaff'
  on-primary: '#003258'
  primary-container: '#006fba'
  on-primary-container: '#e5efff'
  inverse-primary: '#0061a4'
  secondary: '#72de69'
  on-secondary: '#003a05'
  secondary-container: '#038218'
  on-secondary-container: '#d8ffcd'
  tertiary: '#bcc7de'
  on-tertiary: '#263143'
  tertiary-container: '#616c81'
  on-tertiary-container: '#e7eeff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9ecaff'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#00497d'
  secondary-fixed: '#8efb82'
  secondary-fixed-dim: '#72de69'
  on-secondary-fixed: '#002202'
  on-secondary-fixed-variant: '#00530b'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  mono-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is engineered for the high-stakes environment of commercial banking, prioritizing reliability, security, and unwavering permanence. The aesthetic follows a **Corporate / Modern** movement, adapted for a high-performance dark environment. 

The brand personality is authoritative yet technologically progressive. By utilizing a deep, nocturnal foundation, the UI evokes a sense of "always-on" global markets and executive confidentiality. The emotional response should be one of calm assurance and analytical clarity, achieved through precise alignment, generous negative space, and a refined color application that avoids visual fatigue during extended periods of financial auditing or asset management.

## Colors

The palette is anchored by a deep midnight blue base, which serves as a canvas for high-contrast typography and brand-specific accents. 

- **Primary Blue (#006FBA):** Reserved for primary actions, active states, and critical navigation elements. It represents the bank's core identity.
- **Ecological Green (#4CB748):** Used as a secondary accent specifically for positive growth indicators, "success" status messaging, and ESG-related data points.
- **Neutral / Surface:** The background uses a strict slate (#0f172a). Elevation is handled through a tonal shift to #1e293b rather than traditional drop shadows, ensuring a flat, modern architectural feel.
- **Text:** High-contrast light gray (#f8fafc) is used for primary headers, while secondary information uses a muted 60% opacity to maintain a clear visual hierarchy.

## Typography

This design system utilizes **Public Sans** for its institutional clarity and neutral, government-grade legibility. The type scale is optimized for dense data environments typical of commercial banking dashboards.

Headlines use a semi-bold weight with slight negative letter-spacing to appear compact and authoritative. Body copy is set with generous line height (1.6) to ensure readability against the dark background. For numerical data, tables, and financial tickers, **Inter** is used as a secondary font for its superior tabular lining and readability in small formats.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy for desktop dashboards to ensure data columns remain predictable and scannable. A 12-column grid is standard, with 24px gutters.

Spacing follows a strict 4px base unit. Component internal padding should be generous (typically 16px or 24px) to prevent the "claustrophobic" feel often found in legacy financial software. Layouts should prioritize vertical rhythm, using the `xl` (40px) spacing to clearly separate distinct functional modules or sections.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** rather than traditional shadows. This approach maintains a crisp, professional look that performs well on high-resolution displays.

1.  **Level 0 (Base):** The #0f172a background. Used for the overall canvas.
2.  **Level 1 (Surface):** The #1e293b color. Used for cards, sidebars, and navigation headers.
3.  **Level 2 (Interaction):** Slight lightening of the #1e293b surface (approx +5% brightness) upon hover.
4.  **Borders:** All surfaces are defined by 1px solid borders in #1e293b. This creates a "structural grid" look that emphasizes precision. Shadows are only used for ephemeral elements like dropdown menus or tooltips, where a subtle, diffused dark shadow is applied to provide distinct separation from the content below.

## Shapes

The shape language is conservative and geometric. A subtle **4px (Soft)** corner radius is applied to standard UI components like buttons, input fields, and tags. Large containers and cards may use an **8px** radius to provide a slightly more modern, approachable feel without compromising the institutional aesthetic. Sharp corners are avoided to prevent a "harsh" technical feel, while excessive roundness is avoided to maintain a serious, commercial tone.

## Components

- **Buttons:** Primary buttons use the corporate blue (#006FBA) with white text. Secondary buttons use an outline style with #1e293b borders and white text. Ghost buttons are used for low-priority actions.
- **Input Fields:** Backgrounds should be #0f172a (base) with a 1px border of #1e293b. On focus, the border transitions to Primary Blue.
- **Chips / Tags:** Used for status. "Growth" chips use the ecological green (#4CB748) with a 10% opacity background of the same color for high legibility without being overwhelming.
- **Lists & Tables:** Rows use subtle 1px bottom borders (#1e293b). Alternate row striping is not required; instead, hover states highlight rows using a lightened surface color.
- **Cards:** Defined by the surface color (#1e293b) and a 4px corner radius. Cards should not have shadows unless they are "floating" or "draggable."
- **Data Visualizations:** Charts should utilize the brand primary and secondary colors, supplemented by a palette of slate grays for secondary data series to ensure the bank’s identity remains the focal point.