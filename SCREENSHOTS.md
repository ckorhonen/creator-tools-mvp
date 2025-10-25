# Visual Guide - Creator Tools MVP

> 📸 This document describes the key screens and UI elements. Screenshots will be added after running the app.

## 🏠 Main Interface

### Header
```
┌─────────────────────────────────────────────────────────────┐
│  Creator Tools MVP                    [ ✨ Create Post ]    │
│  Content scheduling and unified analytics for creators       │
└─────────────────────────────────────────────────────────────┘
```
- **Gradient logo** text (blue to purple)
- Prominent "Create Post" button with gradient background
- Clean, professional header with shadow

### Tab Navigation
```
┌─────────────────────────────────────────────────────────────┐
│  [ 📅 Schedule ]  [ 📊 Analytics ]                          │
└─────────────────────────────────────────────────────────────┘
```
- Active tab has blue underline and light blue background
- Smooth transition between tabs
- Emoji icons for visual clarity

## ✍️ Post Composer

### Platform Selection
```
┌───────────────────────────────────────────────────────────┐
│  Select Platforms                                         │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ 𝕏 Twitter│  │ 💼 LinkedIn│  │ 📸 Instagram│             │
│  │ /X       │  │          │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└───────────────────────────────────────────────────────────┘
```
- **Selected** platforms have blue border and blue background
- **Unselected** platforms have gray border
- Large clickable cards with platform icons

### Content Editor
```
┌───────────────────────────────────────────────────────────┐
│  Content                                                  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ What's on your mind?                                │ │
│  │                                                     │ │
│  │                                                     │ │
│  │                                                     │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```
- Large textarea with 6 rows
- Placeholder text for guidance
- Auto-resize (future enhancement)

### Character Counters
```
┌─────────────────────────────────────────────────────────┐
│  𝕏 Twitter/X         LinkedIn            Instagram      │
│  ════════════        ══════════          ══════════      │
│  45/280              45/3000             45/2200         │
│  ▓▓▓▓░░░░░░  16%     ▓░░░░░░░░░  1.5%    ▓░░░░░░░░  2% │
└─────────────────────────────────────────────────────────┘
```
- **Green** progress bar when under limit
- **Red** progress bar and text when over limit
- Real-time updates as you type
- Percentage and count displayed

### Platform Previews
```
┌───────────────────────────────────────────────────────────┐
│  👁️ Show Platform Previews                                │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 𝕏 Twitter/X Preview                                 │ │
│  │                                                     │ │
│  │ Your adapted content appears here...                │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 💼 LinkedIn Preview                                  │ │
│  │                                                     │ │
│  │ Your adapted content appears here...                │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```
- Toggle button to show/hide previews
- Each platform in its own card
- Shows exact formatted content

### Schedule Controls
```
┌───────────────────────────────────────────────────────────┐
│  Schedule Time (optional)                                 │
│  [____________________] 📅                                │
│                                                           │
│  [ Cancel ]                      [ 📅 Schedule Post ]    │
└───────────────────────────────────────────────────────────┘
```
- Date/time picker
- Cancel button (gray)
- Primary action button (gradient blue to purple)

## 📅 Schedule Calendar

### Month View
```
┌─────────────────────────────────────────────────────────┐
│  January 2024                                           │
├─────────────────────────────────────────────────────────┤
│  Sun   Mon   Tue   Wed   Thu   Fri   Sat              │
│  ─────────────────────────────────────────────────────  │
│   31     1     2     3     4     5     6              │
│                          ┌──┐                          │
│                          │𝕏💼│ 3 posts                │
│                          │15:00│                       │
│                          └──┘                          │
│    7     8     9    10    11    12    13              │
│  ┌──┐                                                  │
│  │📸│  Today                                           │
│  │10:30│ (highlighted in blue)                        │
│  └──┘                                                  │
└─────────────────────────────────────────────────────────┘
```
- Current day has blue background
- Posts shown as colored pills with time
- Platform icons displayed on each post
- Hover for more details

### Empty State
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│                        📅                                 │
│                                                           │
│              No posts scheduled yet                       │
│                                                           │
│    Create your first post to start scheduling            │
│         content across platforms                          │
│                                                           │
│              [ ✨ Create Your First Post ]                │
│                                                           │
└───────────────────────────────────────────────────────────┘
```
- Large emoji
- Encouraging message
- Clear call-to-action button

## 📊 Analytics Dashboard

### Overview Cards
```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ 👁️         │ │ ❤️         │ │ 📈         │ │ 📝         │
│            │ │            │ │            │ │            │
│ Total      │ │ Total      │ │ Engagement │ │ Posts      │
│ Impressions│ │ Engagements│ │ Rate       │ │ Published  │
│            │ │            │ │            │ │            │
│ 12,543     │ │ 876        │ │ 6.98%      │ │ 24         │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```
- Each card has gradient background
- Large numbers prominently displayed
- Emoji icons for visual appeal
- Blue, Red, Green, Purple gradients

### Platform Breakdown
```
┌───────────────────────────────────────────────────────────┐
│  Platform Performance                                     │
├───────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ 𝕏 Twitter/X │  │ 💼 LinkedIn  │  │ 📸 Instagram │      │
│  │             │  │             │  │             │      │
│  │ Impressions │  │ Impressions │  │ Impressions │      │
│  │ 5,234       │  │ 4,521       │  │ 2,788       │      │
│  │             │  │             │  │             │      │
│  │ Engagements │  │ Engagements │  │ Engagements │      │
│  │ 387         │  │ 312         │  │ 177         │      │
│  │             │  │             │  │             │      │
│  │ Posts: 10   │  │ Posts: 8    │  │ Posts: 6    │      │
│  │             │  │             │  │             │      │
│  │ Rate: 7.4%  │  │ Rate: 6.9%  │  │ Rate: 6.3%  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└───────────────────────────────────────────────────────────┘
```
- Side-by-side comparison
- Individual metrics per platform
- Engagement rate highlighted in green

### Top Posts
```
┌───────────────────────────────────────────────────────────┐
│  Top Performing Posts                                     │
├───────────────────────────────────────────────────────────┤
│  ┌─┐  𝕏 Twitter/X                            145 engag.  │
│  │1│  Just launched our new feature! 🚀...               │
│  └─┘                                                      │
│  ┌─┐  💼 LinkedIn                             98 engag.   │
│  │2│  Excited to share insights from...                  │
│  └─┘                                                      │
│  ┌─┐  📸 Instagram                            87 engag.   │
│  │3│  Behind the scenes of content...                    │
│  └─┘                                                      │
└───────────────────────────────────────────────────────────┘
```
- Numbered ranking badges (gold gradient)
- Platform icon and name
- Truncated content preview
- Engagement count on right

### Trend Chart
```
┌───────────────────────────────────────────────────────────┐
│  Engagement Trend                                         │
├───────────────────────────────────────────────────────────┤
│  200│                                        ▓             │
│     │                        ▓       ▓      ▓             │
│  150│            ▓          ▓       ▓      ▓             │
│     │       ▓   ▓          ▓       ▓      ▓             │
│  100│      ▓   ▓          ▓       ▓      ▓             │
│     │  ▓  ▓   ▓          ▓       ▓      ▓             │
│   50│ ▓  ▓   ▓          ▓       ▓      ▓             │
│     │▓  ▓   ▓          ▓       ▓      ▓             │
│    0└────────────────────────────────────────           │
│      1/15 1/16 1/17 1/18 1/19 1/20 1/21 1/22...        │
└───────────────────────────────────────────────────────────┘
```
- Last 14 days of data
- Vertical bar chart
- Blue bars with hover effect
- Rotated date labels

## 🔌 Platform Connections

```
┌───────────────────────────────────────────────────────────┐
│  Platform Connections                                     │
├───────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 𝕏  Twitter/X                    [ Connect ]          │ │
│  │    ❌ Not connected                                  │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 💼  LinkedIn                    [ Disconnect ]        │ │
│  │    ✅ Connected                                       │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 📸  Instagram                   [ Connect ]           │ │
│  │    ❌ Not connected                                  │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 🔒 Privacy Notice: We only request permissions to   │ │
│  │    post content and view analytics. Your credentials│ │
│  │    are stored securely and never shared.            │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```
- Each platform in its own card
- Connection status clearly shown
- Blue "Connect" button for disconnected
- Red "Disconnect" button for connected
- Privacy notice at bottom

## 🎨 Design System

### Color Palette
```
Primary Gradient:    #3B82F6 → #8B5CF6 (Blue to Purple)
Twitter/X:          #000000 (Black)
LinkedIn:           #0A66C2 (Blue)
Instagram:          #E4405F (Pink)

Neutral Grays:
- Gray 50:  #F9FAFB (Backgrounds)
- Gray 100: #F3F4F6
- Gray 200: #E5E7EB (Borders)
- Gray 300: #D1D5DB
- Gray 500: #6B7280 (Secondary text)
- Gray 600: #4B5563
- Gray 700: #374151
- Gray 900: #111827 (Primary text)

Semantic Colors:
- Blue:   #3B82F6 (Primary actions)
- Red:    #EF4444 (Errors, warnings)
- Green:  #10B981 (Success, positive metrics)
- Yellow: #F59E0B (Warnings)
```

### Typography
```
Headings:   Bold, 2xl-3xl size
Body:       Regular, base-lg size
Small:      sm size for labels
Code:       Monospace font

Font Stack: system-ui, -apple-system, sans-serif
```

### Spacing
```
Gap between elements:  1rem (16px)
Card padding:          1.5rem (24px)
Button padding:        0.75rem 1.5rem
Border radius:         0.5rem (8px)
Border radius large:   0.75rem (12px)
```

### Animations
- **Transitions**: 150ms ease for color changes
- **Hover effects**: Scale 1.05 for buttons
- **Loading**: Pulse animation for loading states
- **Fade in**: 300ms for new content

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked cards
- Full-width buttons
- Simplified navigation
- Touch-friendly tap targets

### Tablet (768px - 1024px)
- Two-column layout for metrics
- Optimized spacing
- Readable text sizes

### Desktop (> 1024px)
- Three-column layout for analytics
- Maximum width: 1280px
- Centered content
- Optimal reading width

## 🎯 UI Principles

1. **Clarity** - Every element has a clear purpose
2. **Consistency** - Patterns repeat across the app
3. **Feedback** - Actions provide immediate feedback
4. **Simplicity** - No unnecessary complexity
5. **Beauty** - Pleasing gradients and animations

---

## 📸 Adding Screenshots

To add actual screenshots:

1. Run the app: `npm run dev`
2. Take screenshots of each view
3. Save in `screenshots/` folder
4. Update this document with image links

```markdown
![Post Composer](./screenshots/post-composer.png)
![Calendar View](./screenshots/calendar.png)
![Analytics Dashboard](./screenshots/analytics.png)
```

---

Built with ❤️ and attention to detail.
