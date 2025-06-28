# Surya Defence Academy Theme Guide

This guide explains how to use the comprehensive theme system built around your brand colors.

## Brand Colors

Your brand colors are:
- **Purple**: `#2d1875` - Primary brand color
- **Gold**: `#f5c405` - Accent color  
- **Red**: `#d72724` - Warning/error color
- **White**: `#fefefe` - Background/text color
- **Yellow**: `#feef16` - Secondary accent color

## Color System

### 1. Brand Colors (Direct Access)
```css
.bg-brand-purple    /* #2d1875 */
.bg-brand-gold      /* #f5c405 */
.bg-brand-red       /* #d72724 */
.bg-brand-white     /* #fefefe */
.bg-brand-yellow    /* #feef16 */

.text-brand-purple
.text-brand-gold
.text-brand-red
.text-brand-white
.text-brand-yellow

.border-brand-purple
.border-brand-gold
.border-brand-red
.border-brand-yellow
```

### 2. Primary Color Palette (Purple-based)
```css
.bg-primary-50      /* Lightest purple */
.bg-primary-100
.bg-primary-200
.bg-primary-300
.bg-primary-400
.bg-primary-500
.bg-primary-600
.bg-primary-700
.bg-primary-800
.bg-primary-900     /* Your brand purple #2d1875 */
.bg-primary-950     /* Darkest purple */
```

### 3. Accent Color Palette (Gold-based)
```css
.bg-accent-50       /* Lightest gold */
.bg-accent-100
.bg-accent-200
.bg-accent-300
.bg-accent-400
.bg-accent-500      /* Your brand gold #f5c405 */
.bg-accent-600
.bg-accent-700
.bg-accent-800
.bg-accent-900
.bg-accent-950      /* Darkest gold */
```

### 4. Yellow Color Palette (New brand yellow)
```css
.bg-yellow-50       /* Lightest yellow */
.bg-yellow-100
.bg-yellow-200
.bg-yellow-300
.bg-yellow-400
.bg-yellow-500      /* Your brand yellow #feef16 */
.bg-yellow-600
.bg-yellow-700
.bg-yellow-800
.bg-yellow-900
.bg-yellow-950      /* Darkest yellow */
```

### 5. Semantic Colors
```css
/* Success Colors (Green) */
.bg-success-500
.text-success-500
.border-success-500

/* Error Colors (Red-based) */
.bg-error-500
.text-error-500
.border-error-500

/* Warning Colors (Red-based) */
.bg-warning-500
.text-warning-500
.border-warning-500
```

## Light & Dark Mode

### Background Colors
```css
/* Light Mode */
.bg-background          /* #fefefe */
.bg-background-secondary /* #fafafa */
.bg-background-tertiary  /* #f5f5f5 */

/* Dark Mode */
.dark .bg-background          /* #0a0a0a */
.dark .bg-background-secondary /* #171717 */
.dark .bg-background-tertiary  /* #262626 */
```

### Text Colors
```css
/* Light Mode */
.text-foreground          /* #171717 */
.text-foreground-secondary /* #525252 */
.text-foreground-tertiary  /* #737373 */
.text-foreground-muted     /* #a3a3a3 */

/* Dark Mode */
.dark .text-foreground          /* #fefefe */
.dark .text-foreground-secondary /* #e5e5e5 */
.dark .text-foreground-tertiary  /* #d4d4d4 */
.dark .text-foreground-muted     /* #a3a3a3 */
```

### Border Colors
```css
/* Light Mode */
.border-border           /* #e5e5e5 */
.border-border-secondary /* #d4d4d4 */
.border-border-accent    /* #f5c405 */
.border-border-primary   /* #2d1875 */
.border-border-yellow    /* #feef16 */

/* Dark Mode */
.dark .border-border           /* #262626 */
.dark .border-border-secondary /* #404040 */
.dark .border-border-accent    /* #f5c405 */
.dark .border-border-primary   /* #8b5cf6 */
.dark .border-border-yellow    /* #feef16 */
```

## Custom Gradients

```css
.bg-gradient-primary    /* Purple gradient */
.bg-gradient-secondary  /* Gold gradient */
.bg-gradient-accent     /* Gold to orange gradient */
.bg-gradient-yellow     /* Yellow gradient */
.bg-gradient-hero       /* Purple to gold gradient */
.bg-gradient-brand      /* Purple to yellow gradient */
```

## Custom Shadows

```css
.shadow-brand      /* Purple shadow */
.shadow-brand-lg   /* Large purple shadow */
.shadow-accent     /* Gold shadow */
.shadow-accent-lg  /* Large gold shadow */
.shadow-yellow     /* Yellow shadow */
.shadow-yellow-lg  /* Large yellow shadow */
```

## Custom Animations

```css
.animate-fade-in      /* Fade in animation */
.animate-slide-up     /* Slide up animation */
.animate-pulse-brand  /* Brand pulse animation */
```

## Theme Toggle

The theme system includes a toggle component:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

// Icon-only toggle
<ThemeToggle />

// Toggle with text
<ThemeToggleWithText />
```

## Usage Examples

### Buttons
```tsx
// Primary button
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
  Primary Action
</button>

// Secondary button
<button className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors">
  Secondary Action
</button>

// Yellow button
<button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors">
  Yellow Action
</button>

// Outline button
<button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
  Outline Button
</button>
```

### Cards
```tsx
<div className="bg-background border border-border rounded-lg p-6 shadow-brand">
  <h3 className="text-foreground font-semibold">Card Title</h3>
  <p className="text-foreground-secondary mt-2">Card content</p>
</div>
```

### Forms
```tsx
<input 
  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
  placeholder="Enter text..."
/>
```

### Alerts
```tsx
// Success alert
<div className="bg-success-50 border border-success-200 text-success-800 rounded-lg p-4">
  Success message
</div>

// Error alert
<div className="bg-error-50 border border-error-200 text-error-800 rounded-lg p-4">
  Error message
</div>

// Warning alert
<div className="bg-warning-50 border border-warning-200 text-warning-800 rounded-lg p-4">
  Warning message
</div>

// Yellow highlight
<div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
  Important notice
</div>
```

## Best Practices

1. **Use semantic colors**: Use `primary`, `accent`, `yellow`, `success`, `error` for their intended purposes
2. **Leverage the color scale**: Use lighter shades (50-400) for backgrounds, medium shades (500-600) for primary elements, darker shades (700-950) for emphasis
3. **Maintain contrast**: Ensure text has sufficient contrast against backgrounds
4. **Be consistent**: Use the same color combinations throughout your application
5. **Test both modes**: Always test your components in both light and dark modes

## CSS Variables

All colors are available as CSS variables:

```css
:root {
  --brand-purple: #2d1875;
  --brand-gold: #f5c405;
  --brand-red: #d72724;
  --brand-white: #fefefe;
  --brand-yellow: #feef16;
  
  --primary-500: #8b5cf6;
  --primary-900: #2d1875;
  
  --accent-500: #f5c405;
  
  --yellow-500: #feef16;
  
  --background: #fefefe;
  --foreground: #171717;
  /* ... and many more */
}
```

## Migration Guide

If you're updating existing components:

1. Replace hardcoded colors with theme colors
2. Update `bg-white` to `bg-background`
3. Update `text-gray-900` to `text-foreground`
4. Update `border-gray-200` to `border-border`
5. Test in both light and dark modes

This theme system provides a consistent, accessible, and maintainable color palette that reflects your brand identity across all components. 