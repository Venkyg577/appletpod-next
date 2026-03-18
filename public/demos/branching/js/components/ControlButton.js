/**
 * ControlButton – play button for animation segment (frameStart -> frameEnd)
 */
(function (global) {
  const React = global.React;

  function ControlButton(props) {
    const { label = 'Play', onClick } = props;
    return React.createElement(
      'div',
      { className: 'control-button' },
      React.createElement(
        'div',
        { className: 'btn-wrapper' },
        React.createElement('button', {
          type: 'button',
          className: 'btn',
          onClick: onClick
        }, label)
      )
    );
  }

  global.ControlButton = ControlButton;
})(typeof window !== 'undefined' ? window : this);
