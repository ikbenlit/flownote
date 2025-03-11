"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const ws_1 = require("ws");
const http_1 = require("http");
const openai_routes_1 = __importDefault(require("./routes/openai-routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Create HTTP server
const server = (0, http_1.createServer)(app);
// Create WebSocket server
const wss = new ws_1.Server({ server });
// Configure multer for memory storage
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Enable CORS with specific origin in production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://flownote-five.vercel.app']
        : 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use('/api/openai', openai_routes_1.default);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
