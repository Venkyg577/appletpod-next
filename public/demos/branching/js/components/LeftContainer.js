/**
 * LeftContainer – Lottie animation + control (slider or button) from page data
 */
(function (global) {
  const React = global.React;
  const LottiePlayer = global.LottiePlayer;
  const AnimationSlider = global.AnimationSlider;
  const ControlButton = global.ControlButton;

  function LeftContainer(props) {
    const { left, animationData, currentFrame, onFrameChange, onPlayClick, onMarkerSnap, leftTopText, currentStep, setCurrentStep } = props;
    if (!left) return React.createElement('div', { className: 'left-container' });
    const controlType = left.controlType || 'slider';
    const lottieData = animationData || (typeof global[left.lottie] !== 'undefined' ? global[left.lottie] : null);
    
    const getDisplayString = global.getDisplayString || function (c) { return c == null ? '' : (Array.isArray(c) ? c.map(function (s) { return typeof s === 'string' ? s : (s && s.text != null ? s.text : ''); }).join('') : (typeof c === 'string' ? c : (c && c.text != null ? c.text : ''))); };
    const sliderLabel = getDisplayString(left.sliderLabel);
    const control = controlType === 'slider'
      ? React.createElement(AnimationSlider, {
          min: left.frameStart,
          max: left.frameEnd,
          value: currentFrame,
          label: sliderLabel,
          onFrameChange: onFrameChange,
          markers: left.markers || [],
          onSnap: function (snapData) {
            if (
              typeof onMarkerSnap === 'function' &&
              snapData &&
              snapData.marker &&
              typeof snapData.marker.index === 'number'
            ) {
              onMarkerSnap(snapData.marker.index, snapData);
            }
          },
          currentStep: currentStep,
          setCurrentStep: setCurrentStep
        })
      : React.createElement(ControlButton, {
          label: left.buttonLabel || 'Play',
          onClick: function () {
            if (typeof onPlayClick === 'function') onPlayClick(left);
          }
        });

    const CustomText = global.CustomText;
    const hasLeftTopText = getDisplayString(leftTopText) !== '';

    return React.createElement(
      'div',
      { className: 'left-container' },
      hasLeftTopText
        ? React.createElement(
            'div',
            { className: 'left-top-text' },
            CustomText ? React.createElement(CustomText, { content: leftTopText, tagName: 'span' }) : (typeof leftTopText === 'object' && leftTopText ? leftTopText.text : leftTopText)
          )
        : null,
      React.createElement(
        'div',
        { className: 'lottie-wrapper' },
        React.createElement(LottiePlayer, {
          animationData: lottieData,
          currentFrame: currentFrame
        })
      ),
      React.createElement('div', { className: 'control-area' }, control)
    );
  }

  global.LeftContainer = LeftContainer;
})(typeof window !== 'undefined' ? window : this);
