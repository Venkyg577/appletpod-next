/**
 * UpperContext – header text from current page data (string or { text, font, color, size })
 */
(function (global) {
  const React = global.React;
  const CustomText = global.CustomText;

  function UpperContext(props) {
    const content = props.text;
    return React.createElement(
      'div',
      { className: 'upper-context', id: 'upperContext' },
      CustomText ? React.createElement(CustomText, { content: content, tagName: 'span', className: 'upper-context-text' }) : (typeof content === 'object' && content && content.text != null ? content.text : content || '')
    );
  }

  global.UpperContext = UpperContext;
})(typeof window !== 'undefined' ? window : this);
