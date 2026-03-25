# Custom Multi-Select Country Dropdown

## Problem Statement
How might we replace the browser-default `<select>` with a styled, multi-select dropdown that matches the app's design system and lets users filter by multiple countries?

## Recommended Direction
**Minimal Custom Dropdown** — a pure React + Tailwind component with no external dependencies. The dropdown is a positioned `<div>` with `role="listbox"`, pills in the trigger for selected values, a search input to filter options, and checkmarks on selected items. Same component on desktop and mobile.

The trigger replaces the current native `<select>` with a button showing removable pill tags. When no countries are selected, it shows "All countries". The dropdown stays open for multiple selections and closes on click-outside or Escape.

## Key Assumptions to Validate
- [ ] Country list is small enough (~20-50) that no virtualization is needed — verify by checking the API response
- [ ] The sticky SearchBar's `z-20` stacking context won't clip the dropdown — test by opening the dropdown and scrolling
- [ ] Dynamic pill width in the desktop inline layout doesn't break the SearchBar flex row — set `max-w` and test with 3+ selections

## MVP Scope

### New files
- `src/components/MultiSelect.tsx` — the full custom multi-select (trigger + panel + search + options)

### Edited files
- `src/components/CountrySelect.tsx` — thin wrapper using `MultiSelect`, changes `value` from `string` to `string[]`
- `src/components/SearchBar.tsx` — thread `string[]` for countries
- `src/App.tsx` — `selectedCountries: string[]` state
- `src/hooks/useJobPosts.ts` — accept `string[]`, serialize for query key
- `src/api/endpoints.ts` — `countries?: string[]`, pass directly as `params.country`

### Component anatomy
```
MultiSelect
├── Trigger button
│   ├── Pill tags (with × remove, single line + "+N more" overflow)
│   └── Chevron icon
└── Dropdown panel (absolutely positioned)
    ├── Search input (with magnifying glass icon)
    └── Scrollable option list
        └── Option row (checkmark + label)
```

### Behavior
- Dropdown stays open for multiple picks, closes on click-outside or Escape
- Pills show selected values; clicking × on a pill removes that selection
- Single line of pills with "+N more" badge when overflowing
- Empty selection = "All countries" (no filter)
- Search input at top of dropdown filters the option list

### Keyboard
- ArrowUp/Down to navigate options
- Enter/Space to toggle selection
- Escape to close
- Typing in search filters the list

### Styling tokens
- Trigger: `bg-white`, `border-card-border`, `rounded-lg`, `text-sm font-medium`
- Panel: `bg-white`, `border-card-border`, `rounded-lg`, `shadow-search`, `max-h-60 overflow-y-auto`
- Option default: `px-4 py-2.5 text-sm text-text-primary cursor-pointer`
- Option hover: `bg-coral-light`
- Option selected: `text-coral font-medium` + checkmark
- Pills: `bg-coral-light text-coral text-xs rounded-full px-2 py-0.5`
- Focus ring: `ring-2 ring-coral/30 border-coral`
- Transition: `transition-all duration-150`

## Not Doing (and Why)
- **Separate `Select` single-select component** — YAGNI, only country uses a select in this app
- **React portal for dropdown** — the dropdown renders downward from a sticky header, clipping is unlikely
- **Mobile bottom sheet** — doubles scope for marginal gain, a dropdown works fine on mobile
- **Animation library** — simple Tailwind transitions are enough
- **Virtualized list** — country list is small, plain `map` suffices
- **"Select all" button** — empty selection already means "all countries"

## Open Questions
- None remaining — ready to build
