// // // // src/App.tsx
// // // import { useState } from 'react';
// // // import Editor from '@monaco-editor/react';
// // // import { analyzeCode } from './services/gemini';
// // // import { Play, Bug, HelpCircle, Code2, Loader2 } from 'lucide-react';

// // // const defaultCode = `// أكتب أو ألصق كودك هنا للتجربة
// // // function calculateSum(arr: number[]): number {
// // //   return arr.reduce((acc, curr) => acc + curr, 0);
// // // }

// // // console.log(calculateSum([1, 2, 3, 4, 5]));`;

// // // export default function App() {
// // //   const [code, setCode] = useState<string>(defaultCode);
// // //   const [language, setLanguage] = useState<string>('typescript');
// // //   const [result, setResult] = useState<string>('');
// // //   const [loading, setLoading] = useState<boolean>(false);

// // //   const handleAction = async (action: 'explain' | 'fix' | 'quiz') => {
// // //     if (!code.trim()) return;
// // //     setLoading(true);
// // //     setResult('');
// // //     try {
// // //       const res = await analyzeCode(code, language, action);
// // //       setResult(res || 'لم يتم العثور على رد.');
// // //     } catch (err) {
// // //       const error = err as Error;
// // //       setResult(`حدث خطأ: ${error.message || 'فشل الاتصال'}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', fontFamily: 'sans-serif' }}>
// // //       {/* Header */}
// // //       <header style={{ padding: '1rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //         <h1 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// // //           <Code2 color="#61dafb" /> AI Code Tutor
// // //         </h1>
// // //         <select 
// // //           value={language} 
// // //           onChange={(e) => setLanguage(e.target.value)}
// // //           style={{ padding: '6px 12px', background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
// // //         >
// // //           <option value="typescript">TypeScript</option>
// // //           <option value="javascript">JavaScript</option>
// // //           <option value="python">Python</option>
// // //           <option value="cpp">C++</option>
// // //         </select>
// // //       </header>

// // //       {/* Main Content */}
// // //       <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
// // //         {/* Left Side: Editor */}
// // //         <div style={{ width: '50%', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
// // //           <div style={{ padding: '8px 16px', background: '#252526', display: 'flex', gap: '8px' }}>
// // //             <button onClick={() => handleAction('explain')} disabled={loading} style={btnStyle}>
// // //               <Play size={16} /> شرح الكود
// // //             </button>
// // //             <button onClick={() => handleAction('fix')} disabled={loading} style={btnStyle}>
// // //               <Bug size={16} /> اكتشاف الأخطاء
// // //             </button>
// // //             <button onClick={() => handleAction('quiz')} disabled={loading} style={btnStyle}>
// // //               <HelpCircle size={16} /> كويز تفاعلي
// // //             </button>
// // //           </div>
// // //           <Editor
// // //             height="100%"
// // //             theme="vs-dark"
// // //             language={language}
// // //             value={code}
// // //             onChange={(val) => setCode(val || '')}
// // //           />
// // //         </div>

// // //         {/* Right Side: AI Response */}
// // //         <div style={{ width: '50%', padding: '1rem', overflowY: 'auto', background: '#141414', direction: 'rtl' }}>
// // //           <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#61dafb' }}>تحليل المساعد الذكي:</h2>
// // //           {loading ? (
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
// // //               <Loader2 className="animate-spin" size={20} /> جاري التحليل بوساطة Gemini...
// // //             </div>
// // //           ) : (
// // //             <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6', background: '#1e1e1e', padding: '1rem', borderRadius: '8px' }}>
// // //               {result || 'اختر إحدى العمليات أعلاه لبدء التحليل.'}
// // //             </pre>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const btnStyle = {
// // //   display: 'flex',
// // //   alignItems: 'center',
// // //   gap: '6px',
// // //   padding: '6px 12px',
// // //   background: '#007acc',
// // //   color: '#fff',
// // //   border: 'none',
// // //   borderRadius: '4px',
// // //   cursor: 'pointer',
// // // };













// // // src/App.tsx
// // import { useEffect, useState } from 'react';
// // import Editor from '@monaco-editor/react';
// // import { analyzeCode } from './services/gemini';
// // import {
// //   Play,
// //   Bug,
// //   HelpCircle,
// //   Code2,
// //   Loader2,
// //   RotateCcw,
// //   Copy,
// //   Check,
// //   AlertTriangle,
// //   Sparkles,
// // } from 'lucide-react';
// // import './App.css';

// // const defaultCode = `// أكتب أو ألصق كودك هنا للتجربة
// // function calculateSum(arr: number[]): number {
// //   return arr.reduce((acc, curr) => acc + curr, 0);
// // }

// // console.log(calculateSum([1, 2, 3, 4, 5]));`;

// // type Action = 'explain' | 'fix' | 'quiz';

// // // Splits the AI response into plain-text and fenced code-block segments so
// // // each can be rendered with its own styling (and its own copy button).
// // type Segment =
// //   | { type: 'text'; content: string }
// //   | { type: 'code'; lang: string; content: string };

// // function parseSegments(raw: string): Segment[] {
// //   const segments: Segment[] = [];
// //   const fence = /```(\w*)\n([\s\S]*?)```/g;
// //   let lastIndex = 0;
// //   let match: RegExpExecArray | null;

// //   while ((match = fence.exec(raw)) !== null) {
// //     if (match.index > lastIndex) {
// //       segments.push({ type: 'text', content: raw.slice(lastIndex, match.index) });
// //     }
// //     segments.push({ type: 'code', lang: match[1] || 'text', content: match[2].trimEnd() });
// //     lastIndex = fence.lastIndex;
// //   }
// //   if (lastIndex < raw.length) {
// //     segments.push({ type: 'text', content: raw.slice(lastIndex) });
// //   }
// //   return segments;
// // }

// // // Very small inline-markdown renderer: **bold** and `inline code`.
// // function renderInline(text: string, keyPrefix: string) {
// //   const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
// //   return parts.map((part, i) => {
// //     if (part.startsWith('**') && part.endsWith('**')) {
// //       return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
// //     }
// //     if (part.startsWith('`') && part.endsWith('`')) {
// //       return (
// //         <code className="inline" key={`${keyPrefix}-${i}`}>
// //           {part.slice(1, -1)}
// //         </code>
// //       );
// //     }
// //     return <span key={`${keyPrefix}-${i}`}>{part}</span>;
// //   });
// // }

// // function CodeBlock({ lang, content }: { lang: string; content: string }) {
// //   const [copied, setCopied] = useState(false);
// //   const copy = async () => {
// //     try {
// //       await navigator.clipboard.writeText(content);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 1500);
// //     } catch {
// //       /* clipboard unavailable — silently ignore */
// //     }
// //   };
// //   return (
// //     <div className="code-block">
// //       <div className="code-block-head">
// //         <span>{lang}</span>
// //         <button onClick={copy} type="button">
// //           {copied ? <Check size={12} /> : <Copy size={12} />}
// //           {copied ? 'تم النسخ' : 'نسخ'}
// //         </button>
// //       </div>
// //       <pre>{content}</pre>
// //     </div>
// //   );
// // }

// // const ACTIONS: { key: Action; label: string; icon: typeof Play; shortcut: string }[] = [
// //   { key: 'explain', label: 'شرح الكود', icon: Play, shortcut: 'Ctrl+Enter' },
// //   { key: 'fix', label: 'اكتشاف الأخطاء', icon: Bug, shortcut: 'Ctrl+B' },
// //   { key: 'quiz', label: 'كويز تفاعلي', icon: HelpCircle, shortcut: 'Ctrl+Q' },
// // ];

// // export default function App() {
// //   const [code, setCode] = useState<string>(defaultCode);
// //   const [language, setLanguage] = useState<string>('typescript');
// //   const [result, setResult] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [isError, setIsError] = useState<boolean>(false);
// //   const [resultCopied, setResultCopied] = useState<boolean>(false);

// //   const handleAction = async (action: Action) => {
// //     if (!code.trim() || loading) return;
// //     setLoading(true);
// //     setResult('');
// //     setIsError(false);
// //     try {
// //       const res = await analyzeCode(code, language, action);
// //       setResult(res || 'لم يتم العثور على رد.');
// //     } catch (err) {
// //       const error = err as Error;
// //       setIsError(true);
// //       setResult(`حدث خطأ: ${error.message || 'فشل الاتصال'}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setCode(defaultCode);
// //     setResult('');
// //     setIsError(false);
// //   };

// //   const copyResult = async () => {
// //     if (!result) return;
// //     try {
// //       await navigator.clipboard.writeText(result);
// //       setResultCopied(true);
// //       setTimeout(() => setResultCopied(false), 1500);
// //     } catch {
// //       /* clipboard unavailable — silently ignore */
// //     }
// //   };

// //   // Keyboard shortcuts for the three actions, matching the hints in the toolbar.
// //   useEffect(() => {
// //     const onKeyDown = (e: KeyboardEvent) => {
// //       if (!(e.ctrlKey || e.metaKey)) return;
// //       if (e.key === 'Enter') { e.preventDefault(); handleAction('explain'); }
// //       else if (e.key.toLowerCase() === 'b') { e.preventDefault(); handleAction('fix'); }
// //       else if (e.key.toLowerCase() === 'q') { e.preventDefault(); handleAction('quiz'); }
// //     };
// //     window.addEventListener('keydown', onKeyDown);
// //     return () => window.removeEventListener('keydown', onKeyDown);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [code, language, loading]);

// //   const lineCount = code.split('\n').length;
// //   const charCount = code.length;
// //   const segments = result && !isError ? parseSegments(result) : [];

// //   return (
// //     <div className="app-shell">
// //       <header className="app-header">
// //         <div className="brand">
// //           <div className="brand-icon">
// //             <Code2 size={18} color="#4fd1c5" />
// //           </div>
// //           <div className="brand-text">
// //             <h1>AI Code Tutor</h1>
// //             <p>مدرّس البرمجة الذكي</p>
// //           </div>
// //         </div>
// //         <select
// //           className="lang-select"
// //           value={language}
// //           onChange={(e) => setLanguage(e.target.value)}
// //         >
// //           <option value="typescript">TypeScript</option>
// //           <option value="javascript">JavaScript</option>
// //           <option value="python">Python</option>
// //           <option value="cpp">C++</option>
// //         </select>
// //       </header>

// //       <div className="app-body">
// //         {/* Editor pane */}
// //         <div className="pane pane-editor">
// //           <div className="toolbar">
// //             <div className="action-group">
// //               {ACTIONS.map(({ key, label, icon: Icon }) => (
// //                 <button
// //                   key={key}
// //                   className="action-btn primary"
// //                   onClick={() => handleAction(key)}
// //                   disabled={loading || !code.trim()}
// //                   type="button"
// //                 >
// //                   <Icon size={15} /> {label}
// //                 </button>
// //               ))}
// //             </div>
// //             <button className="icon-btn" onClick={handleReset} title="إعادة تعيين الكود" type="button">
// //               <RotateCcw size={14} />
// //             </button>
// //           </div>

// //           <Editor
// //             height="100%"
// //             theme="vs-dark"
// //             language={language}
// //             value={code}
// //             onChange={(val) => setCode(val || '')}
// //             options={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', minimap: { enabled: false } }}
// //           />

// //           <div className="status-bar">
// //             <span>{lineCount} سطر</span>
// //             <span>{charCount} محرف</span>
// //             <span>Ctrl+Enter للشرح السريع</span>
// //           </div>
// //         </div>

// //         {/* Result pane */}
// //         <div className="pane pane-result">
// //           <div className="result-header">
// //             <h2>تحليل المساعد الذكي</h2>
// //             {result && !isError && (
// //               <button className="icon-btn" onClick={copyResult} title="نسخ الرد كاملاً" type="button">
// //                 {resultCopied ? <Check size={13} /> : <Copy size={13} />}
// //               </button>
// //             )}
// //           </div>

// //           <div className="result-body">
// //             {loading ? (
// //               <div className="loading-state">
// //                 <div className="loading-row">
// //                   <Loader2 size={16} className="spin" />
// //                   جاري التحليل بوساطة Gemini...
// //                 </div>
// //                 <div className="skeleton-line" style={{ width: '92%' }} />
// //                 <div className="skeleton-line" style={{ width: '78%' }} />
// //                 <div className="skeleton-line" style={{ width: '85%' }} />
// //                 <div className="skeleton-line" style={{ width: '60%' }} />
// //               </div>
// //             ) : isError ? (
// //               <div className="error-banner">
// //                 <AlertTriangle size={16} />
// //                 <span>{result}</span>
// //               </div>
// //             ) : result ? (
// //               <div className="answer-text">
// //                 {segments.map((seg, i) =>
// //                   seg.type === 'code' ? (
// //                     <CodeBlock key={i} lang={seg.lang} content={seg.content} />
// //                   ) : (
// //                     <span key={i}>{renderInline(seg.content, `t${i}`)}</span>
// //                   )
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="empty-state">
// //                 <Sparkles size={28} />
// //                 <p>اختر إحدى العمليات أعلاه لبدء التحليل، أو استخدم Ctrl+Enter للشرح السريع.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }








// // // src/App.tsx
// // import { useEffect, useState } from 'react';
// // import Editor from '@monaco-editor/react';
// // import { analyzeCode } from './services/gemini';
// // import {
// //   Play,
// //   Bug,
// //   HelpCircle,
// //   Code2,
// //   Loader2,
// //   RotateCcw,
// //   Copy,
// //   Check,
// //   AlertTriangle,
// //   Sparkles,
// //   Sun,
// //   Moon,
// // } from 'lucide-react';
// // import './App.css';

// // const defaultCode = `// أكتب أو ألصق كودك هنا للتجربة`;

// // type Action = 'explain' | 'fix' | 'quiz';

// // // Splits the AI response into plain-text and fenced code-block segments so
// // // each can be rendered with its own styling (and its own copy button).
// // type Segment =
// //   | { type: 'text'; content: string }
// //   | { type: 'code'; lang: string; content: string };

// // function parseSegments(raw: string): Segment[] {
// //   const segments: Segment[] = [];
// //   const fence = /```(\w*)\n([\s\S]*?)```/g;
// //   let lastIndex = 0;
// //   let match: RegExpExecArray | null;

// //   while ((match = fence.exec(raw)) !== null) {
// //     if (match.index > lastIndex) {
// //       segments.push({ type: 'text', content: raw.slice(lastIndex, match.index) });
// //     }
// //     segments.push({ type: 'code', lang: match[1] || 'text', content: match[2].trimEnd() });
// //     lastIndex = fence.lastIndex;
// //   }
// //   if (lastIndex < raw.length) {
// //     segments.push({ type: 'text', content: raw.slice(lastIndex) });
// //   }
// //   return segments;
// // }

// // // Very small inline-markdown renderer: **bold** and `inline code`.
// // function renderInline(text: string, keyPrefix: string) {
// //   const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
// //   return parts.map((part, i) => {
// //     if (part.startsWith('**') && part.endsWith('**')) {
// //       return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
// //     }
// //     if (part.startsWith('`') && part.endsWith('`')) {
// //       return (
// //         <code className="inline" key={`${keyPrefix}-${i}`}>
// //           {part.slice(1, -1)}
// //         </code>
// //       );
// //     }
// //     return <span key={`${keyPrefix}-${i}`}>{part}</span>;
// //   });
// // }

// // function CodeBlock({ lang, content }: { lang: string; content: string }) {
// //   const [copied, setCopied] = useState(false);
// //   const copy = async () => {
// //     try {
// //       await navigator.clipboard.writeText(content);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 1500);
// //     } catch {
// //       /* clipboard unavailable — silently ignore */
// //     }
// //   };
// //   return (
// //     <div className="code-block">
// //       <div className="code-block-head">
// //         <span>{lang}</span>
// //         <button onClick={copy} type="button">
// //           {copied ? <Check size={12} /> : <Copy size={12} />}
// //           {copied ? 'تم النسخ' : 'نسخ'}
// //         </button>
// //       </div>
// //       <pre>{content}</pre>
// //     </div>
// //   );
// // }

// // const ACTIONS: { key: Action; label: string; icon: typeof Play; shortcut: string }[] = [
// //   { key: 'explain', label: 'شرح الكود', icon: Play, shortcut: 'Ctrl+Enter' },
// //   { key: 'fix', label: 'اكتشاف الأخطاء', icon: Bug, shortcut: 'Ctrl+B' },
// //   { key: 'quiz', label: 'كويز تفاعلي', icon: HelpCircle, shortcut: 'Ctrl+Q' },
// // ];

// // export default function App() {
// //   const [code, setCode] = useState<string>(defaultCode);
// //   const [language, setLanguage] = useState<string>('typescript');
// //   const [result, setResult] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [isError, setIsError] = useState<boolean>(false);
// //   const [resultCopied, setResultCopied] = useState<boolean>(false);
// //   const [theme, setTheme] = useState<'dark' | 'light'>(() => {
// //     const saved = localStorage.getItem('ai-code-tutor-theme');
// //     if (saved === 'dark' || saved === 'light') return saved;
// //     return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
// //   });

// //   useEffect(() => {
// //     document.documentElement.setAttribute('data-theme', theme);
// //     localStorage.setItem('ai-code-tutor-theme', theme);
// //   }, [theme]);

// //   const handleAction = async (action: Action) => {
// //     if (!code.trim() || loading) return;
// //     setLoading(true);
// //     setResult('');
// //     setIsError(false);
// //     try {
// //       const res = await analyzeCode(code, language, action);
// //       setResult(res || 'لم يتم العثور على رد.');
// //     } catch (err) {
// //       const error = err as Error;
// //       setIsError(true);
// //       setResult(`حدث خطأ: ${error.message || 'فشل الاتصال'}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setCode(defaultCode);
// //     setResult('');
// //     setIsError(false);
// //   };

// //   const copyResult = async () => {
// //     if (!result) return;
// //     try {
// //       await navigator.clipboard.writeText(result);
// //       setResultCopied(true);
// //       setTimeout(() => setResultCopied(false), 1500);
// //     } catch {
// //       /* clipboard unavailable — silently ignore */
// //     }
// //   };

// //   // Keyboard shortcuts for the three actions, matching the hints in the toolbar.
// //   useEffect(() => {
// //     const onKeyDown = (e: KeyboardEvent) => {
// //       if (!(e.ctrlKey || e.metaKey)) return;
// //       if (e.key === 'Enter') { e.preventDefault(); handleAction('explain'); }
// //       else if (e.key.toLowerCase() === 'b') { e.preventDefault(); handleAction('fix'); }
// //       else if (e.key.toLowerCase() === 'q') { e.preventDefault(); handleAction('quiz'); }
// //     };
// //     window.addEventListener('keydown', onKeyDown);
// //     return () => window.removeEventListener('keydown', onKeyDown);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [code, language, loading]);

// //   const lineCount = code.split('\n').length;
// //   const charCount = code.length;
// //   const segments = result && !isError ? parseSegments(result) : [];

// //   return (
// //     <div className="app-shell">
// //       <header className="app-header">
// //         <div className="brand">
// //           <div className="brand-icon">
// //             <Code2 size={18} color="#4fd1c5" />
// //           </div>
// //           <div className="brand-text">
// //             <h1>CodeMentor AI</h1>
// //             <p>حلّل، صحّح، واختبر مهاراتك البرمجية بالذكاء الاصطناعي</p>
// //           </div>
// //         </div>
// //         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
// //           <button
// //             className="icon-btn"
// //             onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
// //             title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
// //             type="button"
// //           >
// //             {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
// //           </button>
// //           <select
// //             className="lang-select"
// //             value={language}
// //             onChange={(e) => setLanguage(e.target.value)}
// //           >
// //             <option value="typescript">TypeScript</option>
// //             <option value="javascript">JavaScript</option>
// //             <option value="python">Python</option>
// //             <option value="cpp">C++</option>
// //           </select>
// //         </div>
// //       </header>

// //       <div className="app-body">
// //         {/* Editor pane */}
// //         <div className="pane pane-editor">
// //           <div className="toolbar">
// //             <div className="action-group">
// //               {ACTIONS.map(({ key, label, icon: Icon }) => (
// //                 <button
// //                   key={key}
// //                   className="action-btn primary"
// //                   onClick={() => handleAction(key)}
// //                   disabled={loading || !code.trim()}
// //                   type="button"
// //                 >
// //                   <Icon size={15} /> {label}
// //                 </button>
// //               ))}
// //             </div>
// //             <button className="icon-btn" onClick={handleReset} title="إعادة تعيين الكود" type="button">
// //               <RotateCcw size={14} />
// //             </button>
// //           </div>

// //           <Editor
// //             height="100%"
// //             theme={theme === 'dark' ? 'vs-dark' : 'light'}
// //             language={language}
// //             value={code}
// //             onChange={(val) => setCode(val || '')}
// //             options={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', minimap: { enabled: false } }}
// //           />

// //           <div className="status-bar">
// //             <span>{lineCount} سطر</span>
// //             <span>{charCount} محرف</span>
// //             <span>Ctrl+Enter للشرح السريع</span>
// //           </div>
// //         </div>

// //         {/* Result pane */}
// //         <div className="pane pane-result">
// //           <div className="result-header">
// //             <h2>تحليل المساعد الذكي</h2>
// //             {result && !isError && (
// //               <button className="icon-btn" onClick={copyResult} title="نسخ الرد كاملاً" type="button">
// //                 {resultCopied ? <Check size={13} /> : <Copy size={13} />}
// //               </button>
// //             )}
// //           </div>

// //           <div className="result-body">
// //             {loading ? (
// //               <div className="loading-state">
// //                 <div className="loading-row">
// //                   <Loader2 size={16} className="spin" />
// //                   جاري التحليل بوساطة Gemini...
// //                 </div>
// //                 <div className="skeleton-line" style={{ width: '92%' }} />
// //                 <div className="skeleton-line" style={{ width: '78%' }} />
// //                 <div className="skeleton-line" style={{ width: '85%' }} />
// //                 <div className="skeleton-line" style={{ width: '60%' }} />
// //               </div>
// //             ) : isError ? (
// //               <div className="error-banner">
// //                 <AlertTriangle size={16} />
// //                 <span>{result}</span>
// //               </div>
// //             ) : result ? (
// //               <div className="answer-text">
// //                 {segments.map((seg, i) =>
// //                   seg.type === 'code' ? (
// //                     <CodeBlock key={i} lang={seg.lang} content={seg.content} />
// //                   ) : (
// //                     <span key={i}>{renderInline(seg.content, `t${i}`)}</span>
// //                   )
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="empty-state">
// //                 <Sparkles size={28} />
// //                 <p>اختر إحدى العمليات أعلاه لبدء التحليل، أو استخدم Ctrl+Enter للشرح السريع.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }











// // src/App.tsx
// import { useEffect, useRef, useState } from 'react';
// import Editor, { type OnMount } from '@monaco-editor/react';
// import { analyzeCode } from './services/gemini';
// import {
//   Play,
//   Bug,
//   HelpCircle,
//   Code2,
//   Loader2,
//   RotateCcw,
//   Copy,
//   Check,
//   AlertTriangle,
//   Sparkles,
//   Sun,
//   Moon,
//   ClipboardPaste,
// } from 'lucide-react';
// import './App.css';

// const defaultCode = ` //أكتب أو ألصق كودك هنا للتجربة`;

// type Action = 'explain' | 'fix' | 'quiz';

// // Splits the AI response into plain-text and fenced code-block segments so
// // each can be rendered with its own styling (and its own copy button).
// type Segment =
//   | { type: 'text'; content: string }
//   | { type: 'code'; lang: string; content: string };

// function parseSegments(raw: string): Segment[] {
//   const segments: Segment[] = [];
//   const fence = /```(\w*)\n([\s\S]*?)```/g;
//   let lastIndex = 0;
//   let match: RegExpExecArray | null;

//   while ((match = fence.exec(raw)) !== null) {
//     if (match.index > lastIndex) {
//       segments.push({ type: 'text', content: raw.slice(lastIndex, match.index) });
//     }
//     segments.push({ type: 'code', lang: match[1] || 'text', content: match[2].trimEnd() });
//     lastIndex = fence.lastIndex;
//   }
//   if (lastIndex < raw.length) {
//     segments.push({ type: 'text', content: raw.slice(lastIndex) });
//   }
//   return segments;
// }

// // Very small inline-markdown renderer: **bold** and `inline code`.
// function renderInline(text: string, keyPrefix: string) {
//   const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
//   return parts.map((part, i) => {
//     if (part.startsWith('**') && part.endsWith('**')) {
//       return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
//     }
//     if (part.startsWith('`') && part.endsWith('`')) {
//       return (
//         <code className="inline" key={`${keyPrefix}-${i}`}>
//           {part.slice(1, -1)}
//         </code>
//       );
//     }
//     return <span key={`${keyPrefix}-${i}`}>{part}</span>;
//   });
// }

// function CodeBlock({ lang, content }: { lang: string; content: string }) {
//   const [copied, setCopied] = useState(false);
//   const copy = async () => {
//     try {
//       await navigator.clipboard.writeText(content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch {
//       /* clipboard unavailable — silently ignore */
//     }
//   };
//   return (
//     <div className="code-block">
//       <div className="code-block-head">
//         <span>{lang}</span>
//         <button onClick={copy} type="button">
//           {copied ? <Check size={12} /> : <Copy size={12} />}
//           {copied ? 'تم النسخ' : 'نسخ'}
//         </button>
//       </div>
//       <pre>{content}</pre>
//     </div>
//   );
// }

// const ACTIONS: { key: Action; label: string; icon: typeof Play; shortcut: string }[] = [
//   { key: 'explain', label: 'شرح الكود', icon: Play, shortcut: 'Ctrl+Enter' },
//   { key: 'fix', label: 'اكتشاف الأخطاء', icon: Bug, shortcut: 'Ctrl+B' },
//   { key: 'quiz', label: 'كويز تفاعلي', icon: HelpCircle, shortcut: 'Ctrl+Q' },
// ];

// export default function App() {
//   const [code, setCode] = useState<string>(defaultCode);
//   const [language, setLanguage] = useState<string>('typescript');
//   const [result, setResult] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isError, setIsError] = useState<boolean>(false);
//   const [resultCopied, setResultCopied] = useState<boolean>(false);
//   const [theme, setTheme] = useState<'dark' | 'light'>(() => {
//     const saved = localStorage.getItem('ai-code-tutor-theme');
//     if (saved === 'dark' || saved === 'light') return saved;
//     return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
//   });

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('ai-code-tutor-theme', theme);
//   }, [theme]);

//   const handleAction = async (action: Action) => {
//     if (!code.trim() || loading) return;
//     setLoading(true);
//     setResult('');
//     setIsError(false);
//     try {
//       const res = await analyzeCode(code, language, action);
//       setResult(res || 'لم يتم العثور على رد.');
//     } catch (err) {
//       const error = err as Error;
//       setIsError(true);
//       setResult(`حدث خطأ: ${error.message || 'فشل الاتصال'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setCode(defaultCode);
//     setResult('');
//     setIsError(false);
//   };

//   // Monaco's built-in paste handling is unreliable on mobile browsers (the
//   // virtual keyboard's paste action often does nothing). This button reads
//   // the clipboard directly via the Clipboard API and inserts it through the
//   // editor's own API instead, which works regardless of that bug.
//   const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
//   const handleEditorMount: OnMount = (editor) => {
//     editorRef.current = editor;
//   };
//   const pasteFromClipboard = async () => {
//     try {
//       const text = await navigator.clipboard.readText();
//       if (!text) return;
//       const editor = editorRef.current;
//       if (editor) {
//         const selection = editor.getSelection();
//         editor.executeEdits('paste-button', [
//           { range: selection ?? editor.getModel()?.getFullModelRange(), text, forceMoveMarkers: true },
//         ]);
//         editor.focus();
//       } else {
//         setCode((c) => c + text);
//       }
//     } catch {
//       alert('ما قدرنا نوصل للحافظة — اسمح للمتصفح بالوصول لها وجرّب مرة ثانية.');
//     }
//   };

//   const copyResult = async () => {
//     if (!result) return;
//     try {
//       await navigator.clipboard.writeText(result);
//       setResultCopied(true);
//       setTimeout(() => setResultCopied(false), 1500);
//     } catch {
//       /* clipboard unavailable — silently ignore */
//     }
//   };

//   // Keyboard shortcuts for the three actions, matching the hints in the toolbar.
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (!(e.ctrlKey || e.metaKey)) return;
//       if (e.key === 'Enter') { e.preventDefault(); handleAction('explain'); }
//       else if (e.key.toLowerCase() === 'b') { e.preventDefault(); handleAction('fix'); }
//       else if (e.key.toLowerCase() === 'q') { e.preventDefault(); handleAction('quiz'); }
//     };
//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [code, language, loading]);

//   const lineCount = code.split('\n').length;
//   const charCount = code.length;
//   const segments = result && !isError ? parseSegments(result) : [];

//   return (
//     <div className="app-shell">
//       <header className="app-header">
//         <div className="brand">
//           <div className="brand-icon">
//             <Code2 size={18} color="#4fd1c5" />
//           </div>
//           <div className="brand-text">
//             <h1>CodeMentor AI</h1>
//             <p>حلّل، صحّح، واختبر مهاراتك البرمجية بالذكاء الاصطناعي</p>
//           </div>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <button
//             className="icon-btn"
//             onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
//             title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
//             type="button"
//           >
//             {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
//           </button>
//           <select
//             className="lang-select"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option value="typescript">TypeScript</option>
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="cpp">C++</option>
//           </select>
//         </div>
//       </header>

//       <div className="app-body">
//         {/* Editor pane */}
//         <div className="pane pane-editor">
//           <div className="toolbar">
//             <div className="action-group">
//               {ACTIONS.map(({ key, label, icon: Icon }) => (
//                 <button
//                   key={key}
//                   className="action-btn primary"
//                   onClick={() => handleAction(key)}
//                   disabled={loading || !code.trim()}
//                   type="button"
//                 >
//                   <Icon size={15} /> {label}
//                 </button>
//               ))}
//             </div>
//             <div style={{ display: 'flex', gap: 6 }}>
//               <button className="icon-btn" onClick={pasteFromClipboard} title="لصق من الحافظة" type="button">
//                 <ClipboardPaste size={14} />
//               </button>
//               <button className="icon-btn" onClick={handleReset} title="إعادة تعيين الكود" type="button">
//                 <RotateCcw size={14} />
//               </button>
//             </div>
//           </div>

//           <Editor
//             height="100%"
//             theme={theme === 'dark' ? 'vs-dark' : 'light'}
//             language={language}
//             value={code}
//             onChange={(val) => setCode(val || '')}
//             onMount={handleEditorMount}
//             options={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', minimap: { enabled: false } }}
//           />

//           <div className="status-bar">
//             <span>{lineCount} سطر</span>
//             <span>{charCount} محرف</span>
//             <span>Ctrl+Enter للشرح السريع</span>
//           </div>
//         </div>

//         {/* Result pane */}
//         <div className="pane pane-result">
//           <div className="result-header">
//             <h2>تحليل المساعد الذكي</h2>
//             {result && !isError && (
//               <button className="icon-btn" onClick={copyResult} title="نسخ الرد كاملاً" type="button">
//                 {resultCopied ? <Check size={13} /> : <Copy size={13} />}
//               </button>
//             )}
//           </div>

//           <div className="result-body">
//             {loading ? (
//               <div className="loading-state">
//                 <div className="loading-row">
//                   <Loader2 size={16} className="spin" />
//                   جاري التحليل بوساطة Gemini...
//                 </div>
//                 <div className="skeleton-line" style={{ width: '92%' }} />
//                 <div className="skeleton-line" style={{ width: '78%' }} />
//                 <div className="skeleton-line" style={{ width: '85%' }} />
//                 <div className="skeleton-line" style={{ width: '60%' }} />
//               </div>
//             ) : isError ? (
//               <div className="error-banner">
//                 <AlertTriangle size={16} />
//                 <span>{result}</span>
//               </div>
//             ) : result ? (
//               <div className="answer-text">
//                 {segments.map((seg, i) =>
//                   seg.type === 'code' ? (
//                     <CodeBlock key={i} lang={seg.lang} content={seg.content} />
//                   ) : (
//                     <span key={i}>{renderInline(seg.content, `t${i}`)}</span>
//                   )
//                 )}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <Sparkles size={28} />
//                 <p>اختر إحدى العمليات أعلاه لبدء التحليل، أو استخدم Ctrl+Enter للشرح السريع.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



























// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { analyzeCode } from './services/gemini';
import {
  Play,
  Bug,
  HelpCircle,
  Code2,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Sun,
  Moon,
  ClipboardPaste,
} from 'lucide-react';
import './App.css';

const defaultCode = `// أكتب أو ألصق كودك هنا للتجربة
function calculateSum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log(calculateSum([1, 2, 3, 4, 5]));`;

type Action = 'explain' | 'fix' | 'quiz';

// Splits the AI response into plain-text and fenced code-block segments so
// each can be rendered with its own styling (and its own copy button).
type Segment =
  | { type: 'text'; content: string }
  | { type: 'code'; lang: string; content: string };

function parseSegments(raw: string): Segment[] {
  const segments: Segment[] = [];
  const fence = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = fence.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: raw.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'code', lang: match[1] || 'text', content: match[2].trimEnd() });
    lastIndex = fence.lastIndex;
  }
  if (lastIndex < raw.length) {
    segments.push({ type: 'text', content: raw.slice(lastIndex) });
  }
  return segments;
}

// Very small inline-markdown renderer: **bold** and `inline code`.
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code className="inline" key={`${keyPrefix}-${i}`}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

function CodeBlock({ lang, content }: { lang: string; content: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };
  return (
    <div className="code-block">
      <div className="code-block-head">
        <span>{lang}</span>
        <button onClick={copy} type="button">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'تم النسخ' : 'نسخ'}
        </button>
      </div>
      <pre>{content}</pre>
    </div>
  );
}

const ACTIONS: { key: Action; label: string; icon: typeof Play; shortcut: string }[] = [
  { key: 'explain', label: 'شرح الكود', icon: Play, shortcut: 'Ctrl+Enter' },
  { key: 'fix', label: 'اكتشاف الأخطاء', icon: Bug, shortcut: 'Ctrl+B' },
  { key: 'quiz', label: 'كويز تفاعلي', icon: HelpCircle, shortcut: 'Ctrl+Q' },
];

export default function App() {
  const [code, setCode] = useState<string>(defaultCode);
  const [language, setLanguage] = useState<string>('typescript');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [resultCopied, setResultCopied] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('ai-code-tutor-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ai-code-tutor-theme', theme);
  }, [theme]);

  const handleAction = async (action: Action) => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setResult('');
    setIsError(false);
    try {
      const res = await analyzeCode(code, language, action);
      setResult(res || 'لم يتم العثور على رد.');
    } catch (err) {
      const error = err as Error;
      setIsError(true);
      setResult(`حدث خطأ: ${error.message || 'فشل الاتصال'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setResult('');
    setIsError(false);
  };

  // Monaco's built-in paste handling is unreliable on mobile browsers (the
  // virtual keyboard's paste action often does nothing). This button reads
  // the clipboard directly via the Clipboard API and inserts it through the
  // editor's own API instead, which works regardless of that bug.
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;
      const editor = editorRef.current;
      const model = editor?.getModel();
      const range = editor?.getSelection() ?? model?.getFullModelRange();
      if (editor && range) {
        editor.executeEdits('paste-button', [{ range, text, forceMoveMarkers: true }]);
        editor.focus();
      } else {
        setCode((c) => c + text);
      }
    } catch {
      alert('ما قدرنا نوصل للحافظة — اسمح للمتصفح بالوصول لها وجرّب مرة ثانية.');
    }
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setResultCopied(true);
      setTimeout(() => setResultCopied(false), 1500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  // Keyboard shortcuts for the three actions, matching the hints in the toolbar.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === 'Enter') { e.preventDefault(); handleAction('explain'); }
      else if (e.key.toLowerCase() === 'b') { e.preventDefault(); handleAction('fix'); }
      else if (e.key.toLowerCase() === 'q') { e.preventDefault(); handleAction('quiz'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language, loading]);

  const lineCount = code.split('\n').length;
  const charCount = code.length;
  const segments = result && !isError ? parseSegments(result) : [];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">
            <Code2 size={18} color="#4fd1c5" />
          </div>
          <div className="brand-text">
            <h1>AI Code Tutor</h1>
            <p>مدرّس البرمجة الذكي</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="icon-btn"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
            type="button"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </header>

      <div className="app-body">
        {/* Editor pane */}
        <div className="pane pane-editor">
          <div className="toolbar">
            <div className="action-group">
              {ACTIONS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  className="action-btn primary"
                  onClick={() => handleAction(key)}
                  disabled={loading || !code.trim()}
                  type="button"
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="icon-btn" onClick={pasteFromClipboard} title="لصق من الحافظة" type="button">
                <ClipboardPaste size={14} />
              </button>
              <button className="icon-btn" onClick={handleReset} title="إعادة تعيين الكود" type="button">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          <Editor
            height="100%"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            language={language}
            value={code}
            onChange={(val) => setCode(val || '')}
            onMount={handleEditorMount}
            options={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', minimap: { enabled: false } }}
          />

          <div className="status-bar">
            <span>{lineCount} سطر</span>
            <span>{charCount} محرف</span>
            <span>Ctrl+Enter للشرح السريع</span>
          </div>
        </div>

        {/* Result pane */}
        <div className="pane pane-result">
          <div className="result-header">
            <h2>تحليل المساعد الذكي</h2>
            {result && !isError && (
              <button className="icon-btn" onClick={copyResult} title="نسخ الرد كاملاً" type="button">
                {resultCopied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            )}
          </div>

          <div className="result-body">
            {loading ? (
              <div className="loading-state">
                <div className="loading-row">
                  <Loader2 size={16} className="spin" />
                  جاري التحليل بوساطة Gemini...
                </div>
                <div className="skeleton-line" style={{ width: '92%' }} />
                <div className="skeleton-line" style={{ width: '78%' }} />
                <div className="skeleton-line" style={{ width: '85%' }} />
                <div className="skeleton-line" style={{ width: '60%' }} />
              </div>
            ) : isError ? (
              <div className="error-banner">
                <AlertTriangle size={16} />
                <span>{result}</span>
              </div>
            ) : result ? (
              <div className="answer-text">
                {segments.map((seg, i) =>
                  seg.type === 'code' ? (
                    <CodeBlock key={i} lang={seg.lang} content={seg.content} />
                  ) : (
                    <span key={i}>{renderInline(seg.content, `t${i}`)}</span>
                  )
                )}
              </div>
            ) : (
              <div className="empty-state">
                <Sparkles size={28} />
                <p>اختر إحدى العمليات أعلاه لبدء التحليل، أو استخدم Ctrl+Enter للشرح السريع.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
