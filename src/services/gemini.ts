// src/services/gemini.ts
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function analyzeCode(code: string, language: string, action: 'explain' | 'fix' | 'quiz') {
  if (!apiKey) {
    throw new Error('مفتاح API غير متوفر في ملف .env.local');
  }

  const prompts = {
    explain: `قم بشرح كود ${language} التالي بشكل مبسط ومفصل للمبتدئين باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
    fix: `ابحث عن الأخطاء والمشاكل في كود ${language} التالي، واقترح النسخة المحسنة مع توضيح الفروق باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
    quiz: `أنشئ سؤالين اختياريين (Multiple Choice) لاختبار فهم المستخدم لكود ${language} التالي مع حلولهم وشرح باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
  };

const response = await ai.models.generateContent({
  model: 'gemini-3.6-flash',
  contents: prompts[action],
});

  return response.text;
}