# Project Overzicht

- **Naam:** flownote
- **Versie:** 0.1.0
- **Framework:** Next.js 14.2.24
- **Root Directory:** frontend-web
- **Node.js Versie:** 18.x (gespecificeerd in `package.json` en Vercel-instellingen)
- **Deployment:** Vercel ([flownote-five.vercel.app](https://flownote-five.vercel.app/))

## Belangrijke Configuratiebestanden

### 1. `tsconfig.json`
- **Compiler Options:**
  - `target`: "es5" (compileert naar ES5 voor brede compatibiliteit)
  - `lib`: ["dom", "dom.iterable", "esnext"] (ondersteuning voor DOM en ESNext-features)
  - `allowJs`: true (JavaScript-bestanden toegestaan)
  - `strict`: true (strikte typechecking)
  - `module`: "esnext" (moderne module syntax)
  - `moduleResolution`: "bundler" (voor compatibiliteit met bundlers zoals Next.js)
  - `jsx`: "preserve" (JSX voor Next.js)
  - `paths`: {"@/*": ["./*"]} (alias voor imports vanaf root)
- **Inclusief:** "next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"
- **Exclusief:** "node_modules"

### 2. `tailwind.config.js`
- **Content:** 
  - `./src/**/*.{js,ts,jsx,tsx,mdx}`
  - `./app/**/*.{js,ts,jsx,tsx,mdx}`
  - `./components/**/*.{js,ts,jsx,tsx,mdx}`
  - `./pages/**/*.{js,ts,jsx,tsx,mdx}`
- **Dark Mode:** "class" (gebaseerd op CSS-klasse)
- **Thema Uitbreidingen:**
  - **Kleuren:** Custom light- en dark-modekleuren (bijv. `primary.blue`: '#3B82F6', `dark.bg.primary`: '#1A1F2B')
  - **Lettertypen:** Custom fonts zoals 'architects-daughter', 'inter', 'space-grotesk'
  - **Tekengrootte:** Custom sizes (bijv. 'app-title': ['28px', '1.2'], 'body': ['16px', '1.6'])
  - **Typografie:** Aangepaste stijlen voor links, strong tags en code
- **Plugins:** `@tailwindcss/typography`

### 3. `package.json`
- **Scripts:**
  - `"dev": "next dev"`
  - `"build": "next build"`
  - `"start": "next start"`
  - `"lint": "eslint ."`
- **Engines:** `"node": "18.x"`
- **Dependencies (selectie):**
  - `next`: ^14.0.4
  - `react`, `react-dom`: ^18.2.0
  - `firebase`: ^11.3.1
  - `openai`: ^4.85.4
  - `react-beautiful-dnd`: ^13.1.1 (deprecated, overweeg update)
- **Dev Dependencies (selectie):**
  - `typescript`: ^5.7.2
  - `tailwindcss`: ^3.4.1
  - `eslint-config-next`: ^15.2.1
- **Polyfills:** `crypto-browserify`, `stream-browserify`, etc.

### 4. `next.config.js`
- **ESLint:** `ignoreDuringBuilds: true` (negeert ESLint-fouten tijdens build)
- **Headers:** CORS voor `/api/:path*` (bijv. `Access-Control-Allow-Origin: '*'`)
- **TypeScript:** `ignoreBuildErrors: true` (negeert TS-fouten tijdens build)
- **Optimalisaties:**
  - `poweredByHeader: false`
  - `reactStrictMode: true`
- **Output:** "standalone" (voor standalone deployment)

### 5. `vercel.json`
- **Instellingen:**
  - `cleanUrls: true`
  - `trailingSlash: false`
  - `framework: "nextjs"`
- **Headers:** Algemene beveiligingsheaders voor `/(.*)`:
  - `X-Content-Type-Options: "nosniff"`
  - `X-Frame-Options: "DENY"`
  - `X-XSS-Protection: "1; mode=block"`
- **Opmerkingen:** `outputDirectory` is verwijderd om de `routes-manifest.json`-fout op Vercel op te lossen.

## Vercel Deployment Instellingen
- **Framework Preset:** Next.js
- **Root Directory:** frontend-web
- **Node.js Versie:** 18.x
- **Build Commando:** Standaard (`npm run build`)
- **Output Directory:** Standaard (.next, na verwijdering van custom `outputDirectory`)

## Opgeloste Problemen
- **Vercel Build Fout:** Foutmelding `routes-manifest.json` niet gevonden opgelost door `outputDirectory` te verwijderen uit `vercel.json`.
- **Resultaat:** Succesvolle deployment na commit `3c7564a`.