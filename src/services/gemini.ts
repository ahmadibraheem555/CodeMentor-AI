// // // src/services/gemini.ts
// // import { GoogleGenAI } from '@google/genai';

// // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// // const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// // export async function analyzeCode(code: string, language: string, action: 'explain' | 'fix' | 'quiz') {
// //   if (!apiKey) {
// //     throw new Error('مفتاح API غير متوفر في ملف .env.local');
// //   }

// //   const prompts = {
// //     explain: `قم بشرح كود ${language} التالي بشكل مبسط ومفصل للمبتدئين باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
// //     fix: `ابحث عن الأخطاء والمشاكل في كود ${language} التالي، واقترح النسخة المحسنة مع توضيح الفروق باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
// //     quiz: `أنشئ سؤالين اختياريين (Multiple Choice) لاختبار فهم المستخدم لكود ${language} التالي مع حلولهم وشرح باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
// //   };

// // const response = await ai.models.generateContent({
// //   model: 'gemini-3.6-flash',
// //   contents: prompts[action],
// // });

// //   return response.text;
// // }



// // src/services/gemini.ts
// import { GoogleGenAI } from '@google/genai';

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// type Action = 'explain' | 'fix' | 'quiz';

// // The SDK throws errors whose .message is often a raw JSON blob from
// // Google's API (e.g. {"error":{"code":503,"message":"...","status":"UNAVAILABLE"}}).
// // This maps the common cases to a short Arabic message instead of showing that JSON.
// function toFriendlyError(err: unknown): Error {
//   const raw = err instanceof Error ? err.message : String(err);

//   if (raw.includes('"code":503') || raw.includes('UNAVAILABLE') || raw.toLowerCase().includes('overloaded')) {
//     return new Error('نموذج Gemini مزدحم حاليًا من طرف Google (خطأ 503) — هاد مش خطأ بالكود، جرّب بعد شوي.');
//   }
//   if (raw.includes('"code":429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('rate limit')) {
//     return new Error('تجاوزت الحد المسموح من الطلبات على مفتاحك (Rate limit) — استنى دقيقة وجرّب مرة ثانية.');
//   }
//   if (raw.includes('API_KEY_INVALID') || raw.toLowerCase().includes('api key not valid')) {
//     return new Error('مفتاح API غير صالح — تأكد منه بملف .env.local.');
//   }
//   return new Error(raw);
// }

// export async function analyzeCode(code: string, language: string, action: Action) {
//   if (!apiKey) {
//     throw new Error('مفتاح API غير متوفر في ملف .env.local');
//   }

//   const prompts = {
//     explain: `قم بشرح كود ${language} التالي بشكل مبسط ومفصل للمبتدئين باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
//     fix: `ابحث عن الأخطاء والمشاكل في كود ${language} التالي، واقترح النسخة المحسنة مع توضيح الفروق باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
//     quiz: `أنشئ سؤالين اختياريين (Multiple Choice) لاختبار فهم المستخدم لكود ${language} التالي مع حلولهم وشرح باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
//   };

//   const request = () =>
//     ai.models.generateContent({
//       model: 'gemini-3.6-flash',
//       contents: prompts[action],
//     });

//   try {
//     const response = await request();
//     return response.text;
//   } catch (err) {
//     const raw = err instanceof Error ? err.message : String(err);
//     const isTransientOverload = raw.includes('"code":503') || raw.includes('UNAVAILABLE');

//     // Google's 503 usually clears within a second or two, so it's worth one
//     // silent retry before bothering the user with an error.
//     if (isTransientOverload) {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       try {
//         const response = await request();
//         return response.text;
//       } catch (err2) {
//         throw toFriendlyError(err2);
//       }
//     }

//     throw toFriendlyError(err);
//   }
// }







// src/services/gemini.ts
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

type Action = 'explain' | 'fix' | 'quiz';

// The SDK throws errors whose .message is often a raw JSON blob from
// Google's API (e.g. {"error":{"code":503,"message":"...","status":"UNAVAILABLE"}}).
// This maps the common cases to a short Arabic message instead of showing that JSON.
function toFriendlyError(err: unknown): Error {
  const raw = err instanceof Error ? err.message : String(err);

  if (raw.includes('"code":503') || raw.includes('UNAVAILABLE') || raw.toLowerCase().includes('overloaded')) {
    return new Error('نموذج Gemini مزدحم حاليًا من طرف Google (خطأ 503) — جرّبنا مرتين تلقائيًا وضلت الزحمة مستمرة، جرّب بعد شوي.');
  }
  if (raw.includes('"code":429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('rate limit')) {
    return new Error('تجاوزت الحد المسموح من الطلبات على مفتاحك (Rate limit) — استنى دقيقة وجرّب مرة ثانية.');
  }
  if (raw.includes('API_KEY_INVALID') || raw.toLowerCase().includes('api key not valid')) {
    return new Error('مفتاح API غير صالح — تأكد منه بملف .env.local.');
  }
  return new Error(raw);
}

function isTransientOverload(err: unknown): boolean {
  const raw = err instanceof Error ? err.message : String(err);
  return raw.includes('"code":503') || raw.includes('UNAVAILABLE');
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeCode(code: string, language: string, action: Action) {
  if (!apiKey) {
    throw new Error('مفتاح API غير متوفر في ملف .env.local');
  }

  const prompts = {
    explain: `قم بشرح كود ${language} التالي بشكل مبسط ومفصل للمبتدئين باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
    fix: `ابحث عن الأخطاء والمشاكل في كود ${language} التالي، واقترح النسخة المحسنة مع توضيح الفروق باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
    quiz: `أنشئ سؤالين اختياريين (Multiple Choice) لاختبار فهم المستخدم لكود ${language} التالي مع حلولهم وشرح باللغة العربية:\n\n\`\`\`${language}\n${code}\n\`\`\``,
  };

  const request = () =>
    ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompts[action],
    });

  // Up to 2 silent retries with growing backoff (1.5s, then 3s) for transient
  // 503/UNAVAILABLE overload errors, before showing the user anything.
  const backoffMs = [1500, 3000];
  let lastError: unknown;

  for (let attempt = 0; attempt <= backoffMs.length; attempt++) {
    try {
      const response = await request();
      return response.text;
    } catch (err) {
      lastError = err;
      if (!isTransientOverload(err) || attempt === backoffMs.length) break;
      await sleep(backoffMs[attempt]);
    }
  }

  throw toFriendlyError(lastError);
}
