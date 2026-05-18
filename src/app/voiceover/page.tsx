'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Mic, Play, Download, Loader2, Square, Check,
  Key, Volume2, Info,
} from 'lucide-react';

// ─── Voice catalogue ────────────────────────────────────────────────────────
const GEMINI_VOICES = [
  { name: 'Zephyr',          tone: 'Bright',          toneAr: 'مشرق',        gender: 'f' },
  { name: 'Puck',            tone: 'Upbeat',          toneAr: 'متحمس',       gender: 'm' },
  { name: 'Charon',          tone: 'Informational',   toneAr: 'إخباري',      gender: 'm' },
  { name: 'Kore',            tone: 'Firm',            toneAr: 'حازم',        gender: 'f' },
  { name: 'Fenrir',          tone: 'Excitable',       toneAr: 'متهيج',       gender: 'm' },
  { name: 'Leda',            tone: 'Youthful',        toneAr: 'شبابي',       gender: 'f' },
  { name: 'Orus',            tone: 'Firm',            toneAr: 'حازم',        gender: 'm' },
  { name: 'Aoede',           tone: 'Breezy',          toneAr: 'منعش',        gender: 'f' },
  { name: 'Callirrhoe',      tone: 'Easy-going',      toneAr: 'هادئ',        gender: 'f' },
  { name: 'Autonoe',         tone: 'Bright',          toneAr: 'مشرق',        gender: 'f' },
  { name: 'Enceladus',       tone: 'Breathy',         toneAr: 'ناعم',        gender: 'm' },
  { name: 'Iapetus',         tone: 'Clear',           toneAr: 'واضح',        gender: 'm' },
  { name: 'Umbriel',         tone: 'Easy-going',      toneAr: 'هادئ',        gender: 'm' },
  { name: 'Algieba',         tone: 'Smooth',          toneAr: 'سلس',         gender: 'm' },
  { name: 'Despina',         tone: 'Smooth',          toneAr: 'سلس',         gender: 'f' },
  { name: 'Erinome',         tone: 'Clear',           toneAr: 'واضح',        gender: 'f' },
  { name: 'Algenib',         tone: 'Gravelly',        toneAr: 'خشن',         gender: 'm' },
  { name: 'Rasalhaghue',     tone: 'Informational',   toneAr: 'إخباري',      gender: 'm' },
  { name: 'Laomedeia',       tone: 'Upbeat',          toneAr: 'متحمس',       gender: 'f' },
  { name: 'Achernar',        tone: 'Soft',            toneAr: 'ناعم جداً',   gender: 'f' },
  { name: 'Alnilam',         tone: 'Firm',            toneAr: 'حازم',        gender: 'm' },
  { name: 'Schedar',         tone: 'Even',            toneAr: 'متوازن',      gender: 'm' },
  { name: 'Gacrux',          tone: 'Mature',          toneAr: 'ناضج',        gender: 'f' },
  { name: 'Pulcherrima',     tone: 'Forward',         toneAr: 'مباشر',       gender: 'f' },
  { name: 'Achird',          tone: 'Friendly',        toneAr: 'ودود',        gender: 'm' },
  { name: 'Zubenelgenubi',   tone: 'Casual',          toneAr: 'عفوي',        gender: 'm' },
  { name: 'Vindemiatrix',    tone: 'Gentle',          toneAr: 'لطيف',        gender: 'f' },
  { name: 'Sadachbia',       tone: 'Lively',          toneAr: 'حيوي',        gender: 'f' },
  { name: 'Sadaltager',      tone: 'Knowledgeable',   toneAr: 'واثق',        gender: 'm' },
  { name: 'Sulafat',         tone: 'Warm',            toneAr: 'دافئ',        gender: 'f' },
];

const TTS_MODELS = [
  {
    value: 'gemini-2.5-flash-preview-tts',
    label: 'Gemini 2.5 Flash TTS',
    descAr: 'سريع وعالي الجودة — موصى به',
  },
  {
    value: 'gemini-2.5-pro-preview-tts',
    label: 'Gemini 2.5 Pro TTS',
    descAr: 'أعلى جودة وأكثر تعبيراً',
  },
];

// Short Arabic sample used for voice previews
const PREVIEW_TEXT = 'مرحباً، هذا مقطع صوتي تجريبي لاختبار جودة الصوت وأسلوب القراءة.';

// Tone-to-colour mapping for voice badges
const TONE_COLOR: Record<string, string> = {
  Bright: '#f59e0b', Upbeat: '#10b981', Informational: '#3b82f6',
  Firm: '#6366f1', Excitable: '#ef4444', Youthful: '#ec4899',
  Breezy: '#06b6d4', 'Easy-going': '#84cc16', Breathy: '#a78bfa',
  Clear: '#22d3ee', Gravelly: '#78716c', Smooth: '#14b8a6',
  Soft: '#f472b6', Even: '#94a3b8', Mature: '#d97706',
  Forward: '#f97316', Friendly: '#4ade80', Casual: '#facc15',
  Gentle: '#c084fc', Lively: '#fb7185', Knowledgeable: '#60a5fa',
  Warm: '#fb923c',
};

// ─── Types ───────────────────────────────────────────────────────────────────
type GenerateResult = {
  url: string;
  fileName: string;
  voiceName: string;
  model: string;
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function VoiceOverPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Charon');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash-preview-tts');
  const [instructions, setInstructions] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);

  // Per-voice preview state
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const callTTS = useCallback(async (payload: object): Promise<GenerateResult> => {
    const res = await fetch('/api/voiceover/google-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.details || data.error || 'فشل التوليد');
    }
    return data as GenerateResult;
  }, []);

  // ── Generate main audio ──────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!text.trim()) { setError('أدخل النص أولاً'); return; }
    setError(null);
    setIsGenerating(true);
    setResult(null);
    try {
      const data = await callTTS({
        text: text.trim(),
        voiceName: selectedVoice,
        ttsModel: selectedModel,
        instructions: instructions.trim() || undefined,
        apiKey: apiKey.trim() || undefined,
      });
      setResult(data);
      // Auto-play after generation
      setTimeout(() => { mainAudioRef.current?.play().catch(() => {}); }, 300);
    } catch (e: any) {
      setError(e.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Preview a voice ──────────────────────────────────────────────────────
  const handlePreviewVoice = async (voiceName: string) => {
    if (previewingVoice === voiceName) return;

    // Stop any playing preview
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
    }

    // Use cached URL if available
    if (previewUrls[voiceName]) {
      setPlayingVoice(voiceName);
      previewAudioRef.current!.src = previewUrls[voiceName];
      previewAudioRef.current!.play().catch(() => {});
      return;
    }

    setPreviewingVoice(voiceName);
    try {
      const data = await callTTS({
        text: PREVIEW_TEXT,
        voiceName,
        ttsModel: selectedModel,
        apiKey: apiKey.trim() || undefined,
      });
      setPreviewUrls(prev => ({ ...prev, [voiceName]: data.url }));
      setPlayingVoice(voiceName);
      previewAudioRef.current!.src = data.url;
      previewAudioRef.current!.play().catch(() => {});
    } catch {
      // silent — don't block the UI on preview errors
    } finally {
      setPreviewingVoice(null);
    }
  };

  const stopPreview = () => {
    previewAudioRef.current?.pause();
    if (previewAudioRef.current) previewAudioRef.current.currentTime = 0;
    setPlayingVoice(null);
  };

  // ── Download ─────────────────────────────────────────────────────────────
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.fileName || 'voiceover.wav';
    a.click();
  };

  const selectedVoiceData = GEMINI_VOICES.find(v => v.name === selectedVoice);

  return (
    <>
      {/* Hidden preview audio element */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setPlayingVoice(null)}
        style={{ display: 'none' }}
      />

      <style>{`
        /* ─── Reset global layout overrides ─── */
        .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
        .header, footer { display: none !important; }
        body { background-color: #0f1115; color: #e2e8f0; direction: rtl; }

        /* ─── Root ─── */
        .vo-root {
          font-family: 'AvenirArabic', 'Segoe UI', Tahoma, Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0f1115;
          color: #e2e8f0;
          direction: rtl;
        }

        /* ─── Top bar ─── */
        .vo-topbar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 2rem;
          background: #141720;
          border-bottom: 1px solid #1e2535;
          flex-wrap: wrap;
        }
        .vo-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #e2e8f0;
          text-decoration: none;
          margin-left: auto;
        }
        .vo-brand-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vo-nav-back {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
          margin-right: auto;
        }
        .vo-nav-back:hover { background: #1e2535; color: #e2e8f0; }

        /* Model selector */
        .vo-model-select {
          background: #1a1d24;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #e2e8f0;
          font-family: inherit;
          font-size: 0.875rem;
          padding: 0.45rem 0.85rem;
          cursor: pointer;
          outline: none;
          direction: rtl;
        }
        .vo-model-select:focus { border-color: #3b82f6; }

        /* API key input */
        .vo-apikey-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #1a1d24;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 0 0.75rem;
        }
        .vo-apikey-wrap svg { color: #94a3b8; flex-shrink: 0; }
        .vo-apikey-input {
          background: transparent;
          border: none;
          outline: none;
          color: #e2e8f0;
          font-family: monospace;
          font-size: 0.8rem;
          width: 200px;
          padding: 0.45rem 0;
          direction: ltr;
        }
        .vo-apikey-input::placeholder { color: #475569; }

        /* ─── Main layout ─── */
        .vo-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 0;
          min-height: 0;
        }
        @media (max-width: 900px) {
          .vo-main { grid-template-columns: 1fr; }
        }

        /* ─── Left pane ─── */
        .vo-left {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow-y: auto;
        }

        /* ─── Right pane (voice grid) ─── */
        .vo-right {
          background: #111318;
          border-right: 1px solid #1e2535;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .vo-right-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        /* ─── Section labels ─── */
        .vo-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* ─── Text area ─── */
        .vo-textarea {
          width: 100%;
          min-height: 160px;
          background: #1a1d24;
          border: 1px solid #334155;
          border-radius: 12px;
          color: #e2e8f0;
          font-family: 'AvenirArabic', 'Segoe UI', Tahoma, Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          padding: 1rem 1.1rem;
          resize: vertical;
          outline: none;
          direction: rtl;
          transition: border-color 0.15s;
        }
        .vo-textarea:focus { border-color: #3b82f6; }
        .vo-textarea::placeholder { color: #475569; }
        .vo-char-count {
          font-size: 0.78rem;
          color: #64748b;
          text-align: left;
          margin-top: 0.25rem;
        }

        /* ─── Instructions ─── */
        .vo-instructions {
          width: 100%;
          min-height: 72px;
          background: #1a1d24;
          border: 1px solid #334155;
          border-radius: 10px;
          color: #e2e8f0;
          font-family: 'AvenirArabic', 'Segoe UI', Tahoma, Arial, sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
          padding: 0.75rem 1rem;
          resize: vertical;
          outline: none;
          direction: rtl;
          transition: border-color 0.15s;
        }
        .vo-instructions:focus { border-color: #3b82f6; }
        .vo-instructions::placeholder { color: #475569; }

        /* ─── Active voice badge ─── */
        .vo-active-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #1a1d24;
          border: 1px solid #334155;
          border-radius: 10px;
          padding: 0.65rem 1rem;
        }
        .vo-active-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .vo-active-name { font-weight: 700; font-size: 1rem; }
        .vo-active-tone { font-size: 0.8rem; color: #94a3b8; }

        /* ─── Generate button ─── */
        .vo-generate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.9rem 2rem;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          width: 100%;
        }
        .vo-generate-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .vo-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* ─── Error ─── */
        .vo-error {
          background: #1f1215;
          border: 1px solid #ef4444;
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.9rem;
          padding: 0.75rem 1rem;
          direction: rtl;
        }

        /* ─── Audio player card ─── */
        .vo-player-card {
          background: #141720;
          border: 1px solid #1e2a3d;
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .vo-player-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .vo-player-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #22d3ee;
        }
        .vo-player-meta {
          font-size: 0.78rem;
          color: #64748b;
        }
        audio {
          width: 100%;
          height: 42px;
          border-radius: 8px;
          accent-color: #3b82f6;
          background: #0f1115;
        }
        .vo-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #1e3a5f;
          color: #93c5fd;
          border: 1px solid #1e4a7f;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.6rem 1.25rem;
          cursor: pointer;
          transition: background 0.15s;
          width: 100%;
        }
        .vo-download-btn:hover { background: #1e4a7f; }

        /* ─── Voice grid ─── */
        .vo-voice-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        .vo-voice-card {
          background: #1a1d24;
          border: 2px solid transparent;
          border-radius: 10px;
          padding: 0.65rem 0.75rem;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          position: relative;
        }
        .vo-voice-card:hover { background: #1e2535; }
        .vo-voice-card.selected { background: #0d1f3c; }
        .vo-voice-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .vo-voice-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #e2e8f0;
          direction: ltr;
          text-align: left;
        }
        .vo-voice-check {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .vo-voice-tone-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          color: #fff;
          width: fit-content;
        }
        .vo-voice-tone-ar {
          font-size: 0.75rem;
          color: #64748b;
        }
        .vo-voice-preview-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: transparent;
          border: 1px solid #334155;
          border-radius: 6px;
          color: #94a3b8;
          font-family: inherit;
          font-size: 0.72rem;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          margin-top: 0.25rem;
          transition: border-color 0.15s, color 0.15s;
          width: 100%;
          justify-content: center;
        }
        .vo-voice-preview-btn:hover { border-color: #3b82f6; color: #60a5fa; }
        .vo-voice-preview-btn.playing { border-color: #10b981; color: #34d399; }
        .vo-voice-preview-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="vo-root">
        {/* ── Top bar ── */}
        <div className="vo-topbar">
          <div className="vo-brand">
            <div className="vo-brand-icon">
              <Mic size={18} color="#fff" />
            </div>
            فويس أوفر
          </div>

          {/* Model selection */}
          <select
            className="vo-model-select"
            value={selectedModel}
            onChange={e => {
              setSelectedModel(e.target.value);
              setPreviewUrls({}); // clear preview cache when model changes
            }}
          >
            {TTS_MODELS.map(m => (
              <option key={m.value} value={m.value}>
                {m.label} — {m.descAr}
              </option>
            ))}
          </select>

          {/* API key */}
          <div className="vo-apikey-wrap">
            <Key size={14} />
            <input
              type="password"
              className="vo-apikey-input"
              placeholder="Gemini API Key (اختياري)"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              autoComplete="off"
            />
          </div>

          <a href="/" className="vo-nav-back">
            ← الرئيسية
          </a>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="vo-main">
          {/* ── Left: controls ── */}
          <div className="vo-left">

            {/* Text input */}
            <div>
              <div className="vo-label">
                <Volume2 size={14} />
                النص المراد تحويله إلى صوت
              </div>
              <textarea
                className="vo-textarea"
                placeholder="اكتب النص هنا... يدعم العربية والإنجليزية والأرقام."
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={1500}
              />
              <div className="vo-char-count">{text.length} / 1500 حرف</div>
            </div>

            {/* Selected voice badge */}
            <div>
              <div className="vo-label">الصوت المختار</div>
              <div className="vo-active-badge">
                <div
                  className="vo-active-dot"
                  style={{ background: TONE_COLOR[selectedVoiceData?.tone ?? ''] ?? '#3b82f6' }}
                />
                <div>
                  <div className="vo-active-name">{selectedVoice}</div>
                  <div className="vo-active-tone">
                    {selectedVoiceData?.toneAr} · {selectedVoiceData?.tone}
                    {' · '}
                    {selectedVoiceData?.gender === 'f' ? 'أنثى' : 'ذكر'}
                  </div>
                </div>
              </div>
            </div>

            {/* Style instructions */}
            <div>
              <div className="vo-label">
                <Info size={14} />
                تعليمات الأسلوب (اختياري)
              </div>
              <textarea
                className="vo-instructions"
                placeholder={`مثال: تحدث ببطء ووضوح بأسلوب إخباري رسمي\nSpeak slowly with a calm and professional tone`}
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={3}
              />
            </div>

            {/* Error */}
            {error && <div className="vo-error">⚠️ {error}</div>}

            {/* Generate button */}
            <button
              className="vo-generate-btn"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
            >
              {isGenerating ? (
                <><Loader2 size={20} className="spin" /> جارِ التوليد...</>
              ) : (
                <><Mic size={20} /> توليد الصوت</>
              )}
            </button>

            {/* Audio player */}
            {result && (
              <div className="vo-player-card">
                <div className="vo-player-header">
                  <div className="vo-player-title">
                    <Volume2 size={16} />
                    معاينة الصوت
                  </div>
                  <div className="vo-player-meta">
                    {result.voiceName} · {result.model?.replace('gemini-', '').replace('-preview-tts', '')}
                  </div>
                </div>
                <audio ref={mainAudioRef} src={result.url} controls />
                <button className="vo-download-btn" onClick={handleDownload}>
                  <Download size={16} />
                  حفظ الملف الصوتي على الجهاز (.wav)
                </button>
              </div>
            )}
          </div>

          {/* ── Right: voice grid ── */}
          <div className="vo-right">
            <div className="vo-right-title">اختر الصوت ({GEMINI_VOICES.length})</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '-0.5rem' }}>
              اضغط على البطاقة للاختيار · أو استمع للمعاينة
            </div>

            <div className="vo-voice-grid">
              {GEMINI_VOICES.map(voice => {
                const isSelected = selectedVoice === voice.name;
                const isPreviewing = previewingVoice === voice.name;
                const isPlaying = playingVoice === voice.name;
                const toneColor = TONE_COLOR[voice.tone] ?? '#3b82f6';

                return (
                  <div
                    key={voice.name}
                    className={`vo-voice-card${isSelected ? ' selected' : ''}`}
                    style={{ borderColor: isSelected ? toneColor : 'transparent' }}
                    onClick={() => setSelectedVoice(voice.name)}
                  >
                    <div className="vo-voice-card-top">
                      <span className="vo-voice-name">{voice.name}</span>
                      {isSelected && (
                        <div className="vo-voice-check">
                          <Check size={10} color="#fff" />
                        </div>
                      )}
                    </div>

                    <div
                      className="vo-voice-tone-badge"
                      style={{ background: toneColor + '33', color: toneColor, border: `1px solid ${toneColor}55` }}
                    >
                      {voice.tone}
                    </div>

                    <div className="vo-voice-tone-ar">{voice.toneAr} · {voice.gender === 'f' ? 'أنثى' : 'ذكر'}</div>

                    <button
                      className={`vo-voice-preview-btn${isPlaying ? ' playing' : ''}`}
                      onClick={e => {
                        e.stopPropagation();
                        if (isPlaying) {
                          stopPreview();
                        } else {
                          handlePreviewVoice(voice.name);
                        }
                      }}
                      disabled={isPreviewing && !isPlaying}
                      title={isPlaying ? 'إيقاف المعاينة' : 'معاينة الصوت'}
                    >
                      {isPreviewing && !isPlaying ? (
                        <><Loader2 size={11} className="spin" /> جارِ التحميل</>
                      ) : isPlaying ? (
                        <><Square size={11} /> إيقاف</>
                      ) : (
                        <><Play size={11} /> معاينة</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </>
  );
}
