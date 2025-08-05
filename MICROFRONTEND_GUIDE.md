# React + Vite Microfrontend with Router and State Management

This project demonstrates a microfrontend architecture using React, Vite, Module Federation, React Router, and Zustand for shared state management.

## 🏗️ Architecture Overview

### Global State Management with Zustand
- **Host Application**: Uses Zustand for global state management
- **Microfrontends**: Can access the global store when running inside the host, fallback to local state when standalone
- **Shared Context**: Navigation, theme, user state, and custom data shared across all microfrontends

### Router Integration
- **React Router**: Setup for future routing enhancements
- **Navigation System**: Centralized navigation that works across microfrontends
- **History Management**: Browser history integration

## 📦 Packages

### Host Application (`packages/host`)
- Main shell application
- Contains the global Zustand store
- Manages routing and shared state
- Loads header and footer microfrontends

### Header Microfrontend (`packages/mf-header`)
- Navigation component
- Theme toggle functionality
- User authentication buttons
- Responsive to global state changes

### Footer Microfrontend (`packages/mf-footer`)
- Footer links and information
- Displays current page and theme
- Navigation integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install all dependencies
npm run install:all

# Or install individually
npm install
cd packages/host && npm install
cd ../mf-header && npm install
cd ../mf-footer && npm install
```

### Development
```bash
# Start all microfrontends in development mode
npm run hmr

# Or start individually
npm run dev:host    # Host app on http://localhost:3000
npm run dev:mf1     # Header MF on http://localhost:3001
npm run dev:mf2     # Footer MF on http://localhost:3002
```

### Production Build
```bash
# Build all applications
npm run build

# Or build individually
npm run build:host
npm run build:mf1
npm run build:mf2
```

## 🎯 Key Features

### 1. Global State Management
```typescript
// Using the global store in any microfrontend
import { useMicroFrontendNavigation, useMicroFrontendTheme } from './hooks/useMicroFrontend';

function MyComponent() {
  const { currentPage, navigate } = useMicroFrontendNavigation();
  const { theme, toggleTheme } = useMicroFrontendTheme();
  
  return (
    <div className={theme}>
      <p>Current page: {currentPage}</p>
      <button onClick={() => navigate('about')}>Go to About</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 2. Cross-Microfrontend Communication
```typescript
// Send data between microfrontends
import { useMicroFrontendSharedData } from './hooks/useMicroFrontend';

function HeaderComponent() {
  const { setData, getData } = useMicroFrontendSharedData();
  
  const shareUserData = () => {
    setData('userPreferences', { language: 'en', notifications: true });
  };
  
  const getUserData = () => {
    const prefs = getData('userPreferences');
    console.log('User preferences:', prefs);
  };
}
```

### 3. Navigation System
```typescript
// Navigate from any microfrontend
import { useNavigation } from './store/microFrontendStore';

function NavigationComponent() {
  const { currentPage, navigateTo, isCurrentPage } = useNavigation();
  
  return (
    <nav>
      <a 
        href="#home" 
        className={isCurrentPage('home') ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          navigateTo('home');
        }}
      >
        Home
      </a>
    </nav>
  );
}
```

### 4. Theme Management
```typescript
// Theme switching across all microfrontends
import { useTheme } from './store/microFrontendStore';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

## 🔧 Configuration

### Module Federation Configuration
Each microfrontend is configured with Module Federation to expose components:

```typescript
// vite.config.ts (Header MF)
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfHeader',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ]
});
```

### Global Store Setup
The host application makes the store globally available:

```typescript
// stores/globalStore.ts
declare global {
  interface Window {
    globalMicroFrontendStore: typeof useGlobalStore;
  }
}

if (typeof window !== 'undefined') {
  window.globalMicroFrontendStore = useGlobalStore;
}
```

## 📁 Project Structure
```
react-vite-microfrontend/
├── packages/
│   ├── host/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── MainContent.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useMicroFrontend.ts
│   │   │   ├── providers/
│   │   │   │   └── MicroFrontendProvider.tsx
│   │   │   ├── router/
│   │   │   │   └── microFrontendRouter.tsx
│   │   │   ├── stores/
│   │   │   │   └── globalStore.ts
│   │   │   ├── shared/
│   │   │   │   └── eventBus.ts
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   └── package.json
│   ├── mf-header/
│   │   ├── src/
│   │   │   ├── store/
│   │   │   │   └── microFrontendStore.ts
│   │   │   ├── shared/
│   │   │   │   └── eventBus.ts
│   │   │   ├── Header.tsx
│   │   │   └── main.tsx
│   │   └── package.json
│   └── mf-footer/
│       ├── src/
│       │   ├── store/
│       │   │   └── microFrontendStore.ts
│       │   ├── Footer.tsx
│       │   └── main.tsx
│       └── package.json
└── package.json
```

## 🎨 Styling and Theming
- Each microfrontend can respond to theme changes
- CSS classes are applied based on the current theme
- Consistent styling across all microfrontends

## 🧪 Testing
Each microfrontend can be developed and tested independently:
- **Standalone mode**: Run individual microfrontends for development
- **Integrated mode**: Test the full application with all microfrontends

## 🔗 Communication Methods

### 1. Global Store (Recommended)
- Type-safe state sharing
- Reactive updates across microfrontends
- Centralized state management

### 2. Event Bus (Legacy/Fallback)
- Custom event system for backward compatibility
- Useful for simple notifications

### 3. Shared Data API
- Key-value store for temporary data sharing
- Perfect for user preferences, cache, etc.

## 📋 Best Practices

1. **State Management**: Use the global store for shared state, local state for component-specific data
2. **Navigation**: Always use the navigation helpers to ensure consistency
3. **Theming**: Implement theme responsiveness in all components
4. **Error Handling**: Use Error Boundaries for graceful fallbacks
5. **TypeScript**: Maintain strong typing for better developer experience

## 🚀 Future Enhancements

- [ ] Full React Router integration
- [ ] Server-side rendering support
- [ ] Advanced caching strategies
- [ ] Micro-app routing
- [ ] Performance monitoring
- [ ] Internationalization (i18n)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
