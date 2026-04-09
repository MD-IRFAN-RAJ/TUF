# Chronos Calendar App

A modern, animated calendar experience built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

The project combines a visual monthly calendar, date-range aware notes, event tracking, holiday image cells, and responsive navigation into one polished interface.

## Highlights

- Interactive monthly calendar with animated month transitions.
- Date selection supports both single-day and range selection.
- LocalStorage-backed notes by selected date or date range.
- LocalStorage-backed event management (add/delete by date).
- Holiday cells render images instead of numeric date labels.
- Weekday emphasis: Sundays in red and Fridays in green.
- Premium visual style with glassmorphism, gradients, and ambient background glow.
- Responsive layout with desktop side panels and mobile floating action button.

## Features Implemented

### 1. Calendar System

- Month navigation with forward/back direction tracking.
- Day grid generated from week-start to week-end boundaries for complete calendar rows.
- Day states:
  - current month / outside month
  - today
  - selected start and end
  - in selected range
  - has events
  - holiday metadata
  - Friday / Sunday semantic coloring

Core logic: [src/hooks/useCalendar.ts](src/hooks/useCalendar.ts)

UI rendering:
- [src/components/Calendar/CalendarView.tsx](src/components/Calendar/CalendarView.tsx)
- [src/components/Calendar/DayGrid.tsx](src/components/Calendar/DayGrid.tsx)
- [src/components/Calendar/DayCell.tsx](src/components/Calendar/DayCell.tsx)
- [src/components/Calendar/Header.tsx](src/components/Calendar/Header.tsx)

### 2. Event Management

- Add event by selected date (or current day fallback in events view).
- Delete existing events.
- Event list grouped by date key (`yyyy-MM-dd`).
- Event indicator dot displayed inside calendar day cell.
- Persistent storage in browser localStorage.

Core logic: [src/hooks/useEvents.ts](src/hooks/useEvents.ts)

UI:
- [src/components/Events/EventPanel.tsx](src/components/Events/EventPanel.tsx)

### 3. Notes by Date/Range

- Notes are keyed by:
  - single selected day (`yyyyMMdd`)
  - date range (`yyyyMMdd-yyyyMMdd`)
  - fallback `general`
- Debounced save (500ms) for smooth typing.
- Persistent localStorage storage.

Core logic: [src/hooks/useNotes.ts](src/hooks/useNotes.ts)

UI:
- [src/components/Notes/NotesPanel.tsx](src/components/Notes/NotesPanel.tsx)

### 4. Holiday Visualization

- Built-in holiday mapping by month-day key.
- On matching holiday dates, day number is replaced with an image tile.

Holiday source map:
- [src/hooks/useCalendar.ts](src/hooks/useCalendar.ts)

### 5. Theming

- Light/dark theme context with:
  - system preference fallback
  - localStorage persistence
  - runtime toggle support via context API

Theme provider:
- [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx)

Global tokens:
- [src/index.css](src/index.css)

## UI and Design System

### UI Libraries and Utilities

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion (animation)
- Lucide React (icons)
- Radix UI primitives (`ScrollArea`, `Slot`)
- `class-variance-authority`, `clsx`, `tailwind-merge` for class composition

Dependencies are listed in [package.json](package.json).

### Color Palette Used

Primary interactive and accent tokens:

- Primary (light): `#2563eb`
- Primary (dark): `#3b82f6`
- Accent gradient: `#3b82f6 -> #2dd4bf`

Background and surface tokens:

- Dark app background: `#0a0a0c`
- Dark card/surface: `#111114`, `#141417`
- Light background: `#f8fafc`

Semantic date colors:

- Sunday date text: red (`text-red-400`)
- Friday date text: green (`text-emerald-400`)

Token definitions:
- [src/index.css](src/index.css)

### Layout and Components

- Sticky top glass header with month branding.
- Hero section with monthly atmospheric image.
- Animated calendar panel and day grid.
- Side panel stack (notes + events) on large screens.
- Bottom floating glass navigation bar.
- Mobile floating action button.

Main composition:
- [src/App.tsx](src/App.tsx)

## Transition and Animation Details

This project uses Framer Motion and CSS transitions for a high-feedback UI.

### Framer Motion Usage

- Page/view transitions with `AnimatePresence` in the main app container.
- Month flip transition using 3D `rotateX`, blur, and directional transform origin.
- Day cell interaction animations (`whileHover`, `whileTap`).
- Notes panel and title transition animation.
- Hero image zoom/fade reveal.
- Active nav glow indicator with shared `layoutId` animation.

Files:
- [src/App.tsx](src/App.tsx)
- [src/components/Calendar/CalendarView.tsx](src/components/Calendar/CalendarView.tsx)
- [src/components/Calendar/DayCell.tsx](src/components/Calendar/DayCell.tsx)
- [src/components/Notes/NotesPanel.tsx](src/components/Notes/NotesPanel.tsx)
- [src/components/Layout/HeroSection.tsx](src/components/Layout/HeroSection.tsx)

### CSS Motion/Effects

- Smooth color/background transition on body.
- Glass blur panels (`glass` utility).
- Premium shadow and gradient utility classes.
- Ambient blurred background glow blobs.
- Pulse indicators (today/event status feedback).

Styles:
- [src/index.css](src/index.css)

## Local Storage Data Model

- Theme key: `theme`
- Notes key: `calendar_range_notes`
- Events key: `calendar_events`

## Project Structure

```text
src/
  App.tsx
  index.css
  main.tsx
  components/
    Calendar/
      CalendarView.tsx
      DayCell.tsx
      DayGrid.tsx
      Header.tsx
    Events/
      EventPanel.tsx
    Layout/
      HeroSection.tsx
    Notes/
      NotesPanel.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      scroll-area.tsx
  context/
    ThemeContext.tsx
  hooks/
    useCalendar.ts
    useEvents.ts
    useNotes.ts
  utils/
    cn.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Production Bundle

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## NPM Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build production assets
- `npm run lint`: Run ESLint
- `npm run preview`: Preview built app

## Roadmap Ideas

- Google/Outlook calendar sync.
- Drag-and-drop event scheduling.
- Editable holiday configuration in settings.
- Recurring events and reminders.
- Export/import notes and events.


