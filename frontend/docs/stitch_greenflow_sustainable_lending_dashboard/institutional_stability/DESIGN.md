---
name: Institutional Stability
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404751'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#717782'
  outline-variant: '#c0c7d3'
  surface-tint: '#0061a4'
  primary: '#005692'
  on-primary: '#ffffff'
  primary-container: '#006fba'
  on-primary-container: '#e5efff'
  inverse-primary: '#9ecaff'
  secondary: '#006e12'
  on-secondary: '#ffffff'
  secondary-container: '#8bf880'
  on-secondary-container: '#007313'
  tertiary: '#495468'
  on-tertiary: '#ffffff'
  tertiary-container: '#616c81'
  on-tertiary-container: '#e7eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
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
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style

This design system is engineered for high-stakes institutional finance, prioritizing clarity, precision, and perceived reliability. The aesthetic is rooted in **Corporate Modernism**, characterized by a rigorous adherence to hierarchy, balanced proportions, and a sense of architectural permanence. 

The target audience includes institutional investors, corporate treasurers, and sustainability officers who require a high-density information environment that remains legible and stress-free. The UI evokes a sense of "digital vault" security—stable, transparent, and authoritative. By blending the heritage of commercial banking with modern fintech speed, the design system bridges the gap between traditional reliability and future-forward innovation.

## Colors

The color strategy centers on **Signature Corporate Blue (#006FBA)** to anchor the interface in trust and institutional history. This is complemented by **Ecological Green (#4CB748)**, which is reserved specifically for ESG (Environmental, Social, and Governance) metrics, sustainability initiatives, and positive growth indicators in data visualization.

The background ecosystem utilizes a "Cool Light" approach. Surfaces are primarily white or very light blue-grey (#F8FAFC), while structural borders and secondary text utilize a sophisticated range of blue-greys to maintain a professional, low-fatigue atmosphere. 

- **Primary:** Core branding, primary actions, and active states.
- **Secondary:** Sustainability accents and success-state visualizations.
- **Neutrals:** Subtle blue-grey tones used for dividers, borders, and disabled states to prevent the "starkness" of pure black and white.

## Typography

This design system utilizes a dual-font strategy to balance institutional authority with technical utility. **Public Sans** is used for headlines; its slightly squared-off, geometric proportions convey a sense of government-grade stability and officialdom.

**Inter** is the workhorse for body copy and data. It provides exceptional legibility at small sizes, which is critical for complex financial tables and dashboards. For financial values and tickers, the "tabular numbers" (tnum) feature of Inter must be enabled to ensure columns of figures align vertically for quick scanning.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** grid. On desktop, content is contained within a 1440px wide 12-column grid to maintain readability, while dashboard sidebars remain at a fixed 280px width. 

The spacing rhythm is built on a 4px baseline, ensuring all components align to a mathematical scale. High-density views (trading screens) use 8px and 12px units, while marketing or high-level overview pages use 24px and 40px units to introduce "breathable" whitespace that guides the user’s eye toward key performance indicators (KPIs).

## Elevation & Depth

This design system avoids heavy shadows, opting for **Tonal Layers** and **Low-Contrast Outlines** to define hierarchy. This "flat-plus" approach keeps the UI feeling modern and fast.

- **Level 0 (Background):** #F8FAFC. The foundation of the application.
- **Level 1 (Cards/Content):** White (#FFFFFF) with a 1px border in a subtle blue-grey (#E2E8F0).
- **Level 2 (Hover/Active):** A very soft, diffused shadow (0px 4px 12px rgba(0, 111, 186, 0.05)) is used only for interactive elements like cards or dropdowns to indicate "lift."
- **Level 3 (Modals):** A more pronounced but still clean shadow (0px 20px 40px rgba(15, 23, 42, 0.1)) to separate critical decision points from the rest of the UI.

## Shapes

The shape language is **Soft (0.25rem)**. This provides enough rounding to feel modern and accessible without losing the professional, "serious" edge required for a commercial bank. 

- **Small elements (Buttons, Inputs, Badges):** 0.25rem (4px).
- **Medium elements (Cards, Modals):** 0.5rem (8px).
- **Large elements (Containers):** 0.75rem (12px).

Data visualization elements, such as bars in a chart, should remain sharp (0px) or use a very minimal 2px radius to preserve the precision of the data being displayed.

## Components

### Buttons
Primary buttons use the Corporate Blue background with white text. Secondary buttons use a transparent background with a 1px Blue border. Success/ESG actions use the Ecological Green. All buttons feature a 4px corner radius and a subtle 150ms transition on hover.

### Inputs
Text fields use a white background with a 1px border (#CBD5E1). On focus, the border shifts to Corporate Blue with a 2px "glow" (a subtle outer shadow in the primary color at 15% opacity). Labels are positioned above the field in Inter Bold (label-sm).

### Data Tables
Tables are the core of this system. They use a "no-border" vertical style, employing horizontal dividers only. Header rows are slightly tinted (#F1F5F9) with all-caps labels. Positive values in green (#4CB748), negative values in red (#E11D48), and primary identifiers in blue (#006FBA).

### Chips & Badges
Used for status and filtering. They feature a low-saturation background of the status color (e.g., Green at 10% opacity) with high-saturation text to ensure legibility while remaining subtle.

### ESG Accents
A specialized component set for sustainability-focused data, including circular progress gauges and leaf-icon indicators, exclusively using Ecological Green to build a mental association between the color and environmental responsibility.