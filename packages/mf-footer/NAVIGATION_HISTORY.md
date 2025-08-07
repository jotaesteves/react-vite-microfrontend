# Footer Navigation History Feature

## Overview

The Footer component now automatically displays navigation tags based on the user's navigation history when running in the host environment. It uses the shared global store from the `packages/shared` library to track and display recently visited pages.

## Features

- **Automatic History Tracking**: Automatically shows the last 5 unique pages visited
- **Visual Indicators**: History tags have a distinct visual style with a clock icon (🕒)
- **Shared Store Integration**: Uses the shared global store instead of creating separate state
- **Fallback Support**: Falls back to default tags when history is not available
- **Removable Tags**: Users can close individual history tags
- **History Removal**: Closing a history tag permanently removes that page from the navigation history

## Usage

### Default Behavior (History-based tags)

```tsx
// Shows navigation history tags automatically
<Footer />

// Explicitly enable history (same as default)
<Footer useHistory={true} />
```

### Custom Tags

```tsx
// Override with custom tags
<Footer
  customTags={[
    { id: "dashboard", label: "Dashboard", page: "dashboard" },
    { id: "settings", label: "Settings", page: "settings" },
  ]}
/>
```

### Disable History

```tsx
// Disable history and use default tags
<Footer useHistory={false} />
```

## Tag Closing Behavior

When a user closes a tag in the footer:

- **Default Tags**: Removed only from the local footer display (no effect on global state)
- **History Tags**: Permanently removed from the global navigation history
  - The page is removed from `navigationHistory` array in the global store
  - If the removed page was the current page, navigation automatically switches to the last page in history
  - The tag disappears from all microfrontends using the history feature
  - This action cannot be undone (page must be visited again to reappear in history)

## Visual Styling

History tags have a distinct visual appearance:

- Light blue background (`#e3f2fd`)
- Blue text color (`#1976d2`)
- Clock icon (🕒) prefix
- Hover effects that match the theme
- Special active state styling

## Technical Details

- **Global Store Access**: Uses `window.globalMicroFrontendStore` from the shared library
- **History Limit**: Shows maximum 5 recent unique pages
- **Page Labels**: Automatically maps page keys to user-friendly labels
- **Subscription**: Automatically updates when navigation history changes
- **Fallback**: Works in standalone mode with default tags when global store is unavailable

## File Structure

```
src/
├── components/
│   ├── FooterTags.tsx      # Renders individual tags
│   └── index.ts            # Component exports
├── hooks/
│   ├── useNavigationHistory.ts  # History tracking hook
│   └── index.ts            # Hook exports
├── types/
│   ├── footer.ts           # TypeScript interfaces
│   └── index.ts            # Type exports
├── utils/
│   ├── navigationUtils.ts  # History utilities
│   └── index.ts            # Utility exports
└── Footer.tsx              # Main footer component
```
