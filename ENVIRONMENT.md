# Environment Configuration for Micro-Frontends

## Development Environment

### Local Development URLs

- **host App**: <http://localhost:3000>
- **Header MF**: <http://localhost:3001/assets/remoteEntry.js>
- **Footer MF**: <http://localhost:3002/assets/remoteEntry.js>

### Environment Variables

Create `.env.local` files in each package for environment-specific configuration:

#### packages/host/.env.local

```env
VITE_HEADER_MF_URL=http://localhost:3001/assets/remoteEntry.js
VITE_FOOTER_MF_URL=http://localhost:3002/assets/remoteEntry.js
VITE_APP_ENV=development
```

#### packages/mf-header/.env.local

```env
VITE_APP_NAME=mf-header
VITE_APP_ENV=development
```

#### packages/mf-footer/.env.local

```env
VITE_APP_NAME=mf-footer
VITE_APP_ENV=development
```

## Production Environment

### Example Production URLs

```env
# Production host
VITE_HEADER_MF_URL=https://cdn.example.com/mf-header/assets/remoteEntry.js
VITE_FOOTER_MF_URL=https://cdn.example.com/mf-footer/assets/remoteEntry.js
VITE_APP_ENV=production
```

### CDN Configuration

For production deployments, update the Vite configuration to use environment variables:

#### packages/host/vite.config.ts (Enhanced)

```typescript
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          mfHeader: env.VITE_HEADER_MF_URL || "http://localhost:3001/assets/remoteEntry.js",
          mfFooter: env.VITE_FOOTER_MF_URL || "http://localhost:3002/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 3000,
    },
  };
});
```

## Staging Environment

### Staging URLs

```env
VITE_HEADER_MF_URL=https://staging-cdn.example.com/mf-header/assets/remoteEntry.js
VITE_FOOTER_MF_URL=https://staging-cdn.example.com/mf-footer/assets/remoteEntry.js
VITE_APP_ENV=staging
```

## Docker Configuration

### Development Docker Compose

```yaml
version: "3.8"
services:
  host:
    build: ./packages/host
    ports:
      - "3000:3000"
    environment:
      - VITE_HEADER_MF_URL=http://header:3001/assets/remoteEntry.js
      - VITE_FOOTER_MF_URL=http://footer:3002/assets/remoteEntry.js
    depends_on:
      - header
      - footer

  header:
    build: ./packages/mf-header
    ports:
      - "3001:3001"
    environment:
      - VITE_APP_NAME=mf-header

  footer:
    build: ./packages/mf-footer
    ports:
      - "3002:3002"
    environment:
      - VITE_APP_NAME=mf-footer
```

## CI/CD Pipeline Variables

### GitHub Actions / GitLab CI

```yaml
env:
  # Development
  DEV_HEADER_MF_URL: "http://localhost:3001/assets/remoteEntry.js"
  DEV_FOOTER_MF_URL: "http://localhost:3002/assets/remoteEntry.js"

  # Staging
  STAGING_HEADER_MF_URL: "https://staging-cdn.example.com/mf-header/assets/remoteEntry.js"
  STAGING_FOOTER_MF_URL: "https://staging-cdn.example.com/mf-footer/assets/remoteEntry.js"

  # Production
  PROD_HEADER_MF_URL: "https://cdn.example.com/mf-header/assets/remoteEntry.js"
  PROD_FOOTER_MF_URL: "https://cdn.example.com/mf-footer/assets/remoteEntry.js"
```

## Cross-Origin Configuration

### CORS Headers for Production

Ensure your CDN/server serves the micro-frontends with proper CORS headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Nginx Configuration Example

```nginx
location /mf-header/ {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';

    # Serve static files
    try_files $uri $uri/ =404;
}
```
