import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { MutabaatComposition } from '../../../src/remotion/mutabaat/MutabaatComposition';
import type { MutabaatProps } from '../../../src/remotion/mutabaat/types';

type PreviewPayload = {
  inputProps: MutabaatProps;
  durationInFrames: number;
  muted?: boolean;
};

const defaultPayload: PreviewPayload = {
  inputProps: {
    slides: [],
    overlayUrl: null,
    finalOverlayUrl: null,
    bgMusicUrl: null,
    bgMusicVolume: 0.35,
    textBottomOffset: 130,
    textFontSize: 54,
  },
  durationInFrames: 25,
};

let root: Root | null = null;
let mountedElement: HTMLElement | null = null;
let currentPayload = defaultPayload;
let currentPlayerRef: PlayerRef | null = null;

const PreviewApp: React.FC<{ payload: PreviewPayload }> = ({ payload }) => {
  const playerRef = React.useRef<PlayerRef>(null);
  React.useEffect(() => {
    currentPlayerRef = playerRef.current;
    return () => {
      if (currentPlayerRef === playerRef.current) currentPlayerRef = null;
    };
  }, []);

  return (
    <Player
      ref={playerRef}
      component={MutabaatComposition}
      inputProps={payload.inputProps}
      durationInFrames={Math.max(25, payload.durationInFrames)}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={25}
      style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
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
  );
};

function render() {
  if (!root) return;
  root.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreviewMutabaat = {
  mount(element: HTMLElement) {
    if (root && mountedElement === element) {
      render();
      return;
    }
    if (root) root.unmount();
    mountedElement = element;
    root = createRoot(element);
    render();
  },
  update(payload: PreviewPayload) {
    currentPayload = payload;
    render();
  },
  play() {
    currentPlayerRef?.play();
  },
  pause() {
    currentPlayerRef?.pause();
  },
  seekToFrame(frame: number) {
    currentPlayerRef?.seekTo(Math.max(0, Math.round(frame)));
  },
  seekTo(frame: number) {
    currentPlayerRef?.seekTo(Math.max(0, Math.round(frame)));
  },
  setMuted(muted: boolean) {
    currentPayload = { ...currentPayload, muted };
  },
  destroy() {
    if (root) root.unmount();
    root = null;
    mountedElement = null;
  },
};

declare global {
  interface Window {
    DesktopRemotionPreviewMutabaat: {
      mount: (element: HTMLElement) => void;
      update: (payload: PreviewPayload) => void;
      play: () => void;
      pause: () => void;
      seekToFrame: (frame: number) => void;
      seekTo: (frame: number) => void;
      setMuted: (muted: boolean) => void;
      destroy: () => void;
    };
  }
}
