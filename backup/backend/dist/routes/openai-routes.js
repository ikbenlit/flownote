"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_service_1 = __importDefault(require("../services/openai-service"));
const router = express_1.default.Router();
/**
 * @route POST /api/openai/generate
 * @desc Generate text using OpenAI
 * @access Public
 * @body {
 *   prompt: string,
 *   textType: string,
 *   existingText?: string
 * }
 */
router.post('/generate', async (req, res) => {
    try {
        const { prompt, textType, existingText } = req.body;
        // Validate required fields
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }
        if (!textType) {
            res.status(400).json({ error: 'Text type is required' });
            return;
        }
        // Validate text type
        const validTextTypes = ['blog', 'email', 'report', 'social', 'task'];
        if (!validTextTypes.includes(textType.toLowerCase())) {
            res.status(400).json({
                error: 'Invalid text type',
                validTypes: validTextTypes
            });
            return;
        }
        // Generate text using OpenAI service
        const generatedText = await openai_service_1.default.generateText(prompt, textType, existingText);
        // Return the generated text
        res.json({ generatedText });
    }
    catch (error) {
        console.error('Text generation error:', error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
});
exports.default = router;
