# Farmer Profile UI Visual Guide

## Page Layout

### Desktop View (≥1024px)
```
┌────────────────────────────────────────────────────────┐
│                   PROFILE HEADER CARD                   │
│  ┌──────┐                                               │
│  │Avatar│ Full Name                    [Edit] [Delete] │
│  │  JD  │ 🌿 Farmer Account                            │
│  └──────┘ farmer@email.com                             │
└────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────────────────────────┐
│  SIDEBAR TABS    │     TAB CONTENT (Profile)            │
│                  │                                      │
│ • Profile        │  Personal Information               │
│ • Password       │                                      │
│                  │  Full Name *                        │
│                  │  [Input Field]                      │
│                  │                                      │
│                  │  Email Address *                    │
│                  │  [Input Field]                      │
│                  │                                      │
│                  │  Phone Number *                     │
│                  │  [Input Field]                      │
│                  │                                      │
│                  │  [Save Changes] [Cancel]            │
└──────────────────┴──────────────────────────────────────┘
```

### Mobile View (<768px)
```
┌──────────────────────────────┐
│   PROFILE HEADER CARD        │
│  ┌──────┐                    │
│  │Avatar│                    │
│  │  JD  │ Full Name          │
│  └──────┘ 🌿 Farmer Account  │
│           farmer@email.com   │
│  [Edit] [Delete]             │
└──────────────────────────────┘

┌──────────────────────────────┐
│     SIDEBAR TABS             │
│  ────────────────────────    │
│  • Profile ✓                 │
│  ────────────────────────    │
│  • Change Password           │
│  ────────────────────────    │
└──────────────────────────────┘

┌──────────────────────────────┐
│  TAB CONTENT (Profile)       │
│                              │
│ Personal Information         │
│                              │
│ Full Name *                  │
│ [Input Field]                │
│                              │
│ Email Address *              │
│ [Input Field]                │
│                              │
│ Phone Number *               │
│ [Input Field]                │
│                              │
│ [Save Changes] [Cancel]      │
└──────────────────────────────┘
```

## Component Details

### 1. Profile Header Card
```
┌──────────────────────────────────────────────────────┐
│  ┌────┐                                               │
│  │    │ John Doe                [Edit] [Delete]      │
│  │ JD │ 🌿 Farmer Account                            │
│  │    │ john.doe@example.com                         │
│  └────┘                                               │
└──────────────────────────────────────────────────────┘

Styling:
- Avatar: 24x24px, green-600 background with white text
- Name: text-2xl, font-bold, text-gray-900
- Role: flex gap-2, with Leaf icon, text-green-600
- Email: text-muted-foreground, text-sm
- Buttons: gap-2, flex-wrap on mobile
```

### 2. Form Fields

#### View Mode
```
┌─ Full Name ──────────────────────┐
│ 👤 John Doe                      │
└──────────────────────────────────┘
Style: bg-gray-50, border-gray-200, p-3, rounded-lg
```

#### Edit Mode
```
┌─ Full Name ──────────────────────┐
│ 👤 [John Doe       ]             │
└──────────────────────────────────┘
Style: Input with pl-10 for icon, focus:ring-green-500
```

### 3. Sidebar Navigation
```
┌────────────────────────┐
│  Profile ✓             │
│ ─── ─── ─── ─── ─── ──│  (Active: bg-green-50, text-green-700)
│                        │
│  Change Password       │
│ ─── ─── ─── ─── ─── ──│  (Inactive: text-gray-700, hover:bg-gray-50)
└────────────────────────┘
```

## Color Palette

### Primary Colors
- **Green-600**: `#16a34a` - Primary action buttons, active states
- **Green-50**: `#f0fdf4` - Active tab background
- **Green-200**: `#bbf7d0` - Active tab border

### Text Colors
- **Gray-900**: `#111827` - Headings, primary text
- **Gray-700**: `#374151` - Labels, secondary text
- **Gray-600**: `#4b5563` - Tertiary text
- **Gray-400**: `#9ca3af` - Icons, muted elements

### Background Colors
- **Gray-50**: `#f9fafb` - Card backgrounds, hover states
- **White**: Background for main content

### Alert Colors
- **Red-600**: `#dc2626` - Delete/danger actions

## Typography

### Headings
- **Page Title**: `text-2xl font-bold text-gray-900`
- **Card Title**: `text-lg font-semibold text-gray-900`
- **Section Subtitle**: `text-sm text-muted-foreground`

### Body
- **Label**: `text-sm font-medium text-gray-700`
- **Input Placeholder**: `text-sm text-gray-500`
- **Body Text**: `text-base text-gray-900`

### Helper Text
- **Description**: `text-sm text-muted-foreground`
- **Helper**: `text-xs text-muted-foreground`

## Spacing & Sizing

### Padding
- **Card**: `p-6`
- **Header**: `pt-6`
- **Fields**: Space between groups: `space-y-6`
- **Label-Input**: Space between: `space-y-2`

### Margins
- **Top Page**: `py-8`
- **Cards**: `mb-6` (except last)
- **Button Groups**: `gap-2`

### Border Radius
- **Cards**: `rounded-lg`
- **Input Fields**: `rounded-md`
- **Avatar**: `rounded-full`

## Interactive States

### Buttons
- **Default**: Gray-700 text, white background
- **Hover**: Slightly darker background
- **Active**: Green-600 background, white text
- **Disabled**: Gray-400 text, gray-100 background

### Input Fields
- **Default**: Gray-200 border, white background
- **Focus**: Green-500 border, ring effect
- **Error**: Red-500 border

### Tabs
- **Active**: Green-50 background, green-700 text, green-200 border
- **Inactive**: Gray-700 text, hover:bg-gray-50

## Animations

- **Loading Spinner**: `animate-spin rounded-full h-12 w-12`
- **Transitions**: `transition-colors` on interactive elements
- **Hover Effects**: Color changes, background changes

## Accessibility

- **Semantic HTML**: Proper use of `<label>`, `<input>`, `<button>`
- **ARIA Labels**: Card titles, section descriptions
- **Color Contrast**: WCAG AA compliant
- **Focus Indicators**: Visible focus rings on inputs
- **Touch Targets**: Buttons ≥44px height on mobile

## Responsive Breakpoints

- **Mobile**: `<768px` - Single column layout
- **Tablet**: `768px-1024px` - Responsive spacing
- **Desktop**: `≥1024px` - Two-column layout with sidebar

## States

### Loading
```
┌────────────────────────────────┐
│     🔄 Loading profile...      │
└────────────────────────────────┘
Spinner with text centered
```

### Empty State
```
┌────────────────────────────────┐
│  No profile data available     │
│  Please refresh the page       │
└────────────────────────────────┘
```

### Error State
```
╔════════════════════════════════╗
║ ❌ Failed to load profile      ║
║ Please try again               ║
╚════════════════════════════════╝
Toast notification with error icon
```

### Success State
```
╔════════════════════════════════╗
║ ✓ Profile updated successfully ║
╚════════════════════════════════╝
Toast notification with checkmark
```
