# FlowNote 📝

FlowNote is een moderne notitie- en taakbeheerapplicatie die AI-gestuurde tekstgeneratie integreert met een rijke tekstbewerker. De applicatie is gebouwd met React, TypeScript en Firebase, met focus op gebruiksgemak en productiviteit.

## ✨ Features

- 📝 Rijke tekstbewerking met TipTap editor
- 🎯 Geïntegreerd taakbeheer met tekstmarkeringen
- 🤖 AI-gestuurde tekstgeneratie met OpenAI
- 🌙 Dark mode ondersteuning
- 📱 Volledig responsive design
- 🔄 Offline synchronisatie
- 🏷️ Tags voor notitie-organisatie
- 🔒 Google authenticatie
- 📊 Dashboard met recente notities

## 🚀 Snelle Start

### Vereisten

- Node.js 18+ 
- npm of yarn
- Een Firebase project
- Een OpenAI API key

### Installatie

1. Clone de repository:
```bash
git clone https://github.com/jouw-username/flownote.git
cd flownote/frontend-web
```

2. Installeer dependencies:
```bash
npm install
# of
yarn install
```

3. Maak een `.env` bestand aan in de root van het project:
```env
VITE_FIREBASE_API_KEY=jouw-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=jouw-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=jouw-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=jouw-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=jouw-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=jouw-firebase-app-id
VITE_OPENAI_API_KEY=jouw-openai-api-key
```

4. Start de development server:
```bash
npm run dev
# of
yarn dev
```

De applicatie is nu beschikbaar op `http://localhost:5173`

## 🛠️ Gebouwd met

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Backend services
- [OpenAI API](https://openai.com/) - AI text generation

## 📁 Project Structuur

```
src/
├── components/     # Herbruikbare UI componenten
├── pages/         # Pagina componenten
├── context/       # React Context providers
├── services/      # API en externe services
└── styles/        # Global styling
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Bouw voor productie
- `npm run lint` - Controleer code met ESLint
- `npm run preview` - Preview productie build lokaal

## 🤝 Bijdragen

Bijdragen zijn welkom! Zie [CONTRIBUTING.md](CONTRIBUTING.md) voor details.

## 📝 Licentie

Dit project is gelicentieerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🙏 Credits

- Fonts: Architects Daughter, Patrick Hand, Caveat, en Kalam
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- UI Inspiratie: [Notion](https://notion.so)

## 📫 Contact

- GitHub Issues: [Issues](https://github.com/jouw-username/flownote/issues)
- Email: jouw@email.com
