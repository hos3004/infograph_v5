/* Shared constants for desktop-v2/renderer/app.js. Load before app.js. */
const TEXT_PRESET_STYLES = {
  dark: { bg: 'rgba(0, 0, 0, 0.68)', color: '#ffffff', border: 'rgba(255, 255, 255, 0.14)' },
  gold: { bg: 'rgba(160, 90, 0, 0.88)', color: '#fff8e0', border: 'rgba(255, 220, 80, 0.35)' },
  blue: { bg: 'rgba(0, 45, 130, 0.9)', color: '#e8f0ff', border: 'rgba(80, 140, 255, 0.35)' },
  red: { bg: 'rgba(160, 10, 10, 0.88)', color: '#ffe8e8', border: 'rgba(255, 80, 80, 0.35)' },
  orange: { bg: 'rgba(230, 90, 0, 0.95)', color: '#ffffff', border: 'rgba(255, 180, 60, 0.55)' },
};

const FPS = 25;
const PROJECT_TYPE = 'infograph';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const TRANSITION_OPTIONS = ['fade', 'light-leak', 'blur-wipe'];
const TEXT_ANIMATION_OPTIONS = [
  { value: 'live-reveal-dot', label: 'كشف سينمائي حي + نقطة' },
  { value: 'broadcast-split', label: 'أسطر إخبارية متتابعة' },
  { value: 'news-ledger', label: 'تقرير بصري / News Ledger' },
  { value: 'number-hero', label: 'عداد إحصائي متحرك' },
  { value: 'layered-title', label: 'نظام عنوان طبقي' },
  { value: 'morph-compare', label: 'مقارنة متغيرة' },
  { value: 'impact-shock', label: 'صدمة خفيفة' },
  { value: 'word-by-word', label: 'كلمة كلمة' },
  { value: 'timeline-marker', label: 'مؤشر زمني' },
  { value: 'cinematic-reveal', label: 'كشف سينمائي بسيط' },
  { value: 'split-lines-stagger', label: 'أسطر متعاكسة' },
  { value: 'highlight-sweep', label: 'لمعة عابرة' },
  { value: 'kinetic-keyword', label: 'كلمة بطلة' },
  { value: 'motion-blur', label: 'حركة ضبابية قديمة' },
  { value: 'typewriter', label: 'كتابة Typewriter قديمة' },
];

const DEFAULT_SYSTEM_PROMPT = `أنت محرر إخباري متخصص في إنتاج الإنفوجراف التلفزيوني باللغة العربية.
مهمتك: تحويل أي موضوع إلى شرائح إنفوجراف احترافية جاهزة للعرض.
القواعد:
- أنتج JSON فقط بدون أي نص خارجه
- كل شريحة تحتوي حقيقة واحدة واضحة وقوية
- استخدم صيغة: كيكر ++ عنوان ++ جسم ++ خلاصة (مفصولة بـ ++)
- الكيكر: 2-3 كلمات (فئة أو موضوع)
- العنوان: 5-8 كلمات (الفكرة الرئيسية)
- الجسم: 8-15 كلمة (التفاصيل والبيانات)
- الخلاصة: 5-8 كلمات (الاستنتاج أو الدعوة للتفكير)
- تجنب التكرار بين الشرائح`;

const DEFAULT_TTS_STYLE_PROMPT = 'Premium commercial. Dynamic pacing—starts intrigued, ends punchy. Tone is polished, persuasive, and inviting.';

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  ttsModel: 'gemini-2.5-flash-preview-tts',
  ttsVoice: 'Charon',
  ttsStylePrompt: DEFAULT_TTS_STYLE_PROMPT,
  contentModel: 'gemini-2.5-flash',
  contentSystemPrompt: DEFAULT_SYSTEM_PROMPT,
};
