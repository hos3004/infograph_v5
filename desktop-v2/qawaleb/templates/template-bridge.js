(function () {
  const params = new URLSearchParams(window.location.search);
  const embedMode = params.get('embed') === '1';
  const controls = document.getElementById('controls') || document.querySelector('.controls');
  const viewport = document.querySelector('.viewport');
  const stage = document.getElementById('stage');

  function hideControlsInEmbedMode() {
    if (!embedMode) return;

    if (controls) {
      controls.style.display = 'none';
    }

    const style = document.createElement('style');
    style.textContent = `
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden !important;
        background: #000 !important;
      }

      body {
        cursor: default;
      }

      .controls {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function getStageBaseSize() {
    if (!stage) {
      return { width: 1920, height: 1080 };
    }

    const computed = window.getComputedStyle(stage);
    const width = parseFloat(computed.width) || stage.offsetWidth || 1920;
    const height = parseFloat(computed.height) || stage.offsetHeight || 1080;
    return { width, height };
  }

  function fitEmbeddedStage() {
    if (!embedMode || !stage) {
      return;
    }

    const { width, height } = getStageBaseSize();
    const scale = Math.min(window.innerWidth / width, window.innerHeight / height);

    if (viewport) {
      viewport.style.position = 'fixed';
      viewport.style.inset = '0';
      viewport.style.display = 'block';
      viewport.style.overflow = 'hidden';
      viewport.style.perspectiveOrigin = 'center center';
    }

    stage.style.position = 'absolute';
    stage.style.left = '50%';
    stage.style.top = '50%';
    stage.style.margin = '0';
    stage.style.transformOrigin = 'center center';
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function getAnimations() {
    if (typeof document.getAnimations !== 'function') {
      return [];
    }

    try {
      return document.getAnimations({ subtree: true });
    } catch {
      return document.getAnimations();
    }
  }

  function applyValues(values) {
    if (!values || typeof values !== 'object') {
      return;
    }

    Object.entries(values).forEach(([fieldId, value]) => {
      const control = document.getElementById(fieldId);
      if (!control || !('value' in control)) {
        return;
      }
      control.value = value ?? '';
    });
  }

  function applyEmptyFieldVisibility(values) {
    if (!values || typeof values !== 'object') return;
    Object.entries(values).forEach(([fieldId, value]) => {
      if (!fieldId.startsWith('i-')) return;
      const visualId = fieldId.slice(2);
      const visualEl = document.getElementById(visualId);
      if (!visualEl) return;
      const isEmpty = value === null || value === undefined || String(value).trim() === '';
      visualEl.style.display = isEmpty ? 'none' : '';
    });
  }

  function renderNow() {
    if (typeof window.render === 'function') {
      window.render();
    }
  }

  function restartNative() {
    if (typeof window.play === 'function') {
      window.play(true);
      return;
    }

    renderNow();
  }

  function afterAnimationsReady(callback) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback();
      });
    });
  }

  function stageAt(timeMs, playing) {
    const safeTimeMs = Math.max(0, Number(timeMs || 0));
    restartNative();
    afterAnimationsReady(() => {
      const animations = getAnimations();
      animations.forEach((animation) => {
        try {
          animation.pause();
          animation.currentTime = safeTimeMs;
          if (playing) {
            animation.play();
          }
        } catch {
          // Ignore per-animation failures.
        }
      });
    });
  }

  function setPlaying(playing) {
    const animations = getAnimations();
    animations.forEach((animation) => {
      try {
        if (playing) {
          animation.play();
        } else {
          animation.pause();
        }
      } catch {
        // Ignore per-animation failures.
      }
    });
  }

  function handleMessage(event) {
    const data = event?.data;
    if (!data || typeof data !== 'object') {
      return;
    }

    switch (data.type) {
      case 'qawaleb:update':
        applyValues(data.values);
        renderNow();
        applyEmptyFieldVisibility(data.values);
        stageAt(data.timeMs || 0, data.autoplay === true);
        break;
      case 'qawaleb:restart':
        stageAt(0, data.autoplay === true);
        break;
      case 'qawaleb:seek':
        stageAt(data.timeMs || 0, data.playing === true);
        break;
      case 'qawaleb:set-playing':
        setPlaying(data.playing === true);
        break;
      default:
        break;
    }
  }

  hideControlsInEmbedMode();
  window.addEventListener('message', handleMessage);
  window.addEventListener('resize', fitEmbeddedStage);

  renderNow();
  if (embedMode) {
    fitEmbeddedStage();
    stageAt(0, false);
  }

  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'qawaleb:ready' }, '*');
  }

  window.QAWALEB_TEMPLATE_BRIDGE = {
    applyValues,
    renderNow,
    restart: (autoplay = true) => stageAt(0, autoplay),
    seek: (timeMs, playing = false) => stageAt(timeMs, playing),
    setPlaying,
  };
})();
