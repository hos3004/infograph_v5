export type PersonalitiesSlideData = {
  id: string;
  mediaUrl: string;
  imageUrl?: string;
  mediaType: 'image' | 'video';
  durationMs: number;
  mediaDurationMs?: number;
  trimStartMs?: number;
  trimEndMs?: number | null;
  isMuted?: boolean;
  playbackRate?: number;
};

export type PersonalitiesCompositionProps = {
  slides: PersonalitiesSlideData[];
  mainVoiceover: string | null;
  mainVoiceoverDurationMs: number;
  voiceover?: string | null;
  voiceoverDurationMs?: number;
  music: string | null;
  musicVolume?: number;
  voiceoverVolume?: number;
  finalDurationMs: number;
  timelineDurationMs: number;
  endPage: string | null;
  endPageDurationFrames?: number;
};
