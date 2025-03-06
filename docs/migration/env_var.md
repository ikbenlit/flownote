# Environment Variables

## Frontend (Vite)

### Firebase Configuratie
```env
VITE_FIREBASE_API_KEY=            # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN=        # Firebase auth domain
VITE_FIREBASE_PROJECT_ID=         # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET=     # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID= # Firebase messaging sender ID
VITE_FIREBASE_APP_ID=             # Firebase app ID
```

### API Configuratie
```env
VITE_API_URL=                     # Backend API URL (default: http://localhost:3000)
```

## Backend (Next.js API Routes)

### API Keys
```env
DEEPGRAM_API_KEY=                 # Deepgram API key voor spraak-naar-tekst
OPENAI_API_KEY=                   # OpenAI API key voor AI tekstgeneratie
```

### Server Configuratie
```env
PORT=3000                         # Server poort (default: 3000)
NODE_ENV=development              # Node environment (development/production)
```

## Development vs Production

### Development
- Frontend draait op `http://localhost:5173`
- API server draait op `http://localhost:3000`
- CORS is geconfigureerd voor lokale ontwikkeling

### Production
- Frontend gedeployed op Vercel
- API routes geïntegreerd in dezelfde Vercel deployment
- CORS geconfigureerd voor productie domein

## Veiligheid
- Alle API keys moeten veilig worden opgeslagen in environment variables
- Frontend environment variables moeten beginnen met `VITE_`
- API keys mogen nooit worden gecommit in version control
- In productie worden environment variables geconfigureerd via Vercel dashboard
