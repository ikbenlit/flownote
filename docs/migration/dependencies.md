# Dependencies Overzicht

## Frontend Dependencies

### Core Dependencies
```json
{
  "react": "^18.3.1",             // React core library
  "react-dom": "^18.3.1",         // React DOM rendering
  "next": "^14.2.24",            // Next.js framework voor API routes
  "vite": "^6.1.0",              // Build tool en development server
  "typescript": "~5.7.2"          // TypeScript support
}
```

### UI & Styling
```json
{
  "@headlessui/react": "^2.2.0",           // Toegankelijke UI componenten
  "@radix-ui/react-context-menu": "^2.2.6", // Context menu componenten
  "@tailwindcss/typography": "^0.5.16",     // Tailwind typography plugin
  "tailwindcss": "^3.4.1",                  // Utility-first CSS framework
  "react-icons": "^5.5.0",                  // Icon library
  "react-beautiful-dnd": "^13.1.1",         // Drag-and-drop functionaliteit
  "react-colorful": "^5.6.1"                // Kleurkiezer component
}
```

### Editor & Content
```json
{
  "@tiptap/extension-highlight": "^2.11.5",  // TipTap highlight extensie
  "@tiptap/extension-link": "^2.11.5",       // TipTap link extensie
  "@tiptap/extension-task-item": "^2.11.5",  // TipTap taak item extensie
  "@tiptap/extension-task-list": "^2.11.5",  // TipTap takenlijst extensie
  "@tiptap/extension-underline": "^2.11.5",  // TipTap onderstrepen extensie
  "@tiptap/react": "^2.11.5",                // TipTap React integratie
  "@tiptap/starter-kit": "^2.11.5"           // TipTap basis functionaliteit
}
```

### Routing & State
```json
{
  "react-router-dom": "^7.2.0",    // Client-side routing
  "react-helmet-async": "^2.0.5"   // Document head management
}
```

### Utilities
```json
{
  "axios": "^1.7.9",              // HTTP client
  "date-fns": "^4.1.0",           // Datum manipulatie
  "uuid": "^11.1.0",              // Unieke ID generatie
  "@types/uuid": "^10.0.0"        // TypeScript types voor UUID
}
```

### Firebase
```json
{
  "firebase": "^11.3.1"           // Firebase SDK
}
```

## Backend Dependencies

### Core Dependencies
```json
{
  "express": "^4.21.2",           // Web framework
  "cors": "^2.8.5",               // CORS middleware
  "dotenv": "^16.4.7",            // Environment variables
  "multer": "^1.4.5-lts.1"        // File upload handling
}
```

### API Services
```json
{
  "openai": "^4.85.4",            // OpenAI API client
  "@deepgram/sdk": "^3.11.2"      // Deepgram API client
}
```

### Authentication
```json
{
  "firebase-admin": "^13.1.0"     // Firebase Admin SDK
}
```

## Development Dependencies

### Frontend
```json
{
  "@vitejs/plugin-react": "^4.3.4",          // Vite React plugin
  "autoprefixer": "^10.4.17",                // PostCSS autoprefixer
  "concurrently": "^8.2.2",                  // Parallel commands uitvoeren
  "eslint": "^9.19.0",                       // Linting
  "postcss": "^8.4.35",                      // CSS transformaties
  "@types/react": "^19.0.8",                 // React TypeScript types
  "@types/react-dom": "^19.0.3"              // React DOM TypeScript types
}
```

### Backend
```json
{
  "@types/express": "^5.0.0",      // Express TypeScript types
  "@types/multer": "^1.4.12",      // Multer TypeScript types
  "@types/cors": "^2.8.17",        // CORS TypeScript types
  "nodemon": "^3.1.9",             // Automatische server herstart
  "ts-node": "^10.9.2",            // TypeScript runtime
  "typescript": "^5.7.3"           // TypeScript compiler
}
```

## Versie Management
- Alle dependencies gebruiken semver versioning
- Major versies zijn vastgezet voor stabiliteit
- Patch en minor updates zijn toegestaan voor bugfixes en kleine verbeteringen
- Dependencies worden regelmatig geüpdatet voor security patches
