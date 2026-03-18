/**
 * AnimationSlider – range input that drives Lottie frame; calls onFrameChange(value)
 */
(function (global) {
  const React = global.React;

  function AnimationSlider(props) {
    const {
      min = 0,
      max = 100,
      value = min,
      label = '',
      onFrameChange,
      markers = [],
      // Optional: called when slider snaps to a marker
      onSnap,
      restrictDrag = true,
      currentStep = 1,
      setCurrentStep,
    } = props;

    const safeMarkers = Array.isArray(markers) ? markers : [];
    const range = max - min;
    const snapThreshold = Math.abs(range) * 0.1; // 10% of the range
    const [trackWidth, setTrackWidth] = React.useState(0);
    const sliderWrapperRef = React.useRef(null);
    const lastSnapRef = React.useRef({ value: null, time: 0 });

    React.useEffect(function () {
      if (sliderWrapperRef.current && sliderWrapperRef.current.offsetWidth) {
        setTrackWidth(sliderWrapperRef.current.offsetWidth);
      }
    }, []);

 

    // Normalise markers so that:
    // - each marker has an integer value in [min, max]
    // - the CSS percentage is derived from that value
    // This keeps the visual dot and the thumb aligned to the same logical point.
    const normalizedMarkers = safeMarkers.map(function (m, idx) {
      const base = m || {};
      let pct = typeof base.percentage === 'number' ? base.percentage : 0;
      if (pct < 0) pct = 0;
      if (pct > 100) pct = 100;

      // Raw value from percentage
      const rawVal = min + (pct / 100) * range;
      // Snap to integer step (default step for <input type=\"range\"> is 1)
      const intVal = Math.round(rawVal);

     
      let pctFromVal = 0;
      if (range) {
        const fraction = (intVal - min) / range; // 0..1 along logical range
        if (trackWidth > 0) {
          const thumbWidth = 44; // px, must match CSS for slider thumb
          const usable = Math.max(trackWidth - thumbWidth, 1);
          const startPx = thumbWidth / 2;
          const posPx = startPx + fraction * usable;
          pctFromVal = (posPx / trackWidth) * 100;
        } else {
          // Fallback: simple proportional mapping
          pctFromVal = fraction * 100;
        }
      }

      return {
        markerName: base.markerName || '',
        value: intVal,
        percentage: pctFromVal,
        index: idx + 1 // 1-based index for page mapping
      };
    });

    const handleInput = function (e) {
      let val = parseInt(e.target.value, 10);
    
      if (restrictDrag && normalizedMarkers.length > 1) {
        // Allow dragging to adjacent markers: from previous to next marker
        const prevIdx = Math.max(0, currentStep - 2); // 0-based: current is currentStep-1, prev is currentStep-2
        const nextIdx = Math.min(normalizedMarkers.length - 1, currentStep); // 0-based: next is currentStep
        const segmentStart = normalizedMarkers[prevIdx];
        const segmentEnd = normalizedMarkers[nextIdx];

        if (segmentStart && segmentEnd) {
          const minAllowed = segmentStart.value;
          const maxAllowed = segmentEnd.value;

          if (val < minAllowed) val = minAllowed;
          if (val > maxAllowed) val = maxAllowed;
        }
      }
    
      if (typeof onFrameChange === 'function') {
        onFrameChange(val);
      }
    };

    const maybeSnapToMarker = function (rawVal) {
      if (!normalizedMarkers.length || !range || typeof onFrameChange !== 'function') return;

      const currentVal = Number(rawVal);
      if (!Number.isFinite(currentVal)) return;

      let bestVal = null;
      let bestMarker = null;
      let bestDist = Infinity;

      for (let i = 0; i < normalizedMarkers.length; i++) {
        const m = normalizedMarkers[i];
        const markerVal = m.value;
        const dist = Math.abs(markerVal - currentVal);
        if (dist < bestDist) {
          bestDist = dist;
          bestVal = markerVal;
          bestMarker = m;
        }
      }

      if (bestVal != null && bestDist <= snapThreshold) {

        const now = Date.now();
        const lastSnap = lastSnapRef.current;
      
        if (lastSnap.value === bestVal && (now - lastSnap.time) < 100) {
          return;
        }
      
        lastSnapRef.current = { value: bestVal, time: now };
      
        if (typeof global.playClickMp3 === 'function') global.playClickMp3();
      
        onFrameChange(bestVal);
      
        if (typeof onSnap === 'function') {
          onSnap({
            value: bestVal,
            marker: bestMarker
          });
        }
        if (typeof setCurrentStep === 'function') {
          setCurrentStep(bestMarker.index);
        }
      }
    };

    const handleRelease = function (e) {
      const rawVal = e && e.target ? e.target.value : value;
      maybeSnapToMarker(rawVal);
    };

    const markerElements = normalizedMarkers.length
      ? React.createElement(
          'div',
          { className: 'slider-snap-points' },
          normalizedMarkers.map(function (m, idx) {
            const style = { left: m.percentage + '%' };
            return React.createElement('div', {
              key: 'marker-' + idx,
              className: 'slider-snap-point slider-marker-point',
              style: style,
              title: m.markerName
            });
          })
        )
      : null;

    return React.createElement(
      'div',
      { className: 'slider-container' },
      label ? React.createElement('div', { className: 'slider-label' }, label) : null,
      React.createElement(
        'div',
        { className: 'slider-row' },
        (value == min && React.createElement('img', {
          src: 'assets/tapFinger.gif',
          alt: '',
          className: 'slider-tap-hint',
          'aria-hidden': 'true'
        })),
        React.createElement(
          'div',
          { className: 'slider-wrapper', ref: sliderWrapperRef },
          React.createElement('input', {
          type: 'range',
          className: 'slider',
          min: min,
          max: max,
          step: 1,
          value: value,
          onChange: handleInput,
          onInput: handleInput,
          onMouseUp: handleRelease,
          onTouchEnd: handleRelease,
          onPointerUp: handleRelease,
          onKeyUp: handleRelease
        }),
          markerElements
        )
      )
    );
  }

  global.AnimationSlider = AnimationSlider;
})(typeof window !== 'undefined' ? window : this);
