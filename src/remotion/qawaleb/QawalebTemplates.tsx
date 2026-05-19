import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { QawalebProps, QawalebTemplateId } from './types';

const FONT_ARABIC = 'QawalebArabic';
const FONT_DISPLAY = 'QawalebDisplay';
const FONT_SERIF = 'Georgia, "Times New Roman", serif';
const FONT_MONO = '"Roboto Mono", "Courier New", monospace';
const FONT_RTL_PRIMARY = `${FONT_DISPLAY}, ${FONT_ARABIC}, "Segoe UI", Tahoma, Arial, sans-serif`;
const LOCAL_SOCIAL_AVATAR = staticFile('assets/logo.png');
const DEFAULT_FONT_SCALE = 1;

type TemplateAppearance = {
  fontScale: number;
  colors: Record<string, string>;
  backgroundImageUrl?: string | null;
  backgroundOpacity?: number;
  backgroundBlur?: number;
  backgroundRadius?: number;
  backgroundFeather?: number;
  parallaxEnabled?: boolean;
  portraitScale: number;
  portraitX: number;
  portraitY: number;
  portraitMonochrome: boolean;
  portraitSquare: boolean;
  showQuoteMark: boolean;
};

const DEFAULT_TEMPLATE_APPEARANCE: TemplateAppearance = {
  fontScale: DEFAULT_FONT_SCALE,
  colors: {},
  backgroundImageUrl: null,
  backgroundOpacity: 10,
  backgroundBlur: 12,
  backgroundRadius: 42,
  backgroundFeather: 84,
  parallaxEnabled: true,
  portraitScale: 1,
  portraitX: 0,
  portraitY: 0,
  portraitMonochrome: true,
  portraitSquare: false,
  showQuoteMark: true,
};

const TEMPLATE_COLOR_DEFAULTS: Record<QawalebTemplateId, Record<string, string>> = {
  'points-broadcast': {
    background: '#d80b14',
    backgroundAlt: '#b8050d',
    text: '#ffffff',
    accent: '#ffd21e',
  },
  'breaking-bold': {
    background: '#0a0a0a',
    surface: '#111111',
    accent: '#e10600',
    accentAlt: '#ff3322',
    text: '#f6f4ef',
    muted: '#d8d6d1',
  },
  'editorial-elegant': {
    background: '#f3eee2',
    surface: '#ebe4d2',
    accent: '#b08d57',
    accentDark: '#8a6a3a',
    text: '#10182b',
    muted: '#7a6e58',
  },
  'cinematic-dark': {
    background: '#0d0d0d',
    accent: '#d9a14a',
    text: '#f5f3ee',
    muted: '#a8a39a',
    alert: '#e10600',
  },
  'sports-energy': {
    background: '#0a0a0a',
    surface: '#222222',
    accent: '#f5d000',
    accentAlt: '#e10600',
    text: '#ffffff',
    muted: '#cfcfcf',
  },
  'documentary-minimal': {
    background: '#f6f4ef',
    line: '#d6d4cd',
    accent: '#1a4d3e',
    text: '#16161a',
    muted: '#7a7a7e',
  },
  'x-animated': {
    background: '#000000',
    card: '#192734',
    accent: '#1d9bf0',
    border: '#38444d',
    text: '#ffffff',
    muted: '#8899a6',
  },
  'facebook-animated': {
    background: '#ccd0d5',
    card: '#ffffff',
    accent: '#1877f2',
    border: '#ced0d4',
    text: '#050505',
    muted: '#65676b',
  },
  'telegram-animated': {
    background: '#070b10',
    header: '#17212b',
    card: '#182533',
    accent: '#5288c1',
    text: '#ffffff',
    muted: '#7f91a4',
  },
  'instagram-animated': {
    background: '#fafafa',
    card: '#ffffff',
    accent: '#e1306c',
    border: '#dbdbdb',
    text: '#262626',
    muted: '#8e8e8e',
  },
  'top-trends': {
    background: '#0a0a2e',
    panel: '#1a2a6a',
    accent: '#4fc3ff',
    accentAlt: '#1a73e8',
    text: '#ffffff',
    muted: '#8899bb',
  },
};

if (typeof document !== 'undefined' && !document.head.querySelector('[data-qawaleb-fonts="1"]')) {
  const avenirUrl = staticFile('assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const displayUrl = staticFile('assets/fonts/rb.ttf');
  const style = document.createElement('style');
  style.setAttribute('data-qawaleb-fonts', '1');
  style.textContent = `
    @font-face {
      font-family: '${FONT_ARABIC}';
      src: url('${avenirUrl}') format('opentype');
      font-display: block;
    }
    @font-face {
      font-family: '${FONT_DISPLAY}';
      src: url('${displayUrl}') format('truetype');
      font-display: block;
    }
  `;
  document.head.appendChild(style);
}

const smoothEase = Easing.bezier(0.2, 0.8, 0.2, 1);
const slashEase = Easing.bezier(0.7, 0.05, 0.2, 1);
const overshootEase = Easing.bezier(0.34, 1.56, 0.64, 1);

const resolveAppearance = (appearance?: Partial<TemplateAppearance>): TemplateAppearance => ({
  fontScale: Math.max(0.55, Number(appearance?.fontScale || DEFAULT_FONT_SCALE)),
  colors: appearance?.colors || {},
  backgroundImageUrl: typeof appearance?.backgroundImageUrl === 'string' ? appearance.backgroundImageUrl : DEFAULT_TEMPLATE_APPEARANCE.backgroundImageUrl,
  backgroundOpacity: Math.max(0, Math.min(100, Number(appearance?.backgroundOpacity ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundOpacity))),
  backgroundBlur: Math.max(0, Math.min(40, Number(appearance?.backgroundBlur ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundBlur))),
  backgroundRadius: Math.max(0, Math.min(240, Number(appearance?.backgroundRadius ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundRadius))),
  backgroundFeather: Math.max(0, Math.min(180, Number(appearance?.backgroundFeather ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundFeather))),
  parallaxEnabled: appearance?.parallaxEnabled !== false,
  portraitScale: Math.max(0.6, Number(appearance?.portraitScale || DEFAULT_TEMPLATE_APPEARANCE.portraitScale)),
  portraitX: Number(appearance?.portraitX || DEFAULT_TEMPLATE_APPEARANCE.portraitX),
  portraitY: Number(appearance?.portraitY || DEFAULT_TEMPLATE_APPEARANCE.portraitY),
  portraitMonochrome: appearance?.portraitMonochrome !== false,
  portraitSquare: appearance?.portraitSquare === true,
  showQuoteMark: appearance?.showQuoteMark !== false,
});

const scaleFont = (appearance: TemplateAppearance, value: number) =>
  Math.round(value * appearance.fontScale * 100) / 100;

const getTemplatePalette = (templateId: QawalebTemplateId, appearance: TemplateAppearance) => ({
  ...TEMPLATE_COLOR_DEFAULTS[templateId],
  ...(appearance.colors || {}),
});

const stageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  direction: 'rtl',
  textAlign: 'right',
  overflow: 'hidden',
  fontFamily: FONT_RTL_PRIMARY,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const absFill = (style?: React.CSSProperties): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  ...style,
});

const rtlTextStyle = (style?: React.CSSProperties): React.CSSProperties => ({
  direction: 'rtl',
  textAlign: 'right',
  unicodeBidi: 'plaintext',
  fontFamily: FONT_RTL_PRIMARY,
  ...style,
});

const rtlParagraphStyle = (style?: React.CSSProperties): React.CSSProperties =>
  rtlTextStyle({
    lineHeight: 1.6,
    ...style,
  });

const p = (frame: number, start: number, duration: number, easing = smoothEase) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

const shift = (frame: number, start: number, duration: number, from: number, to = 0, easing = smoothEase) =>
  interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

const fade = (frame: number, start: number, duration: number, easing = smoothEase) =>
  p(frame, start, duration, easing);

const splitWords = (text: string) => text.trim().split(/\s+/).filter(Boolean);

const splitIntoChunks = (text: string, parts: number) => {
  const words = splitWords(text);
  if (words.length === 0) {
    return [''];
  }
  const chunk = Math.ceil(words.length / Math.max(parts, 1));
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += chunk) {
    lines.push(words.slice(i, i + chunk).join(' '));
  }
  return lines;
};

const splitIntoApproxLines = (text: string, maxWordsPerLine: number) => {
  const words = splitWords(text);
  const lines: string[] = [];
  let current: string[] = [];
  words.forEach((word) => {
    current.push(word);
    if (current.length >= maxWordsPerLine) {
      lines.push(current.join(' '));
      current = [];
    }
  });
  if (current.length) {
    lines.push(current.join(' '));
  }
  return lines.length ? lines : [''];
};

type PointGroupItem = {
  text: string;
  lineCount: number;
};

type PointGroup = {
  items: PointGroupItem[];
  lineCount: number;
};

let textMeasureCanvas: HTMLCanvasElement | null = null;

const getTextMeasureContext = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  if (!textMeasureCanvas) {
    textMeasureCanvas = document.createElement('canvas');
  }

  return textMeasureCanvas.getContext('2d');
};

const measureWrappedLineCount = (
  text: string,
  maxWidth: number,
  fontSize: number,
  fontWeight: number,
  fontFamily: string,
) => {
  const words = splitWords(text);
  if (words.length === 0) {
    return 1;
  }

  const ctx = getTextMeasureContext();
  if (!ctx) {
    const approxCharsPerLine = Math.max(8, Math.floor(maxWidth / Math.max(fontSize * 0.62, 1)));
    return Math.max(1, Math.ceil(text.length / approxCharsPerLine));
  }

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const spaceWidth = ctx.measureText(' ').width;
  let lines = 1;
  let currentWidth = 0;

  words.forEach((word, wordIndex) => {
    const wordWidth = ctx.measureText(word).width;
    const nextWidth = wordIndex === 0 || currentWidth === 0
      ? wordWidth
      : currentWidth + spaceWidth + wordWidth;

    if (currentWidth > 0 && nextWidth > maxWidth) {
      lines += 1;
      currentWidth = wordWidth;
    } else {
      currentWidth = nextWidth;
    }
  });

  return lines;
};

const normalizePointItems = (rawText: string) =>
  String(rawText || '')
    .split(/\+\+|\n/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 60);

const resolvePointGroups = (
  points: string[],
  maxWidth: number,
  baseFontSize: number,
  fontFamily: string,
  maxLinesPerGroup = 4,
) => {
  const minFontSize = Math.max(34, Math.floor(baseFontSize * 0.68));
  let pointFontSize = baseFontSize;
  let measuredPoints: PointGroupItem[] = [];

  while (pointFontSize >= minFontSize) {
    measuredPoints = points.map((text) => ({
      text,
      lineCount: measureWrappedLineCount(text, maxWidth, pointFontSize, 900, fontFamily),
    }));

    if (measuredPoints.every((item) => item.lineCount <= maxLinesPerGroup)) {
      break;
    }

    pointFontSize -= 2;
  }

  if (!measuredPoints.length) {
    measuredPoints = [{
      text: '',
      lineCount: 1,
    }];
  }

  const groups: PointGroup[] = [];
  let currentItems: PointGroupItem[] = [];
  let currentLineCount = 0;

  measuredPoints.forEach((item) => {
    if (currentItems.length > 0 && currentLineCount + item.lineCount > maxLinesPerGroup) {
      groups.push({
        items: currentItems,
        lineCount: currentLineCount,
      });
      currentItems = [item];
      currentLineCount = item.lineCount;
      return;
    }

    currentItems.push(item);
    currentLineCount += item.lineCount;
  });

  if (currentItems.length > 0) {
    groups.push({
      items: currentItems,
      lineCount: currentLineCount,
    });
  }

  return {
    fontSize: Math.max(pointFontSize, minFontSize),
    groups: groups.length > 0 ? groups : [{ items: measuredPoints.slice(0, 1), lineCount: measuredPoints[0]?.lineCount || 1 }],
  };
};

const getHighlightWordIndex = (text: string) => {
  const words = splitWords(text);
  if (words.length < 4) {
    return -1;
  }

  return Math.min(words.length - 2, Math.max(1, Math.floor(words.length * 0.55)));
};

const renderHighlightedPoint = (text: string, highlightColor: string) => {
  const words = splitWords(text);
  if (words.length === 0) {
    return text;
  }

  const highlightIndex = getHighlightWordIndex(text);
  return words.map((word, index) => (
    <React.Fragment key={`${word}-${index}`}>
      {index > 0 ? ' ' : null}
      {index === highlightIndex ? (
        <span
          style={{
            background: `linear-gradient(transparent 58%, ${highlightColor}66 58%)`,
            padding: '0 0.08em',
          }}
        >
          {word}
        </span>
      ) : (
        word
      )}
    </React.Fragment>
  ));
};

const getValue = (values: Record<string, string>, key: string, fallback = '') =>
  typeof values[key] === 'string' && values[key].length > 0 ? values[key] : fallback;

const imageStyle = (zoom = 1, offsetX = 0, offsetY = 0): React.CSSProperties => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`,
});

const SafeImg: React.FC<{
  src: string;
  style?: React.CSSProperties;
}> = ({ src, style }) => {
  if (!src) {
    return <div style={{ ...style, background: '#2b2b30' }} />;
  }
  return <Img src={src} style={style} />;
};

const DEFAULT_TEMPLATE_BACKGROUND = staticFile('assets/qawaleb/backgrounds/rm380-05.jpg');

const buildRoundedMask = ({
  width,
  height,
  radius,
  feather,
}: {
  width: number;
  height: number;
  radius: number;
  feather: number;
}) => {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const safeRadius = clamp(radius, 0, Math.min(safeWidth, safeHeight) / 2);
  const safeFeather = clamp(feather, 0, Math.min(safeWidth, safeHeight) / 2);
  const bleed = Math.max(24, safeFeather);
  const canvasWidth = safeWidth + bleed * 2;
  const canvasHeight = safeHeight + bleed * 2;
  const innerInset = safeFeather > 0 ? Math.min(safeFeather, safeWidth / 2, safeHeight / 2) : 0;
  const innerWidth = Math.max(0, safeWidth - innerInset * 2);
  const innerHeight = Math.max(0, safeHeight - innerInset * 2);
  const innerRadius = Math.max(0, safeRadius - innerInset);
  const stdDeviation = Math.max(0.1, safeFeather / 2);
  const filter = safeFeather > 0
    ? `<filter id="f" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${stdDeviation}" /></filter>`
    : '';
  const blurredRect = safeFeather > 0
    ? `<rect x="${bleed}" y="${bleed}" width="${safeWidth}" height="${safeHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" filter="url(#f)" />`
    : '';
  const solidRect = innerWidth > 0 && innerHeight > 0
    ? `<rect x="${bleed + innerInset}" y="${bleed + innerInset}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" ry="${innerRadius}" fill="white" />`
    : '';
  const baseRect = safeFeather <= 0
    ? `<rect x="${bleed}" y="${bleed}" width="${safeWidth}" height="${safeHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" />`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}"><defs>${filter}</defs>${baseRect}${blurredRect}${solidRect}</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

const PointsBackgroundOverlay: React.FC<{ appearance: TemplateAppearance }> = ({ appearance }) => {
  const frame = useCurrentFrame();
  const safeOpacity = clamp(Number(appearance.backgroundOpacity ?? 10) / 100, 0, 1);
  const maskImage = React.useMemo(
    () => buildRoundedMask({
      width: 1920,
      height: 1080,
      radius: Number(appearance.backgroundRadius ?? 42),
      feather: Number(appearance.backgroundFeather ?? 84),
    }),
    [appearance.backgroundFeather, appearance.backgroundRadius],
  );

  if (safeOpacity <= 0.001) {
    return null;
  }

  const offsetX = appearance.parallaxEnabled !== false ? Math.sin(frame / 60) * 20 : 0;
  const offsetY = appearance.parallaxEnabled !== false ? Math.cos(frame / 82) * 14 : 0;
  const scale = appearance.parallaxEnabled !== false ? 1.1 + Math.sin(frame / 120) * 0.018 : 1.08;
  const source = appearance.backgroundImageUrl || DEFAULT_TEMPLATE_BACKGROUND;

  return (
    <div
      style={{
        ...absFill({
          zIndex: 1,
          opacity: safeOpacity,
          overflow: 'hidden',
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }),
      }}
    >
      <Img
        src={source}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          transformOrigin: 'center center',
          filter: appearance.backgroundBlur && appearance.backgroundBlur > 0
            ? `blur(${appearance.backgroundBlur}px) saturate(1.04) brightness(0.92)`
            : 'saturate(1.04) brightness(0.92)',
        }}
      />
    </div>
  );
};

const AudioTracks: React.FC<Pick<QawalebProps, 'musicUrl' | 'musicVolume' | 'voiceoverUrl' | 'voiceoverVolume'>> = ({
  musicUrl,
  musicVolume,
  voiceoverUrl,
  voiceoverVolume,
}) => {
  return (
    <>
      {musicUrl ? <Audio src={musicUrl} volume={musicVolume ?? 0.5} /> : null}
      {voiceoverUrl ? <Audio src={voiceoverUrl} volume={voiceoverVolume ?? 1} /> : null}
    </>
  );
};

const SocialCardBase: React.FC<{
  background: React.ReactNode;
  entranceOpacity: number;
  entranceTransform: string;
  floatTransform: string;
  card: React.ReactNode;
}> = ({ background, entranceOpacity, entranceTransform, floatTransform, card }) => {
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {background}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: entranceOpacity,
          transform: entranceTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ transform: floatTransform, transformStyle: 'preserve-3d' }}>{card}</div>
      </div>
    </AbsoluteFill>
  );
};

const BreakingBoldTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const title = getValue(values, 'i-title');
  const body = getValue(values, 'i-body');
  const words = splitWords(title);
  const palette = getTemplatePalette('breaking-bold', appearance);
  const tickerShift = interpolate(frame % 700, [0, 700], [100, -100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        ...stageStyle,
        background:
          `radial-gradient(ellipse at 30% 20%, ${palette.accentAlt}22 0%, ${palette.background} 55%, #000 100%)`,
        color: palette.text,
        fontFamily: FONT_RTL_PRIMARY,
      }}
    >
      <div
        style={{
          ...absFill(),
          opacity: 0.18,
          mixBlendMode: 'overlay',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0 1px, transparent 1px 6px)',
          backgroundSize: '12px 12px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '60%',
          left: '-10%',
          background: `linear-gradient(120deg,${palette.accentAlt} 0%,${palette.accent} 60%,${palette.accentAlt} 100%)`,
          clipPath: 'polygon(0 0,100% 0,70% 100%,0 100%)',
          opacity: 0.92 * fade(frame, 6, 20, slashEase),
          transform: `translateX(${shift(frame, 6, 20, -420, 0, slashEase)}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          opacity: fade(frame, 2, 16),
          transform: `translateX(${shift(frame, 2, 16, 40)}px)`,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: palette.accent,
            boxShadow: `0 0 24px ${palette.accent}`,
            transform: `scale(${1 + Math.sin(frame / 5) * 0.25})`,
          }}
        />
        <span
          style={{
            background: palette.accent,
            color: '#fff',
            padding: '14px 26px',
            fontFamily: FONT_RTL_PRIMARY,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 28),
            clipPath: 'polygon(8% 0,100% 0,92% 100%,0 100%)',
          }}
        >
          عاجل
        </span>
        <span style={{ fontFamily: FONT_MONO, color: palette.muted, fontSize: scaleFont(appearance, 20) }}>
          {getValue(values, 'i-time')}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 96,
          top: 200,
          width: 760,
          height: 560,
          background: palette.surface,
          overflow: 'hidden',
          clipPath: 'polygon(0 0,100% 0,100% 88%,92% 100%,0 100%)',
          opacity: fade(frame, 14, 20),
          transform: `translateY(${shift(frame, 14, 20, 40)}px) scale(${interpolate(frame, [14, 34], [0.96, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: smoothEase })})`,
        }}
      >
        <SafeImg src={getValue(values, 'i-img')} style={imageStyle(1.08)} />
        <div style={{ ...absFill(), background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.55))' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: palette.accent,
            color: '#fff',
            padding: '14px 28px 14px 56px',
            fontFamily: FONT_RTL_PRIMARY,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 22),
            clipPath: 'polygon(22% 0,100% 0,100% 100%,0 100%)',
          }}
        >
          {getValue(values, 'i-cap')}
        </div>
      </div>
      <div style={{ position: 'absolute', right: 96, top: 240, width: 880 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            border: `2px solid ${palette.accent}`,
            color: palette.accent,
            fontFamily: FONT_RTL_PRIMARY,
            fontSize: scaleFont(appearance, 24),
            letterSpacing: '0.12em',
            opacity: fade(frame, 24, 14),
            transform: `translateY(${shift(frame, 24, 14, 20)}px)`,
          }}
        >
          {getValue(values, 'i-kicker')}
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_RTL_PRIMARY,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 96),
            lineHeight: 1.04,
            maxWidth: 820,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 10px',
          }}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              style={{
                display: 'inline-block',
                opacity: fade(frame, 28 + index * 2.25, 12),
                transform: `translateY(${shift(frame, 28 + index * 2.25, 12, 60)}px)`,
                filter: `blur(${shift(frame, 28 + index * 2.25, 12, 8, 0)}px)`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            height: 6,
            width: interpolate(frame, [55, 75], [0, 280], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: smoothEase,
            }),
            background: palette.accent,
            boxShadow: `0 0 30px ${palette.accent}`,
          }}
        />
        <p
          style={rtlParagraphStyle({
            marginTop: 40,
            fontSize: scaleFont(appearance, 32),
            lineHeight: 1.55,
            color: palette.muted,
            maxWidth: 820,
            opacity: fade(frame, 60, 14),
            transform: `translateY(${shift(frame, 60, 14, 20)}px)`,
          })}
        >
          {body}
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          right: 96,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: FONT_RTL_PRIMARY,
          fontSize: scaleFont(appearance, 22),
          color: palette.muted,
          opacity: fade(frame, 75, 12),
        }}
      >
        <span style={{ width: 36, height: 3, background: palette.accent }} />
        <span>{getValue(values, 'i-source')}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 96,
          display: 'flex',
          alignItems: 'stretch',
          transform: `translateY(${shift(frame, 40, 16, 110, 0)}%)`,
        }}
      >
        <div
          style={{
            background: palette.accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            fontFamily: FONT_RTL_PRIMARY,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 30),
            clipPath: 'polygon(0 0,100% 0,92% 100%,0 100%)',
            minWidth: 340,
          }}
        >
          شريط الأخبار
        </div>
        <div
          style={{
            flex: 1,
            background: palette.surface,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '0 40px',
            borderTop: `2px solid ${palette.background}`,
            borderBottom: `2px solid ${palette.background}`,
            color: palette.text,
            fontSize: scaleFont(appearance, 28),
          }}
        >
          <span style={{ whiteSpace: 'nowrap', transform: `translateX(${tickerShift}%)`, paddingRight: 120 }}>
            {`${title}   •   ${body}`}
          </span>
        </div>
        <div
          style={{
            background: palette.background,
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            color: palette.text,
            fontSize: scaleFont(appearance, 30),
            borderRight: `4px solid ${palette.accent}`,
            fontFamily: FONT_MONO,
          }}
        >
          {getValue(values, 'i-time').split('—')[0]?.trim() || '22:47'}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EditorialElegantTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const titleLines = splitIntoChunks(getValue(values, 'i-title'), 3);
  const palette = getTemplatePalette('editorial-elegant', appearance);

  return (
    <AbsoluteFill
      style={{
        ...stageStyle,
        background:
          `radial-gradient(ellipse at 80% 20%, ${palette.accent}1c 0%, transparent 55%), linear-gradient(180deg, ${palette.background} 0%, ${palette.surface} 100%)`,
        color: palette.text,
        fontFamily: FONT_RTL_PRIMARY,
      }}
    >
      <div
        style={{
          ...absFill(),
          opacity: 0.25,
          backgroundImage:
            'radial-gradient(circle at 10% 10%, rgba(176,141,87,0.10) 0 1px, transparent 1px 10px)',
          backgroundSize: '24px 24px',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 108,
          borderBottom: `1px solid ${palette.muted}`,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0 80px',
          background: `${palette.background}aa`,
          opacity: fade(frame, 3, 18),
          transform: `translateY(${shift(frame, 3, 18, -100)}%)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 18) }}>
          <span style={{ width: 40, height: 1, background: palette.accent }} />
          <span>التقرير الأسبوعي</span>
        </div>
        <div style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: scaleFont(appearance, 54), color: palette.text }}>
          المقالة
        </div>
        <div style={{ justifySelf: 'end', color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 18) }}>
          22 شعبان / المجلد 7
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 230,
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: scaleFont(appearance, 280),
          color: palette.accent,
          opacity: 0.1 * fade(frame, 20, 24),
          transform: `scale(${interpolate(frame, [20, 44], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: smoothEase })}) rotate(${shift(frame, 20, 24, -4, 0)}deg)`,
          transformOrigin: 'left top',
        }}
      >
        ا
      </div>
      <div
        style={{
          position: 'absolute',
          top: 160,
          bottom: 160,
          left: 80,
          right: 80,
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: 80,
        }}
      >
        <div style={{ position: 'relative', background: palette.surface, opacity: fade(frame, 14, 20), transform: `translateY(${shift(frame, 14, 20, 20)}px)` }}>
          <span style={{ position: 'absolute', inset: 0, borderTop: `1px solid ${palette.accent}`, borderBottom: `1px solid ${palette.accent}` }} />
          <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 1, background: palette.accent }} />
          <span style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 1, background: palette.accent }} />
          <div style={{ position: 'absolute', inset: 18, overflow: 'hidden', background: '#ddd' }}>
            <SafeImg src={getValue(values, 'i-img')} style={imageStyle(interpolate(frame, [0, 500], [1.08, 1.12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), -1.5, -1)} />
          </div>
          {['c1', 'c2', 'c3', 'c4'].map((corner) => (
            <span
              key={corner}
              style={{
                position: 'absolute',
                width: 22,
                height: 22,
                border: `2px solid ${palette.accentDark}`,
                ...(corner === 'c1' ? { top: -2, left: -2, borderRight: 0, borderBottom: 0 } : {}),
                ...(corner === 'c2' ? { top: -2, right: -2, borderLeft: 0, borderBottom: 0 } : {}),
                ...(corner === 'c3' ? { bottom: -2, left: -2, borderRight: 0, borderTop: 0 } : {}),
                ...(corner === 'c4' ? { bottom: -2, right: -2, borderLeft: 0, borderTop: 0 } : {}),
              }}
            />
          ))}
          <div
            style={rtlTextStyle({
              position: 'absolute',
              left: 18,
              right: 18,
              bottom: -44,
              fontSize: scaleFont(appearance, 18),
              color: palette.muted,
              opacity: fade(frame, 40, 12),
              transform: `translateY(${shift(frame, 40, 12, 8)}px)`,
            })}
          >
            {getValue(values, 'i-caption')}
          </div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginBottom: 36,
              opacity: fade(frame, 22, 14),
              transform: `translateY(${shift(frame, 22, 14, 12)}px)`,
            }}
          >
            <span style={{ fontFamily: FONT_MONO, color: palette.accentDark, fontSize: scaleFont(appearance, 18) }}>01</span>
            <span style={{ flex: 1, height: 1, background: palette.muted }} />
            <span style={{ color: palette.muted, fontSize: scaleFont(appearance, 18) }}>{getValue(values, 'i-tag')}</span>
          </div>
          <div style={rtlTextStyle({ fontWeight: 700, color: palette.text, fontSize: scaleFont(appearance, 104), lineHeight: 1.06 })}>
            {titleLines.map((line, index) => (
              <div key={index} style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    transform: `translateY(${shift(frame, 26 + index * 4, 16, 110, 0)}%)`,
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>
          <p
            style={rtlParagraphStyle({
              marginTop: 30,
              fontSize: scaleFont(appearance, 36),
              lineHeight: 1.45,
              maxWidth: 780,
              color: palette.text,
              opacity: fade(frame, 50, 18),
              transform: `translateY(${shift(frame, 50, 18, 8)}px)`,
            })}
          >
            {getValue(values, 'i-deck')}
          </p>
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: fade(frame, 62, 12),
            }}
          >
            <span style={rtlTextStyle({ fontSize: scaleFont(appearance, 22) })}>{getValue(values, 'i-author')}</span>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: palette.accent }} />
            <span style={rtlTextStyle({ fontSize: scaleFont(appearance, 16), color: palette.muted })}>{getValue(values, 'i-source')}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          bottom: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 24,
          borderTop: `1px solid ${palette.muted}`,
          color: palette.muted,
          fontFamily: FONT_MONO,
          fontSize: scaleFont(appearance, 18),
          opacity: fade(frame, 35, 12),
          transform: `translateY(${shift(frame, 35, 12, 12)}px)`,
        }}
      >
        <div>قسم الأخبار العالمية</div>
        <div style={{ fontFamily: FONT_SERIF, color: palette.accentDark, fontSize: scaleFont(appearance, 24) }}>— صفحة 01 —</div>
        <div>مايو 2026</div>
      </div>
    </AbsoluteFill>
  );
};

const CinematicDarkTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const titleLines = splitIntoChunks(getValue(values, 'i-title'), 2);
  const palette = getTemplatePalette('cinematic-dark', appearance);

  return (
    <AbsoluteFill style={{ ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY }}>
      <div style={{ ...absFill(), overflow: 'hidden', background: palette.background }}>
        <SafeImg
          src={getValue(values, 'i-img')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${interpolate(frame, [0, durationInFrames], [1.12, 1.22])}) translate(${interpolate(frame, [0, durationInFrames], [2, -2])}%, ${interpolate(frame, [0, durationInFrames], [1, -1])}%)`,
            filter: 'contrast(1.06) saturate(.85) brightness(.85)',
          }}
        />
        <div
          style={{
            ...absFill(),
            background:
              'linear-gradient(180deg, rgba(0,0,0,.55) 0%, transparent 30%, transparent 50%, rgba(0,0,0,.95) 100%), linear-gradient(90deg, rgba(0,0,0,.6) 0%, transparent 40%, transparent 60%, rgba(0,0,0,.4) 100%)',
          }}
        />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90, background: palette.background, zIndex: 5, transform: `translateY(${shift(frame, 2, 14, -100, 0, slashEase)}%)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: palette.background, zIndex: 5, transform: `translateY(${shift(frame, 2, 14, 100, 0, slashEase)}%)` }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0 56px',
          zIndex: 6,
          color: palette.muted,
          fontFamily: FONT_MONO,
          letterSpacing: '0.18em',
          fontSize: scaleFont(appearance, 16),
          opacity: fade(frame, 20, 10),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 12, height: 12, border: `1px solid ${palette.accent}`, borderRadius: 999, display: 'grid', placeItems: 'center' }}>
            <span style={{ width: 6, height: 6, background: palette.accent, borderRadius: 999 }} />
          </span>
          <span>{getValue(values, 'i-loc')}</span>
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, color: palette.accent, fontSize: scaleFont(appearance, 18) }}>DISPATCH · المراسلون</div>
        <div style={{ textAlign: 'left' }}>{getValue(values, 'i-dur')}</div>
      </div>
      {[
        { top: 108, left: 56, style: { borderRight: 0, borderBottom: 0 } },
        { top: 108, right: 56, style: { borderLeft: 0, borderBottom: 0 } },
        { bottom: 140, left: 56, style: { borderRight: 0, borderTop: 0 } },
        { bottom: 140, right: 56, style: { borderLeft: 0, borderTop: 0 } },
      ].map((reticle, index) => (
        <span
          key={index}
          style={{
            position: 'absolute',
            width: 36,
            height: 36,
            border: `1px solid ${palette.text}`,
            opacity: 0.7 * fade(frame, 28, 10),
            zIndex: 6,
            ...reticle,
            ...reticle.style,
          }}
        />
      ))}
      <div style={{ position: 'absolute', left: 96, right: 96, bottom: 160, zIndex: 6, maxWidth: 1320 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 30,
            opacity: fade(frame, 30, 12),
            transform: `translateY(${shift(frame, 30, 12, 20)}px)`,
          }}
        >
          <span style={{ fontFamily: FONT_MONO, color: palette.accent, letterSpacing: '0.3em', fontSize: scaleFont(appearance, 18) }}>{getValue(values, 'i-num')}</span>
          <span style={{ width: 120, height: 1, background: palette.accent }} />
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 22) }}>{getValue(values, 'i-tag')}</span>
        </div>
        <div style={rtlTextStyle({ fontWeight: 700, fontSize: scaleFont(appearance, 132), lineHeight: 1.02, color: palette.text, textShadow: '0 4px 60px rgba(0,0,0,.6)' })}>
          {titleLines.map((line, index) => (
            <div key={index} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
              <div
                style={{
                  transform: `translateY(${shift(frame, 38 + index * 6, 18, 110, 0)}%)`,
                  opacity: fade(frame, 38 + index * 6, 18),
                  filter: `blur(${shift(frame, 38 + index * 6, 18, 8, 0)}px)`,
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>
        <p
          style={rtlParagraphStyle({
            marginTop: 36,
            fontWeight: 300,
            color: palette.text,
            fontSize: scaleFont(appearance, 34),
            lineHeight: 1.45,
            maxWidth: 1100,
            opacity: fade(frame, 64, 18),
            transform: `translateY(${shift(frame, 64, 18, 12)}px)`,
          })}
        >
          {getValue(values, 'i-deck')}
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          bottom: 50,
          zIndex: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: palette.muted,
          fontFamily: FONT_MONO,
          fontSize: scaleFont(appearance, 16),
          opacity: fade(frame, 76, 10),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 8, height: 8, background: palette.accent, transform: 'rotate(45deg)' }} />
          <span style={rtlTextStyle({ fontSize: scaleFont(appearance, 16), color: palette.muted })}>{getValue(values, 'i-source')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: palette.alert, opacity: 0.6 + Math.sin(frame / 6) * 0.4 }} />
          <span>REC · 22:47:13</span>
        </div>
      </div>
      <div
        style={{
          ...absFill(),
          zIndex: 5,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 380px 60px rgba(0,0,0,.95)',
        }}
      />
    </AbsoluteFill>
  );
};

const SportsEnergyTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const rawTitle = getValue(values, 'i-title');
  const parts = rawTitle.split(/(\{[^}]+\})/g).filter(Boolean);
  const palette = getTemplatePalette('sports-energy', appearance);
  const crawlShift = interpolate(frame % 550, [0, 550], [100, -100]);

  return (
    <AbsoluteFill style={{ ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY }}>
      <div
        style={{
          ...absFill(),
          background:
            `radial-gradient(circle at 20% 30%, ${palette.accent}33 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${palette.accentAlt}29 0%, transparent 50%), linear-gradient(160deg, ${palette.background} 0%, ${palette.surface} 100%)`,
        }}
      />
      <div
        style={{
          ...absFill(),
          opacity: 0.18,
          backgroundImage: `radial-gradient(circle, ${palette.accent} 1.2px, transparent 1.5px)`,
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(120deg, transparent 30%, black 70%)',
        }}
      />
      {[
        { left: '-18%', width: '90%', color: palette.accentAlt, from: -130, delay: 0 },
        { left: '-2%', width: '80%', color: palette.background, from: -120, delay: 4 },
        { left: '-10%', width: '80%', color: palette.accent, from: -120, delay: 0 },
      ].map((slab, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: slab.left,
            width: slab.width,
            height: '170%',
            top: '-30%',
            background: slab.color,
            transform: `translate(${shift(frame, slab.delay, 14, slab.from, 0, slashEase)}%, 0) rotate(18deg)`,
            transformOrigin: 'top left',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 920,
          top: 160,
          width: 920,
          height: 760,
          overflow: 'hidden',
          background: palette.surface,
          boxShadow: '0 30px 80px rgba(0,0,0,.5)',
          border: `6px solid ${palette.accent}`,
          opacity: fade(frame, 14, 18),
          transform: `skewX(-12deg) translateY(${shift(frame, 14, 18, 40)}px)`,
        }}
      >
        <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'skewX(12deg) scale(1.18)', filter: 'contrast(1.1)' }} />
        <div style={{ ...absFill(), background: 'linear-gradient(45deg, rgba(245,208,0,.25), transparent 40%)', mixBlendMode: 'screen' }} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 96,
          right: 88,
          background: palette.accentAlt,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 22px',
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: scaleFont(appearance, 30),
          boxShadow: `0 8px 0 ${palette.background}`,
          opacity: fade(frame, 22, 10, overshootEase),
          transform: `rotate(-3deg) scale(${interpolate(frame, [22, 32], [0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: overshootEase })})`,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 999, background: '#fff', opacity: 0.6 + Math.sin(frame / 5) * 0.4 }} />
        LIVE
      </div>
      <div
        style={{
          position: 'absolute',
          top: 170,
          right: 88,
          background: palette.accent,
          color: palette.background,
          padding: '14px 22px',
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: scaleFont(appearance, 22),
          boxShadow: `0 8px 0 ${palette.background}`,
          opacity: fade(frame, 26, 10, overshootEase),
          transform: `rotate(2deg) scale(${interpolate(frame, [26, 36], [0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: overshootEase })})`,
        }}
      >
        {getValue(values, 'i-cat')}
      </div>
      <div style={{ position: 'absolute', left: 80, top: 200, width: 980, zIndex: 5 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 18px',
            background: palette.background,
            color: palette.accent,
            border: `3px solid ${palette.accent}`,
            fontFamily: FONT_MONO,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 22),
            letterSpacing: '0.18em',
            opacity: fade(frame, 20, 12),
            transform: `translateX(${shift(frame, 20, 12, 40)}px)`,
          }}
        >
          {getValue(values, 'i-kicker')}
        </div>
        <div style={rtlTextStyle({ marginTop: 30, fontWeight: 900, fontSize: scaleFont(appearance, 148), lineHeight: 0.92, display: 'flex', flexWrap: 'wrap', gap: '0 18px' })}>
          {parts.map((token, index) => {
            const isEm = /^\{.+\}$/.test(token);
            const text = isEm ? token.slice(1, -1) : token;
            return text.split(/\s+/).filter(Boolean).map((word, wordIndex) => {
              const delay = 26 + (index + wordIndex) * 2;
              if (isEm) {
                return (
                  <span
                    key={`${word}-${index}-${wordIndex}`}
                    style={{
                      background: palette.accent,
                      color: palette.background,
                      padding: '0 18px',
                      display: 'inline-block',
                      transform: `translateX(${shift(frame, delay, 12, 60)}px) skewX(-12deg)`,
                      opacity: fade(frame, delay, 12),
                    }}
                  >
                    <span style={{ display: 'inline-block', transform: 'skewX(12deg)' }}>{word}</span>
                  </span>
                );
              }
              return (
                <span
                  key={`${word}-${index}-${wordIndex}`}
                  style={{
                    display: 'inline-block',
                    opacity: fade(frame, delay, 12),
                    transform: `translateX(${shift(frame, delay, 12, 60)}px)`,
                  }}
                >
                  {word}
                </span>
              );
            });
          })}
        </div>
        <div
          style={{
            marginTop: 42,
            display: 'flex',
            gap: 32,
            opacity: fade(frame, 58, 14),
            transform: `translateY(${shift(frame, 58, 14, 20)}px)`,
          }}
        >
          {[
            ['i-s1v', 'i-s1k'],
            ['i-s2v', 'i-s2k'],
            ['i-s3v', 'i-s3k'],
          ].map(([valueKey, labelKey]) => (
            <div key={valueKey} style={{ padding: '18px 28px', background: 'rgba(255,255,255,.06)', border: '2px solid rgba(255,255,255,.12)', minWidth: 160 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 54), color: palette.accent, lineHeight: 1 }}>{getValue(values, valueKey)}</div>
              <div style={{ fontSize: scaleFont(appearance, 18), color: palette.muted, marginTop: 4 }}>{getValue(values, labelKey)}</div>
            </div>
          ))}
        </div>
        <p
          style={rtlParagraphStyle({
            marginTop: 36,
            color: palette.muted,
            fontSize: scaleFont(appearance, 28),
            lineHeight: 1.5,
            maxWidth: 880,
            opacity: fade(frame, 62, 14),
            transform: `translateY(${shift(frame, 62, 14, 20)}px)`,
          })}
        >
          {getValue(values, 'i-body')}
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          bottom: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          opacity: fade(frame, 72, 12),
          transform: `translateY(${shift(frame, 72, 12, 20)}px)`,
        }}
      >
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, color: palette.accent, fontSize: scaleFont(appearance, 80), textShadow: `6px 6px 0 ${palette.background}` }}>01</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 22), letterSpacing: '0.2em' }}>{getValue(values, 'i-source')}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 90,
          display: 'flex',
          transform: `translateY(${shift(frame, 42, 14, 110, 0)}%)`,
          zIndex: 6,
        }}
      >
        <div style={{ background: palette.accent, color: palette.background, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 34), display: 'flex', alignItems: 'center', padding: '0 40px', clipPath: 'polygon(0 0,100% 0,94% 100%,0 100%)', minWidth: 300 }}>آخر الأخبار</div>
        <div style={{ flex: 1, background: palette.background, color: palette.accent, fontSize: scaleFont(appearance, 24), display: 'flex', alignItems: 'center', padding: '0 40px', overflow: 'hidden' }}>
          <span style={rtlTextStyle({ whiteSpace: 'nowrap', transform: `translateX(${crawlShift}%)`, paddingLeft: 80, fontSize: scaleFont(appearance, 24) })}>{`${rawTitle} • ${getValue(values, 'i-body')}`}</span>
        </div>
        <div style={{ background: palette.text, color: palette.background, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 28), display: 'flex', alignItems: 'center', padding: '0 32px', borderRight: `6px solid ${palette.accent}` }}>{getValue(values, 'i-clock')}</div>
      </div>
    </AbsoluteFill>
  );
};

const DocumentaryMinimalTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const titleLines = splitIntoChunks(getValue(values, 'i-title'), splitWords(getValue(values, 'i-title')).length > 12 ? 3 : 2);
  const chips = getValue(values, 'i-chips').split(',').map((chip) => chip.trim()).filter(Boolean);
  const palette = getTemplatePalette('documentary-minimal', appearance);

  return (
    <AbsoluteFill style={{ ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY }}>
      <div style={{ ...absFill(), opacity: 0.06, mixBlendMode: 'multiply', backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.08) 0 1px, transparent 1px 8px)', backgroundSize: '16px 16px' }} />
      <div style={{ ...absFill(), opacity: fade(frame, 4, 8), background: `linear-gradient(90deg, transparent 49.95%, ${palette.line} 49.95%, ${palette.line} 50.05%, transparent 50.05%)` }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          borderBottom: `1px solid ${palette.line}`,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0 80px',
          color: palette.muted,
          fontFamily: FONT_MONO,
          fontSize: scaleFont(appearance, 14),
          letterSpacing: '0.22em',
          opacity: fade(frame, 2, 18),
          transform: `translateY(${shift(frame, 2, 18, -100)}%)`,
        }}
      >
        <div>قسم القصة الطويلة · LONGFORM</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 18), color: palette.text }}>القصة<span style={{ display: 'inline-block', width: 6, height: 6, background: palette.accent, borderRadius: 999, margin: '0 10px', verticalAlign: 'middle' }} />STORY</div>
        <div style={{ textAlign: 'left' }}>المجلد 07 · العدد 12</div>
      </div>
      <div style={{ position: 'absolute', right: 80, top: 160, width: 880, height: 760 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            background: palette.line,
            transformOrigin: 'right center',
            transform: `scaleX(${p(frame, 10, 22, slashEase)})`,
          }}
        >
          <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(frame, [0, durationInFrames], [1.1, 1.18])}) translate(${interpolate(frame, [0, durationInFrames], [1, -1])}%, ${interpolate(frame, [0, durationInFrames], [0, -1])}%)`, filter: 'saturate(.92)' }} />
        </div>
        <div style={{ position: 'absolute', top: -2, right: 24, background: palette.background, padding: '8px 16px', fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.accent, border: `1px solid ${palette.line}`, borderTop: 0, opacity: fade(frame, 32, 10), transform: `translateY(${shift(frame, 32, 10, -100, 0)}%)` }}>
          FIG. 01 / 04
        </div>
        <div style={{ position: 'absolute', bottom: -40, right: 0, left: 0, display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: '0.16em', opacity: fade(frame, 36, 10) }}>
          <span>{getValue(values, 'i-cap')}</span>
          <span>طهران · 2026</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 160, width: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: fade(frame, 22, 12), transform: `translateY(${shift(frame, 22, 12, 10)}px)` }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 16), color: palette.accent, letterSpacing: '0.2em' }}>{getValue(values, 'i-idx')}</span>
          <span style={{ flex: 1, height: 1, background: palette.line }} />
          <span style={{ fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: '0.16em' }}>{getValue(values, 'i-ts')}</span>
        </div>
        <div style={rtlTextStyle({ marginTop: 36, fontSize: scaleFont(appearance, 24), letterSpacing: '0.24em', textTransform: 'uppercase', color: palette.accent, opacity: fade(frame, 26, 10), transform: `translateY(${shift(frame, 26, 10, 10)}px)` })}>
          {getValue(values, 'i-kicker')}
        </div>
        <div style={rtlTextStyle({ marginTop: 24, fontSize: scaleFont(appearance, 104), lineHeight: 1.04, letterSpacing: '-0.005em' })}>
          {titleLines.map((line, index) => (
            <div key={index} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
              <div style={{ transform: `translateY(${shift(frame, 30 + index * 4, 16, 105, 0)}%)` }}>{line}</div>
            </div>
          ))}
        </div>
        <p style={rtlParagraphStyle({ marginTop: 38, fontWeight: 300, color: palette.muted, fontSize: scaleFont(appearance, 30), lineHeight: 1.55, maxWidth: 720, opacity: fade(frame, 54, 14), transform: `translateY(${shift(frame, 54, 14, 10)}px)` })}>
          {getValue(values, 'i-deck')}
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 10, flexWrap: 'wrap', opacity: fade(frame, 58, 12), transform: `translateY(${shift(frame, 58, 12, 10)}px)` }}>
          {chips.map((chip) => (
            <span key={chip} style={{ padding: '8px 14px', border: `1px solid ${palette.line}`, borderRadius: 999, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.text, background: 'rgba(255,255,255,.5)' }}>
              {chip}
            </span>
          ))}
        </div>
        <blockquote style={rtlParagraphStyle({ marginTop: 48, paddingRight: 32, borderRight: `3px solid ${palette.accent}`, fontSize: scaleFont(appearance, 22), lineHeight: 1.5, maxWidth: 640, opacity: fade(frame, 66, 14), transform: `translateY(${shift(frame, 66, 14, 10)}px)` })}>
          <span>{getValue(values, 'i-quote')}</span>
          <span style={{ display: 'block', marginTop: 14, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: '0.18em' }}>{getValue(values, 'i-who')}</span>
        </blockquote>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          bottom: 48,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 32,
          paddingTop: 24,
          borderTop: `1px solid ${palette.line}`,
          opacity: fade(frame, 34, 10),
          transform: `translateY(${shift(frame, 34, 10, 10)}px)`,
        }}
      >
        <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 18), color: palette.text })}>
          <span style={{ color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 13), marginLeft: 14 }}>SOURCE</span>
          {getValue(values, 'i-source')}
        </div>
        <div style={{ height: 2, background: palette.line, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p(frame, 34, 125) * 100}%`, background: palette.accent }} />
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted }}>
          <b style={{ color: palette.text }}>PART 01</b> / قراءة 8 دقائق
        </div>
      </div>
    </AbsoluteFill>
  );
};

const XAnimatedTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const entranceOpacity = fade(frame, 6, 18);
  const entranceTransform = `translate(-50%, -50%) translateZ(${shift(frame, 6, 18, -500, 0)}px) rotateX(${shift(frame, 6, 18, 20, 0)}deg)`;
  const floatTransform = `translateY(${Math.sin(frame / 18) * 10}px) rotateX(${Math.sin(frame / 32) * 2}deg) rotateY(${Math.cos(frame / 24) * 2}deg)`;
  const palette = getTemplatePalette('x-animated', appearance);

  return (
    <SocialCardBase
      background={
        <AbsoluteFill style={{ background: `radial-gradient(circle at center, ${palette.card} 0%, ${palette.background} 100%)` }}>
          <div style={{ position: 'absolute', fontSize: scaleFont(appearance, 1000), color: `${palette.text}08`, fontFamily: 'sans-serif', top: -100, left: -100, lineHeight: 1, transform: `translate(${interpolate(frame % 750, [0, 750], [0, -100])}px, ${interpolate(frame % 750, [0, 750], [0, 100])}px) rotate(-7deg)` }}>𝕏</div>
        </AbsoluteFill>
      }
      entranceOpacity={entranceOpacity}
      entranceTransform={entranceTransform}
      floatTransform={floatTransform}
      card={
        <div style={{ width: 1000, background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 24, padding: 40, boxShadow: '0 40px 100px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT_RTL_PRIMARY }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: fade(frame, 15, 10), transform: `translateY(${shift(frame, 15, 10, 20)}px)` }}>
            <SafeImg src={LOCAL_SOCIAL_AVATAR} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 28), fontWeight: 700, color: palette.text, display: 'flex', alignItems: 'center', gap: 8 })}>
                <span>{getValue(values, 'i-name')}</span>
                <span style={{ width: 24, height: 24, background: palette.accent, borderRadius: '50%', display: 'grid', placeItems: 'center', color: palette.text, fontSize: scaleFont(appearance, 14) }}>✓</span>
              </div>
              <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 22), color: palette.muted })}>{getValue(values, 'i-handle')}</div>
            </div>
            <div style={{ marginRight: 'auto', fontSize: scaleFont(appearance, 40), color: palette.text, fontFamily: 'sans-serif' }}>𝕏</div>
          </div>
          <div style={rtlParagraphStyle({ fontSize: scaleFont(appearance, 38), lineHeight: 1.5, color: palette.text, opacity: fade(frame, 19, 10), transform: `translateY(${shift(frame, 19, 10, 20)}px)` })}>{getValue(values, 'i-text')}</div>
          <div style={{ width: '100%', height: 450, borderRadius: 16, overflow: 'hidden', border: `1px solid ${palette.border}`, opacity: fade(frame, 23, 10), transform: `translateY(${shift(frame, 23, 10, 20)}px)` }}>
            <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: scaleFont(appearance, 22), color: palette.muted, borderBottom: `1px solid ${palette.border}`, paddingBottom: 15, marginTop: 10, opacity: fade(frame, 27, 10), transform: `translateY(${shift(frame, 27, 10, 20)}px)` }}>
            12:17 AM • May 14, 2026 • <b style={{ color: palette.text }}>1.5M</b> Views
          </div>
          <div style={{ display: 'flex', gap: 40, color: palette.text, fontSize: scaleFont(appearance, 24), fontWeight: 700, paddingTop: 10, opacity: fade(frame, 31, 10), transform: `translateY(${shift(frame, 31, 10, 20)}px)` }}>
            <div>22K <span style={{ color: palette.muted, fontWeight: 400, marginRight: 5 }}>Reposts</span></div>
            <div>15K <span style={{ color: palette.muted, fontWeight: 400, marginRight: 5 }}>Quotes</span></div>
            <div>110K <span style={{ color: palette.muted, fontWeight: 400, marginRight: 5 }}>Likes</span></div>
          </div>
        </div>
      }
    />
  );
};

const FacebookAnimatedTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const entranceOpacity = fade(frame, 6, 18);
  const entranceTransform = `translate(-50%, ${shift(frame, 6, 18, -30, -50)}%)`;
  const floatTransform = `translateY(${Math.sin(frame / 18) * 8}px) rotateZ(${Math.sin(frame / 45) * 0.4}deg)`;
  const palette = getTemplatePalette('facebook-animated', appearance);

  return (
    <SocialCardBase
      background={
        <AbsoluteFill style={{ background: `radial-gradient(circle at 20% 80%, ${palette.card} 0%, ${palette.background} 100%)` }}>
          <div style={{ position: 'absolute', right: -150, bottom: -150, opacity: 0.04, width: 1200, height: 1200, color: palette.accent, fontSize: scaleFont(appearance, 1200), fontFamily: 'Arial Black, sans-serif', lineHeight: 1 }}>f</div>
        </AbsoluteFill>
      }
      entranceOpacity={entranceOpacity}
      entranceTransform={entranceTransform}
      floatTransform={floatTransform}
      card={
        <div style={{ width: 900, background: palette.card, borderRadius: 16, padding: 30, boxShadow: '0 30px 80px rgba(0,0,0,0.2)', fontFamily: FONT_RTL_PRIMARY }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 25, opacity: fade(frame, 16, 10), transform: `translateY(${shift(frame, 16, 10, 20)}px)` }}>
            <SafeImg src={LOCAL_SOCIAL_AVATAR} style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 26), fontWeight: 700, color: palette.text })}>{getValue(values, 'i-name')}</div>
              <div style={{ fontSize: scaleFont(appearance, 18), color: palette.muted }}>أمس في ٨:٣٠ م • 🌐</div>
            </div>
          </div>
          <div style={rtlParagraphStyle({ fontSize: scaleFont(appearance, 38), lineHeight: 1.5, color: palette.text, marginBottom: 25, opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 20)}px)` })}>{getValue(values, 'i-text')}</div>
          <div style={{ width: 'calc(100% + 60px)', margin: '0 -30px 20px', height: 500, overflow: 'hidden', borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}`, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 20)}px)` }}>
            <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(frame, [0, 350], [1.1, 1])})` }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: palette.muted, fontSize: scaleFont(appearance, 22), borderBottom: `1px solid ${palette.border}`, paddingBottom: 15, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 20)}px)` }}>
            <span>❤️ 👍 ٢٨ ألف</span>
            <span style={{ marginRight: 'auto' }}>١,٤٠٠ تعليق • ٥٦٠ مشاركة</span>
          </div>
          <div style={{ display: 'flex', paddingTop: 15, justifyContent: 'space-around', color: palette.muted, fontSize: scaleFont(appearance, 24), fontWeight: 600, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 20)}px)` }}>
            <div>أعجبني</div>
            <div>تعليق</div>
            <div>مشاركة</div>
          </div>
        </div>
      }
    />
  );
};

const TelegramAnimatedTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const floatTransform = `translateY(${Math.sin(frame / 18) * 8}px) rotateX(${Math.sin(frame / 44) * 1}deg)`;
  const palette = getTemplatePalette('telegram-animated', appearance);

  return (
    <AbsoluteFill style={{ ...stageStyle, background: palette.background, fontFamily: FONT_RTL_PRIMARY }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '30%', left: '10%', width: 600, opacity: 0.03, transform: `translate(${interpolate(frame % 1000, [0, 1000], [-200, 1500])}px, ${interpolate(frame % 1000, [0, 1000], [200, -500])}px) rotate(${interpolate(frame % 1000, [0, 1000], [-10, 10])}deg)` }}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 110, background: palette.header, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', transform: `translateY(${shift(frame, 4, 16, -100, 0)}%)`, zIndex: 10 }}>
        <div style={{ width: 65, height: 65, borderRadius: '50%', background: `linear-gradient(${palette.accent}, ${palette.header})`, display: 'grid', placeItems: 'center', color: palette.text, fontSize: scaleFont(appearance, 30), fontWeight: 'bold' }}>
          {getValue(values, 'i-channel').charAt(0)}
        </div>
        <div>
          <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 28), fontWeight: 700, color: palette.text })}>{getValue(values, 'i-channel')}</div>
          <div style={{ fontSize: scaleFont(appearance, 20), color: palette.muted }}>2.8M subscribers</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, right: 120, opacity: fade(frame, 14, 18), transform: `translateY(${shift(frame, 14, 18, 100)}px)` }}>
        <div style={{ transform: floatTransform }}>
          <div style={{ width: 850, background: palette.card, borderRadius: 20, padding: 15, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ width: '100%', height: 500, borderRadius: 12, marginBottom: 20, overflow: 'hidden', opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 15)}px)` }}>
              <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '0 15px 10px' }}>
              <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 30), fontWeight: 700, color: palette.accent, marginBottom: 12, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` })}>{getValue(values, 'i-title')}</div>
              <div style={rtlParagraphStyle({ fontSize: scaleFont(appearance, 36), lineHeight: 1.5, color: palette.text, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` })}>{getValue(values, 'i-text')}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, color: palette.muted, fontSize: scaleFont(appearance, 20), marginTop: 20, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 15)}px)` }}>
                👁️ 412.5K • 11:45 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const InstagramAnimatedTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const entranceOpacity = fade(frame, 6, 18);
  const entranceTransform = `translate(-50%, -50%) scale(${interpolate(frame, [6, 24], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: smoothEase })}) translateY(${shift(frame, 6, 18, 50)}px)`;
  const floatTransform = `translateY(${Math.sin(frame / 20) * 8}px) rotateY(${Math.sin(frame / 40) * -2}deg)`;
  const palette = getTemplatePalette('instagram-animated', appearance);

  return (
    <SocialCardBase
      background={
        <AbsoluteFill style={{ background: `radial-gradient(circle at 80% 20%, ${palette.accent}22 0%, ${palette.background} 60%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 800, height: 800, background: `radial-gradient(circle, ${palette.accent}14 0%, ${palette.accent}0d 40%, rgba(255,255,255,0) 70%)`, top: '10%', left: '10%', filter: 'blur(60px)', transform: `translate(${Math.sin(frame / 60) * 200}px, ${Math.cos(frame / 60) * 60}px) scale(${1 + Math.sin(frame / 70) * 0.15})` }} />
        </AbsoluteFill>
      }
      entranceOpacity={entranceOpacity}
      entranceTransform={entranceTransform}
      floatTransform={floatTransform}
      card={
        <div style={{ width: 850, background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', fontFamily: FONT_RTL_PRIMARY }}>
          <div style={{ height: 80, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 15, borderBottom: `1px solid ${palette.border}`, background: palette.card, opacity: fade(frame, 16, 10), transform: `translateY(${shift(frame, 16, 10, 15)}px)` }}>
            <SafeImg src={LOCAL_SOCIAL_AVATAR} style={{ width: 50, height: 50, borderRadius: '50%', padding: 3, border: `3px solid ${palette.accent}`, objectFit: 'cover' }} />
            <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 22), fontWeight: 700, color: palette.text })}>{getValue(values, 'i-user')}</div>
            <div style={{ marginRight: 'auto', fontSize: scaleFont(appearance, 28), color: palette.text, letterSpacing: 2 }}>•••</div>
          </div>
          <div style={{ width: '100%', aspectRatio: '1 / 1', background: palette.border, overflow: 'hidden', opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 15)}px)` }}>
            <SafeImg src={getValue(values, 'i-img')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ background: palette.card }}>
            <div style={{ padding: '15px 20px', display: 'flex', gap: 20, fontSize: scaleFont(appearance, 30), color: palette.text, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` }}>
              <span>❤️</span>
              <span>💬</span>
              <span>✈️</span>
              <span style={{ marginRight: 'auto' }}>🔖</span>
            </div>
            <div style={{ padding: '0 20px 20px', opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 15)}px)` }}>
              <div style={rtlTextStyle({ fontWeight: 700, marginBottom: 10, fontSize: scaleFont(appearance, 22) })}>إعجاب بواسطة <b>آخرون</b> و ٤,٢١٠ آخرين</div>
              <div style={rtlParagraphStyle({ fontSize: scaleFont(appearance, 22), lineHeight: 1.5, color: palette.text })}>
                <b style={{ marginLeft: 8, fontFamily: FONT_RTL_PRIMARY }}>{getValue(values, 'i-user')}</b>
                <span>{getValue(values, 'i-text')}</span>
              </div>
              <div style={{ fontSize: scaleFont(appearance, 16), color: palette.muted, textTransform: 'uppercase', marginTop: 15 }}>منذ ١٤ ساعة</div>
            </div>
          </div>
        </div>
      }
    />
  );
};

const PointsBroadcastTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = getTemplatePalette('points-broadcast', appearance);
  const hasPortrait = Boolean(getValue(values, 'i-photo'));
  const speakerName = getValue(values, 'i-speaker', '').trim();
  const speakerRole = getValue(values, 'i-role', '').trim();
  const hasSpeakerMeta = Boolean(speakerName || speakerRole);
  const portraitRadius = appearance.portraitSquare ? 36 : '280px 280px 32px 32px';
  const portraitAuraRadius = appearance.portraitSquare ? 42 : '45%';
  const portraitRingRadius = appearance.portraitSquare ? 46 : '50%';
  const rawPoints = normalizePointItems(getValue(values, 'i-quote'));
  const points = rawPoints.length > 0 ? rawPoints : ['اكتب النقاط هنا'];
  const pointsWidth = hasPortrait ? 860 : 1180;
  const basePointFontSize = scaleFont(appearance, 62);
  const { fontSize: pointFontSize, groups } = resolvePointGroups(points, pointsWidth, basePointFontSize, FONT_RTL_PRIMARY, 4);
  const sequencePace = 2;
  const paceFrame = (frames: number) => Math.round(frames * sequencePace);
  const groupDurationSeconds = Math.max(3, Math.min(60, Number(getValue(values, 'i-group-duration', '10')) || 10));
  const minimumGroupDurationFrames = Math.max(paceFrame(45), Math.round(2.8 * fps));
  const groupDurationFrames = Math.max(minimumGroupDurationFrames, Math.round(groupDurationSeconds * fps));
  const loopEnabled = getValue(values, 'i-loop', '1') !== '0';
  const cycleIndex = Math.floor(frame / groupDurationFrames);
  const groupIndex = loopEnabled
    ? cycleIndex % groups.length
    : Math.min(groups.length - 1, cycleIndex);
  const groupFrame = loopEnabled
    ? frame % groupDurationFrames
    : Math.min(groupDurationFrames - 1, Math.max(0, frame - (groupIndex * groupDurationFrames)));
  const currentGroup = groups[groupIndex] || groups[0];
  const hasUpcomingGroup = loopEnabled ? groups.length > 1 : groupIndex < groups.length - 1;
  const groupTransitionFrames = Math.min(paceFrame(12), groupDurationFrames - 1);
  const timelineDrawFrames = Math.min(paceFrame(10), groupDurationFrames - 1);
  const groupEnter = fade(groupFrame, 0, groupTransitionFrames);
  const groupExit = hasUpcomingGroup
    ? interpolate(groupFrame, [Math.max(0, groupDurationFrames - groupTransitionFrames), groupDurationFrames], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    })
    : 1;
  const groupShift = shift(groupFrame, 0, groupTransitionFrames, 26, 0)
    + (hasUpcomingGroup ? shift(groupFrame, Math.max(0, groupDurationFrames - groupTransitionFrames), groupTransitionFrames, 0, -26) : 0);
  const groupOpacity = Math.max(0, Math.min(1, groupEnter * groupExit));
  const quoteAreaRight = hasPortrait ? 180 : 110;
  const quoteAreaWidth = hasPortrait ? 1120 : 1380;
  const timelineTopPositions = currentGroup.items.map((_, index) => {
    if (currentGroup.items.length === 1) {
      return 180;
    }
    return 78 + ((280 / Math.max(currentGroup.items.length - 1, 1)) * index);
  });
  const timelineLineTop = 28;
  const timelineLineHeight = Math.max(12, (timelineTopPositions.at(-1) ?? 180) - timelineLineTop + 18);
  const quoteGap = currentGroup.lineCount >= 4 ? 16 : 22;
  const portraitRevealStart = paceFrame(10);
  const portraitBadgeStart = paceFrame(22);
  const quoteMarkRevealStart = paceFrame(18);
  const titleMainRevealStart = paceFrame(20);
  const titleSubRevealStart = paceFrame(28);
  const subtitleUnderlineStart = paceFrame(34);
  const timelineRevealStart = paceFrame(38);
  const timelineNodeBaseDelay = paceFrame(10);
  const pointsRevealBaseDelay = paceFrame(22);
  const sourceRevealStart = paceFrame(64);

  return (
    <AbsoluteFill
      style={{
        ...stageStyle,
        background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.backgroundAlt} 100%)`,
        color: palette.text,
      }}
    >
      <div
        style={{
          ...absFill({
            zIndex: 0,
            background: [
              `radial-gradient(circle at 82% 38%, rgba(255,255,255,0.09), transparent 25%)`,
              `radial-gradient(circle at 20% 85%, rgba(0,0,0,0.20), transparent 36%)`,
              `linear-gradient(135deg, ${palette.background}, ${palette.backgroundAlt})`,
            ].join(','),
            transform: `scale(${1.015 + Math.sin(frame / 90) * 0.018}) translate(${-18 + Math.sin(frame / 120) * 16}px, ${10 + Math.cos(frame / 130) * 10}px)`,
          }),
        }}
      />
      <div
        style={{
          ...absFill({
            zIndex: 0,
            opacity: 0.13,
            mixBlendMode: 'soft-light',
            backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
            transform: 'rotate(-1deg) scale(1.08)',
          }),
        }}
      />
      <div
        style={{
          ...absFill({
            zIndex: 0,
            opacity: 0.12,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.22) 0 1px, transparent 1px 6px)',
            backgroundSize: '14px 14px',
          }),
        }}
      />
      <PointsBackgroundOverlay appearance={appearance} />

      <div
        style={{
          position: 'absolute',
          right: -2,
          top: 250,
          width: 34,
          height: 160,
          background: palette.accent,
          boxShadow: `0 0 40px ${palette.accent}66`,
          opacity: fade(frame, paceFrame(8), paceFrame(12)),
          transform: `translateX(${shift(frame, paceFrame(8), paceFrame(12), 30)}px)`,
        }}
      />

      {hasPortrait ? (
        <div
          style={{
            position: 'absolute',
            left: 56,
            bottom: 150,
            width: 620,
            height: 820,
            opacity: fade(frame, portraitRevealStart, paceFrame(16)),
            transform: `translateX(${shift(frame, portraitRevealStart, paceFrame(16), -80)}px) scale(${interpolate(frame, [portraitRevealStart, paceFrame(32)], [0.96, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: smoothEase,
            })})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: '50% 68%',
              transform: `translateY(${Math.sin(frame / 40) * -7}px) scale(${1 + Math.sin(frame / 60) * 0.012}) rotate(${Math.sin(frame / 75) * 0.35}deg)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 20,
                bottom: 42,
                width: 560,
                height: 560,
                borderRadius: portraitRingRadius,
                border: '3px solid rgba(255,255,255,.23)',
                boxShadow: 'inset 0 0 90px rgba(255,255,255,.08), 0 30px 80px rgba(0,0,0,.22)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 88,
                bottom: 126,
                width: 450,
                height: 560,
                borderRadius: portraitAuraRadius,
                background: 'radial-gradient(circle, rgba(255,255,255,.30), transparent 68%)',
                filter: 'blur(28px)',
                opacity: 0.45,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 52,
                bottom: 18,
                width: 520,
                height: 750,
                overflow: 'hidden',
                borderRadius: portraitRadius,
                boxShadow: '0 28px 90px rgba(0,0,0,.32)',
              }}
            >
              <SafeImg
                src={getValue(values, 'i-photo')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: appearance.portraitMonochrome ? 'grayscale(1) contrast(1.12)' : 'contrast(1.04) saturate(1.08)',
                  mixBlendMode: appearance.portraitMonochrome ? 'luminosity' : 'normal',
                  opacity: 0.88,
                  transform: `translate(${appearance.portraitX}px, ${appearance.portraitY}px) scale(${appearance.portraitScale})`,
                  transformOrigin: 'center top',
                }}
              />
            </div>
            {hasSpeakerMeta ? (
              <div
                style={{
                  position: 'absolute',
                  left: 62,
                  bottom: 58,
                  minWidth: 330,
                  background: 'rgba(0,0,0,.28)',
                  border: '1px solid rgba(255,255,255,.22)',
                  backdropFilter: 'blur(10px)',
                  padding: '18px 24px',
                  borderRadius: 18,
                  boxShadow: '0 18px 44px rgba(0,0,0,.20)',
                  opacity: fade(frame, portraitBadgeStart, paceFrame(12)),
                  transform: `translateY(${shift(frame, portraitBadgeStart, paceFrame(12), 16)}px)`,
                }}
              >
                {speakerName ? (
                  <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 30), fontWeight: 900 })}>{speakerName}</div>
                ) : null}
                {speakerRole ? (
                  <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 19), color: 'rgba(255,255,255,.74)', fontWeight: 700, marginTop: speakerName ? 6 : 0 })}>{speakerRole}</div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          right: quoteAreaRight,
          top: 100,
          width: quoteAreaWidth,
          minHeight: 780,
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 180,
            top: 10,
            fontFamily: FONT_SERIF,
            fontSize: 2040,
            fontWeight: 900,
            lineHeight: 0.8,
            color: palette.text,
            opacity: 0.03,
            transform: `translate(${Math.sin(frame / 140) * -110}px, ${Math.cos(frame / 100) * 40}px) rotate(${Math.sin(frame / 170) * 2}deg) scale(${1 + Math.sin(frame / 160) * 0.03})`,
          }}
        >
          ”
        </div>
        {appearance.showQuoteMark ? (
          <div
            style={{
              position: 'absolute',
              right: 115,
              top: -8,
              fontFamily: FONT_SERIF,
              fontSize: 250,
              fontWeight: 900,
              lineHeight: 0.75,
              color: palette.text,
              opacity: fade(frame, quoteMarkRevealStart, paceFrame(16)),
              transform: `scale(${interpolate(frame, [quoteMarkRevealStart, paceFrame(26)], [0.75, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: overshootEase,
              })}) translateY(${shift(frame, quoteMarkRevealStart, paceFrame(16), -16)}px)`,
              textShadow: '0 22px 60px rgba(0,0,0,.14)',
            }}
          >
            ”
          </div>
        ) : null}

        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 90,
            width: 560,
            zIndex: 2,
          }}
        >
          <div
            style={{
              opacity: fade(frame, titleMainRevealStart, paceFrame(14)),
              transform: `translateY(${shift(frame, titleMainRevealStart, paceFrame(14), 22)}px)`,
            }}
          >
            <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 60), lineHeight: 1.14, fontWeight: 900, letterSpacing: 0, whiteSpace: 'nowrap' })}>{getValue(values, 'i-title-main', 'العنوان الرئيسي')}</div>
          </div>
          <div
            style={rtlTextStyle({
              fontSize: scaleFont(appearance, 34),
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.25,
              marginTop: 18,
              whiteSpace: 'nowrap',
              position: 'relative',
              display: 'inline-block',
              opacity: fade(frame, titleSubRevealStart, paceFrame(12)),
              transform: `translateY(${shift(frame, titleSubRevealStart, paceFrame(12), 18)}px)`,
            })}
          >
            {getValue(values, 'i-title-sub', 'العنوان الفرعي')}
            <span
              style={{
                position: 'absolute',
                right: 0,
                bottom: -9,
                width: '68%',
                height: 5,
                background: 'rgba(255,255,255,.28)',
                transformOrigin: 'right',
                transform: `scaleX(${fade(frame, subtitleUnderlineStart, paceFrame(12))})`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: -6,
            top: 248,
            width: 80,
            height: 470,
            opacity: fade(frame, timelineRevealStart, paceFrame(10)),
            zIndex: 4,
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 34,
              top: timelineLineTop,
              width: 0,
              height: timelineLineHeight * fade(groupFrame, timelineNodeBaseDelay, timelineDrawFrames),
              borderRight: '3px dashed rgba(255,255,255,.72)',
            }}
          />
          {timelineTopPositions.map((top, index) => (
            <div
              key={`node-${groupIndex}-${index}`}
              style={{
                position: 'absolute',
                right: 20,
                top,
                width: 30,
                height: 30,
                border: '5px solid rgba(255,255,255,.92)',
                background: 'transparent',
                transform: `scale(${interpolate(groupFrame, [timelineNodeBaseDelay + paceFrame(index * 4), timelineNodeBaseDelay + paceFrame(8 + (index * 4))], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: overshootEase,
                })})`,
                boxShadow: `0 0 0 ${interpolate(groupFrame, [timelineNodeBaseDelay + paceFrame(index * 4), timelineNodeBaseDelay + paceFrame(8 + (index * 4))], [0, 10], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}px ${palette.accent}22`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 6,
                  background: palette.accent,
                  opacity: 0.92,
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 110,
            top: 300,
            width: pointsWidth,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: quoteGap,
            opacity: groupOpacity,
            transform: `translateY(${groupShift}px)`,
          }}
        >
          {currentGroup.items.map((item, index) => {
            const pointDelay = pointsRevealBaseDelay + paceFrame(index * 5);
            const pointOpacity = fade(groupFrame, pointDelay, paceFrame(10));
            const pointTranslate = shift(groupFrame, pointDelay, paceFrame(10), 18);
            return (
              <div
                key={`${groupIndex}-${index}-${item.text.slice(0, 18)}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 18,
                  alignItems: 'flex-start',
                  opacity: pointOpacity,
                  transform: `translateY(${pointTranslate}px)`,
                }}
              >
                <div
                  style={{
                    width: 18,
                    minWidth: 18,
                    height: 18,
                    background: palette.accent,
                    marginTop: Math.max(16, pointFontSize * 0.32),
                    boxShadow: `0 0 22px ${palette.accent}88`,
                  }}
                />
                <div
                  style={rtlTextStyle({
                    flex: 1,
                    fontSize: pointFontSize,
                    fontWeight: 900,
                    lineHeight: 1.22,
                    letterSpacing: 0,
                    color: index % 2 === 0 ? palette.text : 'rgba(255,255,255,.82)',
                    textShadow: '0 15px 38px rgba(0,0,0,.12)',
                  })}
                >
                  {renderHighlightedPoint(item.text, palette.accent)}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 110,
            top: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 22px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,.25)',
            background: 'rgba(0,0,0,.13)',
            fontSize: scaleFont(appearance, 24),
            fontWeight: 800,
            color: 'rgba(255,255,255,.82)',
            opacity: fade(frame, sourceRevealStart, paceFrame(14)),
            transform: `translateY(${shift(frame, sourceRevealStart, paceFrame(14), 12)}px)`,
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              background: palette.accent,
              boxShadow: `0 0 22px ${palette.accent}`,
            }}
          />
          <span>{getValue(values, 'i-source', 'المصدر')}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const cardImgs = ['i-t1-img', 'i-t2-img', 'i-t3-img'];
const cardTags = ['#تكنولوجيا', '#اقتصاد', '#رياضة'];
const cardMetas = [
  { count: '١.٢ مليون تفاعل', dir: '▲ صاعد' },
  { count: '٨٥٠ ألف تفاعل', dir: '▲ صاعد' },
  { count: '٤٢٠ ألف تفاعل', dir: '▼ مستقر' },
];

const TopTrendsTemplate: React.FC<{ values: Record<string, string>; appearance: TemplateAppearance }> = ({
  values,
  appearance,
}) => {
  const frame = useCurrentFrame();
  const palette = getTemplatePalette('top-trends', appearance);

  return (
    <AbsoluteFill style={{ ...stageStyle, background: `radial-gradient(circle at 30% 10%, ${palette.panel} 0%, ${palette.background} 50%, #05051a 100%)`, color: palette.text, fontFamily: FONT_RTL_PRIMARY }}>
      <div
        style={{
          ...absFill(),
          backgroundImage: `linear-gradient(${palette.panel} 1px, transparent 1px), linear-gradient(90deg, ${palette.panel} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.15,
          transform: `perspective(500px) rotateX(60deg) translateY(${interpolate(frame % 500, [0, 500], [0, 50])}px) scale(3)`,
        }}
      />
      <div style={{ position: 'absolute', top: 60, right: 80, opacity: fade(frame, 5, 16), transform: `translateX(${shift(frame, 5, 16, 50)}px)` }}>
        <div style={{ background: palette.accentAlt, padding: '8px 28px', fontWeight: 900, fontSize: scaleFont(appearance, 22), letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block', borderRadius: 4 }}>مؤشرات البحث</div>
        <h1 style={{ fontSize: scaleFont(appearance, 68), fontWeight: 900, lineHeight: 1.1, marginTop: 8, textShadow: '0 10px 40px rgba(0,0,0,0.9)' }}>أبرز التريندات <span style={{ color: palette.accent }}>اليوم</span></h1>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 60, right: 60, display: 'flex', gap: 30 }}>
        {[getValue(values, 'i-t1'), getValue(values, 'i-t2'), getValue(values, 'i-t3')].map((title, index) => {
          const imgUrl = getValue(values, cardImgs[index]);
          return (
          <div
            key={index}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${palette.panel}d9 0%, ${palette.background}e6 100%)`,
              border: `1px solid ${palette.accent}33`,
              borderRadius: 12,
              padding: 28,
              backdropFilter: 'blur(8px)',
              position: 'relative',
              opacity: fade(frame, 15 + index * 5, 14),
              transform: `translateY(${shift(frame, 15 + index * 5, 14, 80)}px)`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%', height: 180, borderRadius: 8, marginBottom: 16, background: `linear-gradient(135deg, ${palette.panel}, ${palette.background})`, overflow: 'hidden' }}>
              {imgUrl ? <SafeImg src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 90), fontWeight: 700, color: 'transparent', WebkitTextStroke: `2px ${palette.accent}26`, position: 'absolute', top: 12, left: 16, lineHeight: 1 }}>
              {`0${index + 1}`}
            </div>
            <span style={{ color: palette.accent, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 16), marginBottom: 10, display: 'block' }}>
              {cardTags[index]}
            </span>
            <div style={rtlTextStyle({ fontSize: scaleFont(appearance, 34), fontWeight: 900, lineHeight: 1.3, marginBottom: 12, flex: 1 })}>{title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: palette.muted, fontSize: scaleFont(appearance, 16), borderTop: `1px solid ${palette.accent}1a`, paddingTop: 12, marginTop: 8 }}>
              <span>{cardMetas[index].count}</span>
              <span>{cardMetas[index].dir}</span>
            </div>
          </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const QawalebTemplateRenderer: React.FC<{
  templateId: QawalebTemplateId;
  values: Record<string, string>;
  appearance?: Partial<TemplateAppearance>;
}> = ({ templateId, values, appearance }) => {
  const resolvedAppearance = resolveAppearance(appearance);

  switch (templateId) {
    case 'points-broadcast':
      return <PointsBroadcastTemplate values={values} appearance={resolvedAppearance} />;
    case 'breaking-bold':
      return <BreakingBoldTemplate values={values} appearance={resolvedAppearance} />;
    case 'editorial-elegant':
      return <EditorialElegantTemplate values={values} appearance={resolvedAppearance} />;
    case 'cinematic-dark':
      return <CinematicDarkTemplate values={values} appearance={resolvedAppearance} />;
    case 'sports-energy':
      return <SportsEnergyTemplate values={values} appearance={resolvedAppearance} />;
    case 'documentary-minimal':
      return <DocumentaryMinimalTemplate values={values} appearance={resolvedAppearance} />;
    case 'x-animated':
      return <XAnimatedTemplate values={values} appearance={resolvedAppearance} />;
    case 'facebook-animated':
      return <FacebookAnimatedTemplate values={values} appearance={resolvedAppearance} />;
    case 'telegram-animated':
      return <TelegramAnimatedTemplate values={values} appearance={resolvedAppearance} />;
    case 'instagram-animated':
      return <InstagramAnimatedTemplate values={values} appearance={resolvedAppearance} />;
    case 'top-trends':
      return <TopTrendsTemplate values={values} appearance={resolvedAppearance} />;
    default:
      return <PointsBroadcastTemplate values={values} appearance={resolvedAppearance} />;
  }
};

export const QawalebAudioTracks = AudioTracks;

