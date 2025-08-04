# React + Vite Micro-Frontend Architecture

A complete micro-frontend setup using React, Vite, and Module Federation that mimics Webpack's Module Federation capabilities.

## 🏗️ Architecture Overview

This project demonstrates a micro-frontend architecture with:

- **Shell Application (Host)** - Main container that orchestrates micro-frontends
- **Header Micro-Frontend** - Navigation and branding component
- **Footer Micro-Frontend** - Footer content and links component

## 📦 Project Structure

```
react-vite-microfrontend/
├── packages/
│   ├── shell/              # Host application (port 3000)
│   ├── mf-header/          # Header micro-frontend (port 3001)
│   └── mf-footer/          # Footer micro-frontend (port 3002)
├── package.json            # Root package.json with workspace scripts
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Development Mode

Start all applications simultaneously:

```bash
npm run dev
```

This will start:

- Shell app on <http://localhost:3000>
- Header MF on <http://localhost:3001>
- Footer MF on <http://localhost:3002>

### 3. Individual Development

You can also run each micro-frontend independently:

```bash
# Shell application
npm run dev:shell

# Header micro-frontend
npm run dev:mf1

# Footer micro-frontend
npm run dev:mf2
```

## 🏭 Production Build

```bash
# Build all applications
npm run build

# Build individually
npm run build:shell
npm run build:mf1
npm run build:mf2
```

## 🔧 Key Technologies

- **Vite** - Fast build tool and dev server
- **@originjs/vite-plugin-federation** - Module Federation for Vite
- **React 18** - UI library with latest features
- **TypeScript** - Type safety and better DX

## 📋 Features

### ✅ Module Federation

- Dynamic loading of micro-frontends
- Shared dependencies (React, React-DOM)
- Independent deployment capabilities

### ✅ Development Experience

- Hot Module Replacement (HMR)
- Independent development of micro-frontends
- TypeScript support with proper type declarations

### ✅ Error Handling

- Error boundaries for micro-frontend failures
- Graceful fallbacks with loading states
- Isolated failure scenarios

### ✅ Styling Isolation

- CSS modules support
- Independent styling per micro-frontend
- No style conflicts between applications

## 🏗️ How It Works

### 1. Shell Application (Host)

The shell application acts as the main container that:

- Loads and orchestrates micro-frontends
- Provides error boundaries
- Manages shared dependencies
- Handles routing and navigation

### 2. Micro-Frontends (Remotes)

Each micro-frontend:

- Exposes specific components via Module Federation
- Can be developed and deployed independently
- Shares common dependencies with the host
- Can run standalone for development

### 3. Module Federation Configuration

**Shell (Host) Configuration:**

```typescript
federation({
  name: "shell",
  remotes: {
    mfHeader: "http://localhost:3001/assets/remoteEntry.js",
    mfFooter: "http://localhost:3002/assets/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
});
```

**Micro-Frontend (Remote) Configuration:**

```typescript
federation({
  name: "mfHeader",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/Header.tsx",
  },
  shared: ["react", "react-dom"],
});
```

## 🔄 Deployment Strategies

### 1. Independent Deployment

Each micro-frontend can be deployed separately:

- Build and deploy header MF to CDN/server
- Build and deploy footer MF to CDN/server
- Update shell application with new remote URLs
- Deploy shell application

### 2. Versioning Strategy

- Use semantic versioning for each micro-frontend
- Update remote URLs in shell when needed
- Implement fallback mechanisms for version mismatches

## 🛠️ Customization

### Adding New Micro-Frontends

1. **Create new package:**

   ```bash
   mkdir packages/mf-newapp
   cd packages/mf-newapp
   npm init -y
   ```

2. **Add Vite configuration:**

   ```typescript
   federation({
     name: "mfNewApp",
     filename: "remoteEntry.js",
     exposes: {
       "./NewComponent": "./src/NewComponent.tsx",
     },
     shared: ["react", "react-dom"],
   });
   ```

3. **Update shell application:**

   ```typescript
   remotes: {
     mfHeader: 'http://localhost:3001/assets/remoteEntry.js',
     mfFooter: 'http://localhost:3002/assets/remoteEntry.js',
     mfNewApp: 'http://localhost:3003/assets/remoteEntry.js', // New
   }
   ```

### Environment Configuration

Update remote URLs for different environments:

```typescript
const getRemoteUrl = (name: string, port: number) => {
  const isDev = process.env.NODE_ENV === "development";
  return isDev ? `http://localhost:${port}/assets/remoteEntry.js` : `https://cdn.example.com/${name}/remoteEntry.js`;
};
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors in Development**

   - Ensure all apps run on different ports
   - Check Vite dev server configuration

2. **Module Loading Failures**

   - Verify remote URLs are accessible
   - Check network tab for failed requests
   - Ensure micro-frontends are running

3. **Type Errors**
   - Update type declarations in `vite-env.d.ts`
   - Ensure consistent React versions

### Debug Mode

Enable verbose logging:

```typescript
federation({
  // ... other config
  debug: true, // Add this for detailed logs
});
```

## 📚 Additional Resources

- [Vite Module Federation Plugin](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Documentation](https://module-federation.github.io/)
- [Micro-Frontends Best Practices](https://martinfowler.com/articles/micro-frontends.html)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test across all micro-frontends
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
