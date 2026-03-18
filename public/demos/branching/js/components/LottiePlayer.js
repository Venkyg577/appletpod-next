/**
 * LottiePlayer – mounts Lottie animation in a container, controlled by frame
 */
(function (global) {
  const React = global.React;

  /**
   * Extract marker scenes from a Lottie animation instance.
   * Each marker is converted to { startFrame, endFrame } using:
   *   startFrame = marker.tm
   *   endFrame   = marker.tm + marker.dr
   */
  function buildAnimScenesFromMarkers(anim) {
    if (!anim || !Array.isArray(anim.markers)) return [];

    return anim.markers.map(function (m) {
      // Lottie markers typically expose:
      // - tm: start frame
      // - dr: duration in frames
      var start = typeof m.tm === 'number' ? m.tm : 0;
      var duration = typeof m.dr === 'number' ? m.dr : 0;
      var end = start + duration;
      return {
        startFrame: start,
        endFrame: end
      };
    });
  }

  function LottiePlayer(props) {
    const ref = React.useRef(null);
    const animRef = React.useRef(null);
   
    React.useEffect(function () {
      const container = ref.current;
      if (!container || !props.animationData) return;

      if (typeof global.lottie === 'undefined') {
        console.warn('Lottie not loaded');
        return;
      }

      const anim = global.lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: props.animationData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
      });
      animRef.current = anim;

      // When markers are available, build animScenes and expose globally.
      if (Array.isArray(anim.markers) && anim.markers.length) {
        const scenes = buildAnimScenesFromMarkers(anim);
        global.animScenes = scenes;
        global.getAnimScenes = function () {
          return scenes.slice();
        };
      }

      return function () {
        if (animRef.current) {
          animRef.current.destroy();
          animRef.current = null;
        }
      };
    }, [props.animationData]);

    React.useEffect(function () {
      const anim = animRef.current;
      if (anim && typeof props.currentFrame === 'number') {
        anim.goToAndStop(props.currentFrame, true);
      }
    }, [props.currentFrame]);

    return React.createElement('div', {
      ref: ref,
      className: 'lottie-container',
      'data-lottie': true
    });
  }

  // Expose the player component and a helper for consumers.
  global.LottiePlayer = LottiePlayer;
  global.buildAnimScenesFromMarkers = buildAnimScenesFromMarkers;
})(typeof window !== 'undefined' ? window : this);
