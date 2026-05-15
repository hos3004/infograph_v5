export type QawalebTemplateId =
  | 'points-broadcast'
  | 'breaking-bold'
  | 'editorial-elegant'
  | 'cinematic-dark'
  | 'sports-energy'
  | 'documentary-minimal'
  | 'x-animated'
  | 'facebook-animated'
  | 'telegram-animated'
  | 'instagram-animated'
  | 'top-trends';

export type QawalebProps = {
  templateId: QawalebTemplateId;
  templateValues: Record<string, string>;
  frameUrl?: string | null;
  backgroundImageUrl?: string | null;
  backgroundOpacity?: number;
  backgroundBlur?: number;
  backgroundRadius?: number;
  backgroundFeather?: number;
  parallaxEnabled?: boolean;
  templateColors?: Record<string, string>;
  templateScale?: number;
  templateX?: number;
  templateY?: number;
  textFontSize?: number;
  portraitScale?: number;
  portraitX?: number;
  portraitY?: number;
  portraitMonochrome?: boolean;
  portraitSquare?: boolean;
  showQuoteMark?: boolean;
  durationMs: number;
  musicUrl?: string | null;
  musicVolume?: number;
  voiceoverUrl?: string | null;
  voiceoverVolume?: number;
};
