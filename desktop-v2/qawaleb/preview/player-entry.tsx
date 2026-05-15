import React, { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { QawalebComposition } from '../../../src/remotion/qawaleb/QawalebComposition';
import type { QawalebProps } from '../../../src/remotion/qawaleb/types';

type PreviewPayload = {
  inputProps: QawalebProps;
  durationInFrames: number;
};

type PreviewApi = {
  mount: (container: HTMLElement) => void;
  update: (payload: PreviewPayload) => void;
  seekTo: (frame: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    DesktopRemotionPreviewQawaleb?: PreviewApi;
  }
}

const FPS = 25;
const PLAYER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  display: 'block',
  direction: 'ltr',
};

const PLAYER_WRAP_STYLE: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
  overflow: 'hidden',
  direction: 'ltr',
  unicodeBidi: 'isolate',
};

let previewRoot: Root | null = null;
let previewContainer: HTMLElement | null = null;
let currentPlayer: PlayerRef | null = null;
let updatePreviewPayload: ((payload: PreviewPayload) => void) | null = null;

let currentPayload: PreviewPayload = {
  inputProps: {
    templateId: 'points-broadcast',
    templateValues: {},
    durationMs: 20000,
    musicUrl: null,
    musicVolume: 0.5,
    voiceoverUrl: null,
    voiceoverVolume: 1,
  },
  durationInFrames: 500,
};

const PreviewApp: React.FC<{ payload: PreviewPayload }> = ({ payload }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [previewPayload, setPreviewPayload] = useState<PreviewPayload>(payload);

  useEffect(() => {
    currentPlayer = playerRef.current;
    updatePreviewPayload = setPreviewPayload;
    return () => {
      if (currentPlayer === playerRef.current) {
        currentPlayer = null;
      }
      if (updatePreviewPayload === setPreviewPayload) {
        updatePreviewPayload = null;
      }
    };
  }, []);

  return (
    <div style={PLAYER_WRAP_STYLE}>
      <Player
        ref={playerRef}
        component={QawalebComposition}
        inputProps={previewPayload.inputProps}
        durationInFrames={Math.max(25, previewPayload.durationInFrames)}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={FPS}
        style={PLAYER_STYLE}
        controls
        autoPlay={false}
        loop
        clickToPlay
        doubleClickToFullscreen
        allowFullscreen
        showVolumeControls
        moveToBeginningWhenEnded
        initiallyShowControls
      />
    </div>
  );
};

function renderPreview() {
  if (!previewRoot || !previewContainer) return;
  previewRoot.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreviewQawaleb = {
  mount(container) {
    if (previewRoot && previewContainer === container) {
      renderPreview();
      return;
    }
    previewContainer = container;
    previewRoot = createRoot(container);
    renderPreview();
  },
  update(payload) {
    currentPayload = payload;
    if (updatePreviewPayload) {
      updatePreviewPayload(payload);
      return;
    }
    renderPreview();
  },
  seekTo(frame) {
    currentPlayer?.seekTo(frame);
  },
  play() {
    currentPlayer?.play();
  },
  pause() {
    currentPlayer?.pause();
  },
  toggle() {
    currentPlayer?.toggle();
  },
  destroy() {
    currentPlayer = null;
    updatePreviewPayload = null;
    previewRoot?.unmount();
    previewRoot = null;
    previewContainer = null;
  },
};
