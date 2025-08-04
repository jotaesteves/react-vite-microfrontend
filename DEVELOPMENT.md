# Development Guide

## Quick Start Commands

### Install all dependencies

```bash
npm run install:all
```

### Start development (all apps)

```bash
npm run dev
```

### Start individual apps

```bash
# Shell app (localhost:3000)
npm run dev:shell

# Header MF (localhost:3001)
npm run dev:mf1

# Footer MF (localhost:3002)
npm run dev:mf2
```

## Development Workflow

1. **Start all applications**: `npm run dev`
2. **Open shell app**: <http://localhost:3000>
3. **Make changes** to any micro-frontend
4. **See live updates** with HMR

## Architecture Details

### Module Federation Configuration

#### Shell Application (Host)

- **Port**: 3000
- **Role**: Container/Host application
- **Consumes**: Header and Footer micro-frontends
- **Configuration**:

  ```typescript
  remotes: {
    mfHeader: 'http://localhost:3001/assets/remoteEntry.js',
    mfFooter: 'http://localhost:3002/assets/remoteEntry.js',
  }
  ```

#### Header Micro-Frontend

- **Port**: 3001
- **Role**: Remote application
- **Exposes**: `./Header` component
- **Standalone URL**: <http://localhost:3001>

#### Footer Micro-Frontend

- **Port**: 3002
- **Role**: Remote application
- **Exposes**: `./Footer` component
- **Standalone URL**: <http://localhost:3002>

### Key Features

1. **Independent Development**: Each micro-frontend can be developed independently
2. **Shared Dependencies**: React and React-DOM are shared between applications
3. **Error Boundaries**: Graceful failure handling for micro-frontends
4. **Hot Module Replacement**: Fast development with live reloading
5. **TypeScript Support**: Full type safety across applications

## Testing the Setup

1. Start all applications: `npm run dev`
2. Visit <http://localhost:3000> to see the complete application
3. Visit <http://localhost:3001> to see the Header component standalone
4. Visit <http://localhost:3002> to see the Footer component standalone
5. Try stopping one micro-frontend to see error boundary in action

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3001, and 3002 are available
2. **CORS errors**: Ensure all applications are running on localhost
3. **Module loading failures**: Check that remote URLs are accessible
4. **Type errors**: Run `npm install` in each package directory

### Debug Steps

1. Check all applications are running: `ps aux | grep node`
2. Verify remote entry points:
   - <http://localhost:3001/assets/remoteEntry.js>
   - <http://localhost:3002/assets/remoteEntry.js>
3. Check browser console for errors
4. Verify network requests in DevTools
