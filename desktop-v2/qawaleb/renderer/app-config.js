/* Shared constants for qawaleb/renderer/app.js. Load before app.js. */
const TEXT_PRESET_STYLES = {
  dark: { bg: 'rgba(0, 0, 0, 0.68)', color: '#ffffff', border: 'rgba(255, 255, 255, 0.14)' },
  gold: { bg: 'rgba(160, 90, 0, 0.88)', color: '#fff8e0', border: 'rgba(255, 220, 80, 0.35)' },
  blue: { bg: 'rgba(0, 45, 130, 0.9)', color: '#e8f0ff', border: 'rgba(80, 140, 255, 0.35)' },
  red: { bg: 'rgba(160, 10, 10, 0.88)', color: '#ffe8e8', border: 'rgba(255, 80, 80, 0.35)' },
  orange: { bg: 'rgba(230, 90, 0, 0.95)', color: '#ffffff', border: 'rgba(255, 180, 60, 0.55)' },
};

const FPS = 25;
const PROJECT_TYPE = 'qawaleb';
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
const TEMPLATE_PRESETS = Array.isArray(window.QAWALEB_TEMPLATE_PRESETS) && window.QAWALEB_TEMPLATE_PRESETS.length
  ? window.QAWALEB_TEMPLATE_PRESETS
  : [];
const DEFAULT_TEMPLATE_ID = TEMPLATE_PRESETS[0]?.id || 'points-broadcast';
const TEMPLATE_SLIDE_ID = 'qawaleb-template-slide';
const DEFAULT_TEMPLATE_FONT_SIZE = 65;
const DEFAULT_TEMPLATE_SCALE = 1;
const DEFAULT_PORTRAIT_SCALE = 1;
const DEFAULT_BACKGROUND_OPACITY = 10;
const DEFAULT_BACKGROUND_BLUR = 12;
const DEFAULT_BACKGROUND_RADIUS = 42;
const DEFAULT_BACKGROUND_FEATHER = 84;

const TEMPLATE_COLOR_CONTROL_DEFS = {
  'points-broadcast': [
    { key: 'background', label: 'الأحمر الرئيسي', default: '#d80b14' },
    { key: 'backgroundAlt', label: 'الأحمر الداكن', default: '#b8050d' },
    { key: 'text', label: 'لون النص', default: '#ffffff' },
    { key: 'accent', label: 'الأصفر المميز', default: '#ffd21e' },
  ],
  'breaking-bold': [
    { key: 'background', label: 'الخلفية', default: '#0a0a0a' },
    { key: 'surface', label: 'السطح الداكن', default: '#111111' },
    { key: 'accent', label: 'الأحمر الأساسي', default: '#e10600' },
    { key: 'accentAlt', label: 'الأحمر الثانوي', default: '#ff3322' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#f6f4ef' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#d8d6d1' },
  ],
  'editorial-elegant': [
    { key: 'background', label: 'الخلفية', default: '#f3eee2' },
    { key: 'surface', label: 'السطح الداخلي', default: '#ebe4d2' },
    { key: 'accent', label: 'الذهبي الأساسي', default: '#b08d57' },
    { key: 'accentDark', label: 'الذهبي الداكن', default: '#8a6a3a' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#10182b' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#7a6e58' },
  ],
  'cinematic-dark': [
    { key: 'background', label: 'الخلفية', default: '#0d0d0d' },
    { key: 'accent', label: 'الذهبي السينمائي', default: '#d9a14a' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#f5f3ee' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#a8a39a' },
    { key: 'alert', label: 'لون المؤشر الحي', default: '#e10600' },
  ],
  'sports-energy': [
    { key: 'background', label: 'الخلفية', default: '#0a0a0a' },
    { key: 'surface', label: 'سطح البطاقة', default: '#222222' },
    { key: 'accent', label: 'الأصفر الأساسي', default: '#f5d000' },
    { key: 'accentAlt', label: 'الأحمر الثانوي', default: '#e10600' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#ffffff' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#cfcfcf' },
  ],
  'documentary-minimal': [
    { key: 'background', label: 'الخلفية', default: '#f6f4ef' },
    { key: 'line', label: 'الخطوط والفواصل', default: '#d6d4cd' },
    { key: 'accent', label: 'الأخضر الأساسي', default: '#1a4d3e' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#16161a' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#7a7a7e' },
  ],
  'x-animated': [
    { key: 'background', label: 'الخلفية', default: '#000000' },
    { key: 'card', label: 'بطاقة المنشور', default: '#192734' },
    { key: 'accent', label: 'لون التوثيق', default: '#1d9bf0' },
    { key: 'border', label: 'الإطارات', default: '#38444d' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#ffffff' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#8899a6' },
  ],
  'facebook-animated': [
    { key: 'background', label: 'الخلفية', default: '#ccd0d5' },
    { key: 'card', label: 'بطاقة المنشور', default: '#ffffff' },
    { key: 'accent', label: 'الأزرق الأساسي', default: '#1877f2' },
    { key: 'border', label: 'الفواصل', default: '#ced0d4' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#050505' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#65676b' },
  ],
  'telegram-animated': [
    { key: 'background', label: 'الخلفية', default: '#070b10' },
    { key: 'header', label: 'شريط القناة', default: '#17212b' },
    { key: 'card', label: 'بطاقة الرسالة', default: '#182533' },
    { key: 'accent', label: 'الأزرق الأساسي', default: '#5288c1' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#ffffff' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#7f91a4' },
  ],
  'instagram-animated': [
    { key: 'background', label: 'الخلفية', default: '#fafafa' },
    { key: 'card', label: 'بطاقة المنشور', default: '#ffffff' },
    { key: 'accent', label: 'اللون الوردي', default: '#e1306c' },
    { key: 'border', label: 'الإطارات', default: '#dbdbdb' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#262626' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#8e8e8e' },
  ],
  'top-trends': [
    { key: 'background', label: 'الخلفية', default: '#0a0a2e' },
    { key: 'panel', label: 'بطاقات التريند', default: '#1a2a6a' },
    { key: 'accent', label: 'السماوي الأساسي', default: '#4fc3ff' },
    { key: 'accentAlt', label: 'الأزرق الثانوي', default: '#1a73e8' },
    { key: 'text', label: 'لون النص الرئيسي', default: '#ffffff' },
    { key: 'muted', label: 'لون النص الثانوي', default: '#8899bb' },
  ],
};

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
