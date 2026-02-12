# Design System - Color Tokens

## Overview

This design system uses a semantic color token approach with full dark mode support. All colors are defined using HSL (Hue, Saturation, Lightness) format for better color manipulation and consistency across platforms (iOS, Android, Web).

## Color Architecture

- **Single Source of Truth**: All colors are defined as CSS custom properties in `global.css`
- **Semantic Naming**: Colors are named by their purpose (e.g., `primary`, `destructive`) rather than their appearance
- **Dark Mode Support**: Automatic theme switching via CSS class toggle
- **Cross-Platform**: Works seamlessly with React Native via NativeWind and Tailwind CSS

---

## Core Color Tokens

### Background Colors

#### Light Background
```css
--background: 0 0% 100%
```
- **HSL**: `hsl(0, 0%, 100%)`
- **Hex**: `#FFFFFF`
- **Usage**: Main background for light theme
- **Tailwind Class**: `bg-background`

#### Dark Background
```css
--background: 240 10% 3.9%
```
- **HSL**: `hsl(240, 10%, 3.9%)`
- **Hex**: `#0A0A0F`
- **Usage**: Main background for dark theme (applied with `.dark` class)
- **Tailwind Class**: `dark:bg-background`

---

### Primary Colors

#### Primary (Light Theme)
```css
--primary: 240 5.9% 10%
--primary-foreground: 0 0% 98%
```
- **HSL**: `hsl(240, 5.9%, 10%)`
- **Hex**: `#18181B`
- **Usage**: Primary buttons, links, important actions
- **Foreground Color**: Off-white text on primary backgrounds
- **Tailwind Classes**: `bg-primary`, `text-primary-foreground`

#### Primary (Dark Theme)
```css
--primary: 0 0% 98%
--primary-foreground: 240 5.9% 10%
```
- **HSL**: `hsl(0, 0%, 98%)`
- **Hex**: `#FAFAFA`
- **Usage**: Primary elements in dark mode
- **Foreground Color**: Dark text on light primary backgrounds
- **Tailwind Classes**: `dark:bg-primary`, `dark:text-primary-foreground`

---

### Secondary Colors

#### Secondary (Light Theme)
```css
--secondary: 240 4.8% 95.9%
--secondary-foreground: 240 5.9% 10%
```
- **HSL**: `hsl(240, 4.8%, 95.9%)`
- **Hex**: `#F4F4F5`
- **Usage**: Secondary buttons, alternative actions, subtle emphasis
- **Foreground Color**: Dark text on secondary backgrounds
- **Tailwind Classes**: `bg-secondary`, `text-secondary-foreground`

#### Secondary (Dark Theme)
```css
--secondary: 240 3.7% 15.9%
--secondary-foreground: 0 0% 98%
```
- **HSL**: `hsl(240, 3.7%, 15.9%)`
- **Hex**: `#27272A`
- **Usage**: Secondary elements in dark mode
- **Foreground Color**: Light text on dark secondary backgrounds
- **Tailwind Classes**: `dark:bg-secondary`, `dark:text-secondary-foreground`

---

## Status & Utility Colors

### Destructive / Danger

#### Destructive (Light Theme)
```css
--destructive: 0 84.2% 60.2%
--destructive-foreground: 0 0% 98%
```
- **HSL**: `hsl(0, 84.2%, 60.2%)`
- **Hex**: `#EF4444`
- **Usage**: Delete buttons, error states, warnings
- **Foreground Color**: White text on destructive backgrounds
- **Tailwind Classes**: `bg-destructive`, `text-destructive-foreground`

#### Destructive (Dark Theme)
```css
--destructive: 0 62.8% 30.6%
--destructive-foreground: 0 0% 98%
```
- **HSL**: `hsl(0, 62.8%, 30.6%)`
- **Hex**: `#7F1D1D`
- **Usage**: Destructive actions in dark mode (darker red)
- **Foreground Color**: White text on destructive backgrounds
- **Tailwind Classes**: `dark:bg-destructive`, `dark:text-destructive-foreground`

---

### Info / Accent

#### Accent (Light Theme)
```css
--accent: 240 4.8% 95.9%
--accent-foreground: 240 5.9% 10%
```
- **HSL**: `hsl(240, 4.8%, 95.9%)`
- **Hex**: `#F4F4F5`
- **Usage**: Highlighted content, info messages, hover states
- **Foreground Color**: Dark text on accent backgrounds
- **Tailwind Classes**: `bg-accent`, `text-accent-foreground`

#### Accent (Dark Theme)
```css
--accent: 240 3.7% 15.9%
--accent-foreground: 0 0% 98%
```
- **HSL**: `hsl(240, 3.7%, 15.9%)`
- **Hex**: `#27272A`
- **Usage**: Accent elements in dark mode
- **Foreground Color**: Light text on dark accent backgrounds
- **Tailwind Classes**: `dark:bg-accent`, `dark:text-accent-foreground`

---

### Muted

#### Muted (Light Theme)
```css
--muted: 240 4.8% 95.9%
--muted-foreground: 240 3.8% 46.1%
```
- **HSL**: `hsl(240, 4.8%, 95.9%)`
- **Hex**: `#F4F4F5`
- **Usage**: Muted backgrounds, disabled states, subtle elements
- **Foreground Color**: Medium gray text
- **Tailwind Classes**: `bg-muted`, `text-muted-foreground`

#### Muted (Dark Theme)
```css
--muted: 240 3.7% 15.9%
--muted-foreground: 240 5% 64.9%
```
- **HSL**: `hsl(240, 3.7%, 15.9%)`
- **Hex**: `#27272A`
- **Usage**: Muted elements in dark mode
- **Foreground Color**: Medium light gray text
- **Tailwind Classes**: `dark:bg-muted`, `dark:text-muted-foreground`

---

## Supporting Colors

### Border & Input

#### Border (Light Theme)
```css
--border: 240 5.9% 90%
```
- **HSL**: `hsl(240, 5.9%, 90%)`
- **Hex**: `#E4E4E7`
- **Usage**: Borders, dividers, separators
- **Tailwind Class**: `border-border`

#### Border (Dark Theme)
```css
--border: 240 3.7% 15.9%
```
- **HSL**: `hsl(240, 3.7%, 15.9%)`
- **Hex**: `#27272A`
- **Usage**: Borders in dark mode
- **Tailwind Class**: `dark:border-border`

#### Input
```css
--input: 240 5.9% 90%
```
- **HSL**: `hsl(240, 5.9%, 90%)`
- **Hex**: `#E4E4E7`
- **Usage**: Input borders and backgrounds
- **Tailwind Class**: `border-input`

---

### Focus & Interactive States

#### Ring (Light Theme)
```css
--ring: 240 5.9% 10%
```
- **HSL**: `hsl(240, 5.9%, 10%)`
- **Hex**: `#18181B`
- **Usage**: Focus rings on interactive elements
- **Tailwind Class**: `ring-ring`

#### Ring (Dark Theme)
```css
--ring: 240 4.9% 83.9%
```
- **HSL**: `hsl(240, 4.9%, 83.9%)`
- **Hex**: `#D4D4D8`
- **Usage**: Focus rings in dark mode (lighter for visibility)
- **Tailwind Class**: `dark:ring-ring`

---

### Card & Popover

#### Card (Light Theme)
```css
--card: 0 0% 100%
--card-foreground: 240 10% 3.9%
```
- **HSL**: `hsl(0, 0%, 100%)`
- **Hex**: `#FFFFFF`
- **Usage**: Card backgrounds, elevated surfaces
- **Foreground Color**: Dark text on card backgrounds
- **Tailwind Classes**: `bg-card`, `text-card-foreground`

#### Card (Dark Theme)
```css
--card: 240 10% 3.9%
--card-foreground: 0 0% 98%
```
- **HSL**: `hsl(240, 10%, 3.9%)`
- **Hex**: `#0A0A0F`
- **Usage**: Card backgrounds in dark mode
- **Foreground Color**: Light text on dark card backgrounds
- **Tailwind Classes**: `dark:bg-card`, `dark:text-card-foreground`

#### Popover (Light Theme)
```css
--popover: 0 0% 100%
--popover-foreground: 240 10% 3.9%
```
- **HSL**: `hsl(0, 0%, 100%)`
- **Hex**: `#FFFFFF`
- **Usage**: Dropdown menus, tooltips, popovers
- **Foreground Color**: Dark text on popover backgrounds
- **Tailwind Classes**: `bg-popover`, `text-popover-foreground`

#### Popover (Dark Theme)
```css
--popover: 240 10% 3.9%
--popover-foreground: 0 0% 98%
```
- **HSL**: `hsl(240, 10%, 3.9%)`
- **Hex**: `#0A0A0F`
- **Usage**: Popover elements in dark mode
- **Foreground Color**: Light text on dark popover backgrounds
- **Tailwind Classes**: `dark:bg-popover`, `dark:text-popover-foreground`

---

## Additional Properties

### Border Radius
```css
--radius: 0.5rem
```
- **Value**: `8px`
- **Usage**: Consistent border radius across components
- **Tailwind Class**: `rounded-radius` (or use standard Tailwind rounded utilities)

---

## Usage Examples

### React Native Components

```tsx
import { View, Text } from 'react-native';

// Primary button
<View className="bg-primary rounded-lg px-4 py-2">
  <Text className="text-primary-foreground font-semibold">
    Primary Action
  </Text>
</View>

// Destructive button (danger)
<View className="bg-destructive rounded-lg px-4 py-2">
  <Text className="text-destructive-foreground font-semibold">
    Delete
  </Text>
</View>

// Info/Accent card
<View className="bg-accent border border-border rounded-lg p-4">
  <Text className="text-accent-foreground">
    This is an info message
  </Text>
</View>

// Secondary button
<View className="bg-secondary rounded-lg px-4 py-2">
  <Text className="text-secondary-foreground font-semibold">
    Secondary Action
  </Text>
</View>
```

### Web Components

```tsx
import React from 'react';

// Primary button
<button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90">
  Primary Action
</button>

// Destructive button
<button className="bg-destructive text-destructive-foreground rounded-lg px-4 py-2 hover:bg-destructive/90">
  Delete
</button>

// Info card
<div className="bg-accent text-accent-foreground border border-border rounded-lg p-4">
  This is an info message
</div>

// Dark mode aware
<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  Content adapts to theme
</div>
```

### Using Opacity Modifiers

```tsx
// 80% opacity
<View className="bg-primary/80">
  <Text className="text-primary-foreground/80">Semi-transparent</Text>
</View>

// 50% opacity
<View className="bg-destructive/50">
  <Text className="text-destructive-foreground/50">Half transparent</Text>
</View>
```

---

## Best Practices

### 1. Always Use Semantic Tokens
❌ **Don't**: `bg-red-500`, `text-gray-900`
✅ **Do**: `bg-destructive`, `text-foreground`

### 2. Pair Background with Foreground
❌ **Don't**: `bg-primary text-foreground`
✅ **Do**: `bg-primary text-primary-foreground`

### 3. Use Dark Mode Classes
❌ **Don't**: Hardcode colors for dark mode
✅ **Do**: `bg-background dark:bg-background` (handled automatically)

### 4. Leverage Opacity for States
❌ **Don't**: Define new colors for hover/active states
✅ **Do**: `bg-primary hover:bg-primary/90 active:bg-primary/80`

### 5. Test in Both Themes
Always verify your UI works in both light and dark modes

---

## File References

- **CSS Variables**: `/global.css`
- **Tailwind Config**: `/tailwind.config.js`
- **Theme Provider**: `/src/providers/ThemeProvider.tsx`
- **Navigation Theme**: `/src/lib/constants.ts`
- **UI Components**: `/src/components/ui/`

---

## Migration Guide

### Adding a New Color Token

1. **Define CSS Variables** in `global.css`:
```css
:root {
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
}

.dark {
  --success: 142 71% 45%;
  --success-foreground: 0 0% 100%;
}
```

2. **Extend Tailwind Config** in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      success: 'hsl(var(--success))',
      'success-foreground': 'hsl(var(--success-foreground))',
    }
  }
}
```

3. **Use in Components**:
```tsx
<View className="bg-success">
  <Text className="text-success-foreground">Success!</Text>
</View>
```

---

## Color Palette Reference

| Token | Light (Hex) | Dark (Hex) | Purpose |
|-------|-------------|------------|---------|
| `background` | `#FFFFFF` | `#0A0A0F` | Main background |
| `foreground` | `#0A0A0F` | `#FAFAFA` | Main text |
| `primary` | `#18181B` | `#FAFAFA` | Primary actions |
| `secondary` | `#F4F4F5` | `#27272A` | Secondary actions |
| `destructive` | `#EF4444` | `#7F1D1D` | Danger/Delete |
| `accent` | `#F4F4F5` | `#27272A` | Info/Highlight |
| `muted` | `#F4F4F5` | `#27272A` | Disabled/Subtle |
| `border` | `#E4E4E7` | `#27272A` | Borders/Dividers |
| `input` | `#E4E4E7` | `#27272A` | Input borders |
| `ring` | `#18181B` | `#D4D4D8` | Focus states |
| `card` | `#FFFFFF` | `#0A0A0F` | Elevated surfaces |
| `popover` | `#FFFFFF` | `#0A0A0F` | Overlays |

---

## Quick Reference Chart

### Light Mode Colors
```
Background:  ■ #FFFFFF (White)
Foreground:  ■ #0A0A0F (Near Black)
Primary:     ■ #18181B (Dark Gray)
Secondary:   ■ #F4F4F5 (Light Gray)
Destructive: ■ #EF4444 (Red)
Accent:      ■ #F4F4F5 (Light Gray)
```

### Dark Mode Colors
```
Background:  ■ #0A0A0F (Near Black)
Foreground:  ■ #FAFAFA (Off White)
Primary:     ■ #FAFAFA (Off White)
Secondary:   ■ #27272A (Dark Gray)
Destructive: ■ #7F1D1D (Dark Red)
Accent:      ■ #27272A (Dark Gray)
```

---

## Theme Toggle

The theme can be toggled using the `ThemeProvider`:

```tsx
import { useTheme } from '@/providers/ThemeProvider';

function ThemeToggleButton() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

---

## Platform Considerations

### React Native
- Colors are applied via NativeWind's `className` prop
- Dark mode handled by `ThemeProvider` context
- No CSS required on native platforms

### Web
- Colors use CSS custom properties
- Dark mode via `.dark` class on `<html>` element
- Supports CSS transitions for smooth theme switching

---

## Support & Questions

For questions or issues with the design system:
1. Check component examples in `/src/components/ui/`
2. Review `ThemeProvider.tsx` for theme switching logic
3. Inspect `global.css` for color definitions
4. Refer to `tailwind.config.js` for extended theme configuration

---

**Last Updated**: 2026-02-12
**Version**: 1.0.0
