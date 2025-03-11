"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
/**
 * Service for handling OpenAI text generation requests
 */
class OpenAIService {
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey,
        });
    }
    /**
     * Generate text based on a prompt
     * @param prompt - The prompt to generate text from
     * @param textType - The type of text to generate (blog, email, report, social, task)
     * @param existingText - Optional existing text to use as context
     * @returns Promise with generated text
     */
    async generateText(prompt, textType, existingText) {
        try {
            let systemPrompt = this.getSystemPromptForTextType(textType);
            let userPrompt = prompt;
            // If existing text is provided, include it in the prompt
            if (existingText) {
                userPrompt = `${prompt}\n\nBestaande tekst om mee te werken:\n${existingText}`;
            }
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 1500,
            });
            return response.choices[0]?.message?.content || '';
        }
        catch (error) {
            console.error('OpenAI text generation error:', error);
            throw new Error('Failed to generate text');
        }
    }
    /**
     * Get the appropriate system prompt based on text type
     * @param textType - The type of text to generate
     * @returns System prompt for the specified text type
     */
    getSystemPromptForTextType(textType) {
        switch (textType.toLowerCase()) {
            case 'blog':
                return 'Je bent een professionele blogger. Schrijf een boeiende blog post in het Nederlands met een duidelijke structuur, inclusief inleiding, hoofdpunten en conclusie. Gebruik een conversationele toon en zorg voor een goede leesbaarheid.';
            case 'email':
                return 'Je bent een professionele communicatiespecialist. Schrijf een duidelijke en effectieve e-mail in het Nederlands met een passende aanhef, kernboodschap en afsluiting. Pas de toon aan op basis van de context.';
            case 'report':
                return 'Je bent een analist. Schrijf een gestructureerd verslag in het Nederlands met een duidelijke indeling, objectieve toon en feitelijke presentatie. Zorg voor een professionele en formele schrijfstijl.';
            case 'social':
                return 'Je bent een social media expert. Schrijf een pakkende social media post in het Nederlands die aandacht trekt en engagement stimuleert. Houd de tekst kort, krachtig en relevant voor het platform.';
            case 'task':
                return 'Je bent een projectmanager. Schrijf een duidelijke taakbeschrijving in het Nederlands met concrete actiepunten, verantwoordelijkheden en deadlines. Zorg voor een heldere en beknopte formulering.';
            default:
                return 'Je bent een professionele tekstschrijver. Schrijf een heldere en gestructureerde tekst in het Nederlands die past bij het gevraagde doel. Zorg voor een logische opbouw en duidelijke boodschap.';
        }
    }
}
exports.default = new OpenAIService();
