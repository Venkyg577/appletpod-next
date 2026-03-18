(() => {
  const lottieContainer = document.getElementById("lottie");
  const loading = document.getElementById("loading");
  const scriptEl = document.getElementById("script");
  const instructionEl = document.getElementById("instruction");
  const sizeRange = document.getElementById("sizeRange");
  const sizeVal = document.getElementById("sizeVal");

  let animation = null;
  let isPlaying = false;
  let segments = [];
  let currentEnterFrameHandler = null;
  let frameCheckInterval = null;

  const DEFAULT_LANG = (
    document.documentElement.getAttribute("lang") || "en"
  ).toLowerCase();
  const LANG =
    typeof appData !== "undefined" && appData[DEFAULT_LANG]
      ? DEFAULT_LANG
      : "en";

  // --- Render lines with {pillN} tokens into clickable buttons ---
  function renderScript() {
    const D = appData[LANG];
    instructionEl.textContent = D.ui.instruction;

    const frag = document.createDocumentFragment();
    D.lines.forEach((line) => {
      const p = document.createElement("p");
      p.className = "line";
      let html = line;
      D.pills.forEach((label, idx) => {
        const token = `{pill${idx}}`;
        if (html.includes(token)) {
          const btn =
            `<button data-pill="${idx}" class="pill pill-${idx}" type="button" aria-pressed="false">` +
            `${label}</button>`;
          html = html.replace(token, btn);
        }
      });
      p.innerHTML = html;
      frag.appendChild(p);
    });
    scriptEl.innerHTML = "";
    scriptEl.appendChild(frag);
  }
  renderScript();

  function clearActiveState() {
    document.querySelectorAll(".pill").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
  }

  function stopPlayback() {
    isPlaying = false;
    if (animation) {
      animation.stop();
    }
    if (animation && currentEnterFrameHandler) {
      animation.removeEventListener("enterFrame", currentEnterFrameHandler);
      currentEnterFrameHandler = null;
    }
    if (frameCheckInterval) {
      clearInterval(frameCheckInterval);
      frameCheckInterval = null;
    }
  }

  // ---- Size control (slider sets CSS variable) ----
  function setSpriteWidthPct(pct) {
    const clamped = Math.max(20, Math.min(120, Number(pct) || 80));
    document.documentElement.style.setProperty(
      "--sprite-width-pct",
      clamped.toString()
    );
    if (sizeVal) sizeVal.textContent = clamped + "%";
    try {
      localStorage.setItem("spriteWidthPct", String(clamped));
    } catch {}
  }

  function initSizeControl() {
    let init = 80;
    try {
      const saved = localStorage.getItem("spriteWidthPct");
      if (saved != null) init = Number(saved);
    } catch {}
    setSpriteWidthPct(init);
    if (sizeRange) {
      sizeRange.value = String(init);
      sizeRange.addEventListener("input", (e) => {
        setSpriteWidthPct(e.target.value);
      });
    }
  }

  function playSceneByIndex(idx) {
    if (!animation || typeof scenes === "undefined" || !Array.isArray(scenes)) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(idx, scenes.length - 1));
    const scene = scenes[safeIndex];
    if (!scene) return;

    // Clear any existing playback handlers
    if (currentEnterFrameHandler) {
      animation.removeEventListener("enterFrame", currentEnterFrameHandler);
      currentEnterFrameHandler = null;
    }
    if (frameCheckInterval) {
      clearInterval(frameCheckInterval);
      frameCheckInterval = null;
    }

    const totalFrames = animation.totalFrames || 0;
    const start =
      typeof scene.frameStart === "number" ? scene.frameStart : 0;
    const end =
      typeof scene.frameEnd === "number"
        ? scene.frameEnd
        : Math.max(0, totalFrames - 1);
    const hold =
      typeof scene.holdFrame === "number"
        ? scene.holdFrame
        : end;

    const clamp = (v) =>
      Math.max(0, Math.min(v, Math.max(0, totalFrames - 1)));
    const startClamped = clamp(start);
    const endClamped = clamp(end);
    const holdClamped = clamp(hold);

    animation.stop();
    animation.goToAndStop(startClamped, true);

    isPlaying = true;



    if (typeof window !== 'undefined') {
      if (safeIndex === 0) {
        // scene[0] = no sound
      } else if (safeIndex === 1) {
        // scene[1] = excited
        if (typeof playExcited === 'function') {
          playExcited();
        }
      } else if (safeIndex === 2) {
        // scene[2] = playsweep, bubble plop
        playScene5EndAudio();
        playScene1Audio();

        // Add sweeping swishing sound for scene 2
       
          // swish upward: 300Hz -> 900Hz, 0.5s, moderate volume
          playSweep(300, 900, 0.5, { volume: 0.32, type: 'sine' });
         

        setTimeout(() => {
          if (typeof playBubblePlop === 'function') {
            playBubblePlop();
          }
        }, 300);
        setTimeout(() => {
          playSweep(300, 900, 0.5, { volume: 0.32, type: 'sine' });
        }, 650);
        setTimeout(() => {
          playSweep(300, 900, 0.5, { volume: 0.32, type: 'sine' });
        }, 1000);
        setTimeout(() => {
          playSweep(300, 900, 0.5, { volume: 0.32, type: 'sine' });
        }, 1350);
        
       
      } else if (safeIndex === 3) {
        // scene[3] = 5 tones with celebration
        if (typeof playFiveTonesWithCelebration === 'function') {
          playFiveTonesWithCelebration();
        }
      } else if (safeIndex === 4) {
        // scene[4] = 5 tones with celebration (with 500ms delay)
        setTimeout(() => {
          if (typeof playFiveTonesWithCelebration === 'function') {
            playFiveTonesWithCelebration2();
          }
        }, 50);
      }
    }


    
    // If this scene is marked as a loop, keep looping between start/end
    if (scene.isLoop) {
      currentEnterFrameHandler = () => {
        if (!animation) return;
        const current = Math.round(animation.currentFrame || 0);
        if (current >= endClamped) {
          animation.goToAndStop(startClamped, true);
          if (!animation.isPlaying) {
            animation.play();
          }
        }
      };
      animation.addEventListener("enterFrame", currentEnterFrameHandler);
      animation.play();
    } else {
      // Normal one-shot scene that ends on holdFrame
      currentEnterFrameHandler = () => {
        if (!animation) return;
        const current = Math.round(animation.currentFrame || 0);
        if (current >= endClamped) {
          animation.removeEventListener("enterFrame", currentEnterFrameHandler);
          currentEnterFrameHandler = null;
          animation.stop();
          animation.goToAndStop(holdClamped, true);
          isPlaying = false;
        }
      };
      animation.addEventListener("enterFrame", currentEnterFrameHandler);
      animation.play();
    }
  }

  async function init() {
    initSizeControl();
    loading.hidden = false;

    animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
    });

    animation.addEventListener("DOMLoaded", () => {
      loading.hidden = true;
      // On load, automatically play scenes[0]
      if (typeof scenes !== "undefined" && Array.isArray(scenes) && scenes[0]) {
        playSceneByIndex(0);
      } else {
        animation.goToAndStop(0, true);
      }
    });

    animation.addEventListener("complete", () => {
      isPlaying = false;
    });

    // Delegated clicks to play scene-based Lottie segments from data.js
    scriptEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if (!btn || !animation) return;
      e.preventDefault();

      const idx = parseInt(btn.getAttribute("data-pill"), 10) || 0;

      clearActiveState();
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      stopPlayback();
      // Pills are offset by 1: pill0 -> scenes[1], pill1 -> scenes[2], etc.
      playSceneByIndex(idx + 1);
    });
  }

  // Wait until Lottie and animationData are available (covers any script load order)
  function bootstrap() {
    if (!lottieContainer) {
      console.warn("Lottie container element not found.");
      return;
    }
    if (typeof window.lottie === "undefined" || typeof window.animationData === "undefined") {
      // Try again shortly until both dependencies are ready
      setTimeout(bootstrap, 50);
      return;
    }
    init();
  }

  bootstrap();
})();
