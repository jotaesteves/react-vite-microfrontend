# Micro-Frontend Testing Guide

## Manual Testing Checklist

### 1. Development Environment Test

- [ ] All dependencies installed: `npm run install:all`
- [ ] All applications start: `npm run dev`
- [ ] Shell app loads at http://localhost:3000
- [ ] Header MF loads at http://localhost:3001
- [ ] Footer MF loads at http://localhost:3002

### 2. Integration Test

- [ ] Shell app displays header component from remote
- [ ] Shell app displays footer component from remote
- [ ] No console errors in shell app
- [ ] Hot reload works when editing micro-frontends

### 3. Error Boundary Test

- [ ] Stop header MF (Ctrl+C on header terminal)
- [ ] Shell app shows "Loading Header..." fallback
- [ ] Shell app shows error boundary message after timeout
- [ ] Restart header MF - component loads again

### 4. Independent Development Test

- [ ] Edit header component styles/content
- [ ] Changes reflect in both standalone and shell views
- [ ] Edit footer component
- [ ] Changes reflect in both standalone and shell views

### 5. Build Test

- [ ] Build all apps: `npm run build`
- [ ] All builds complete without errors
- [ ] Dist folders created in each package

## Testing Commands

```bash
# Start all applications
npm run dev

# Test individual micro-frontends
npm run dev:shell  # Port 3000
npm run dev:mf1    # Port 3001
npm run dev:mf2    # Port 3002

# Build for production
npm run build

# Install all dependencies
npm run install:all
```

## Expected Behavior

### Shell Application (localhost:3000)

- Should display integrated page with header, main content, and footer
- Header should have navigation and buttons
- Footer should have multiple sections with links
- Smooth loading transitions

### Header Micro-Frontend (localhost:3001)

- Should display header component in standalone mode
- Title: "Header Micro Frontend - Standalone Mode"
- Navigation bar with gradient background

### Footer Micro-Frontend (localhost:3002)

- Should display footer component in standalone mode
- Title: "Footer Micro Frontend - Standalone Mode"
- Multi-column footer with dark background

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -ti:3000
lsof -ti:3001
lsof -ti:3002

# Kill process
kill -9 <PID>
```

### Module Federation Errors

- Check remote URLs are accessible
- Verify all apps are running
- Check browser network tab for failed requests
- Ensure shared dependencies match

### CORS Issues

- All apps must run on localhost
- Check Vite dev server configuration
- Verify port configuration in vite.config.ts
