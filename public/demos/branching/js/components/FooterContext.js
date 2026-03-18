/**
 * FooterContext – nav left, footer text, nav right; or single button when isFooterButton
 * footerText and footerButtonName can be string or { text, font, color, size }.
 */
(function (global) {
  const React = global.React;
  const CustomText = global.CustomText;

  function getTextDisplay(t) {
    if (t == null) return '';
    if (typeof t === 'string') return t;
    if (Array.isArray(t)) {
      return t.map(function (s) {
        return typeof s === 'string' ? s : (s && s.text != null ? String(s.text) : '');
      }).join('');
    }
    return t.text != null ? String(t.text) : '';
  }

  function FooterContext(props) {
    const {
      footerText = null,
      footerButtonName = null,
      isFooterButton = false,
      onFooterButtonClick,
      onPrev,
      onNext,
      canPrev = true,
      canNext = true,
      isNavigationDisabled = false
    } = props;

    const hasFooterText = getTextDisplay(footerText) !== '';

    if (isFooterButton) {
      return React.createElement(
        'div',
        { className: 'bottom-bar footer-context footer-as-button' },
        React.createElement(
          'div',
          { className: 'footer-as-button-inner' },
          hasFooterText
            ? React.createElement(
                'div',
                { className: 'footer-as-button-text' },
                CustomText ? React.createElement(CustomText, { content: footerText, tagName: 'span' }) : getTextDisplay(footerText)
              )
            : null,
          React.createElement(
            'div',
            { className: 'btn-wrapper footer-single-btn-wrapper' },
            React.createElement('button', {
              type: 'button',
              className: 'btn footer-single-btn',
              id: 'footerSingleBtn',
              onClick: onFooterButtonClick,
              'aria-label': getTextDisplay(footerButtonName) || 'Continue'
            }, CustomText ? React.createElement(CustomText, { content: footerButtonName, tagName: 'span' }) : (getTextDisplay(footerButtonName) || 'Continue'))
          )
        )
      );
    }

    const prevWrapperClass = 'nav-btn-wrapper btn-wrapper'+ (isNavigationDisabled ? ' hidden' : '') + (!canPrev ? ' disabled' : '');
    const nextWrapperClass = 'nav-btn-wrapper btn-wrapper'+ (isNavigationDisabled ? ' hidden' : '') + (!canNext ? ' disabled' : '');

    return React.createElement(
      'div',
      { className: 'bottom-bar footer-context' },
      React.createElement(
        'div',
        { className: prevWrapperClass, id: 'prevBtnWrapper' },
        React.createElement('button', {
          type: 'button',
          className: 'btn',
          id: 'prevBtn',
          disabled: !canPrev,
          onClick: onPrev,
          'aria-label': 'Previous'
        }, '«')
      ),
      React.createElement(
        'div',
        { className: 'ins-text', id: 'insText' },
        CustomText ? React.createElement(CustomText, { content: footerText, tagName: 'span' }) : getTextDisplay(footerText)
      ),
      React.createElement(
        'div',
        { className: nextWrapperClass, id: 'nextBtnWrapper' },
        React.createElement('button', {
          type: 'button',
          className: 'btn',
          id: 'nextBtn',
          disabled: !canNext,
          onClick: onNext,
          'aria-label': 'Next'
        }, '»')
      )
    );
  }

  global.FooterContext = FooterContext;
})(typeof window !== 'undefined' ? window : this);
