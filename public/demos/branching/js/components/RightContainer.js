/**
 * RightContainer – page-specific image(s) and text from data (text/label: string or { text, font, color, size })
 */
(function (global) {
  const React = global.React;
  const CustomText = global.CustomText;

  function getLabelDisplay(label) {
    if (label == null) return '';
    if (typeof label === 'string') return label;
    if (Array.isArray(label)) {
      return label.map(function (s) {
        return typeof s === 'string' ? s : (s && s.text != null ? String(s.text) : '');
      }).join('');
    }
    return label.text != null ? String(label.text) : '';
  }
  const getDisplayString = global.getDisplayString || getLabelDisplay;

  function RightContainer(props) {
    const { right } = props;
    if (!right) return React.createElement('div', { className: 'right-container' });

    const topText = right.text || (right.texts && right.texts[0]);
    const hasTopText = getDisplayString(topText) !== '';

    // Support both a single image string and an array of { label, image }.
    let imageItems = [];
    if (Array.isArray(right.image)) {
      imageItems = right.image;
    } else if (right.image) {
      imageItems = [{ label: '', image: right.image }];
    } else if (Array.isArray(right.images)) {
      imageItems = right.images;
    }

    // Key that changes when page content changes so fade-in runs on every page change
    const contentKey = getDisplayString(topText) + (imageItems.length ? imageItems.map(function (i) { return i && i.image || ''; }).join(',') : '');

    const content = React.createElement(
      'div',
      { className: 'right-content-animated', key: contentKey },
      hasTopText
        ? React.createElement(
            'div',
            { className: 'right-top-text page-text' },
            CustomText ? React.createElement(CustomText, { content: topText, tagName: 'span' }) : getLabelDisplay(topText)
          )
        : null,
      imageItems.length
        ? React.createElement(
            'div',
            { className: 'right-images-row' },
            imageItems.map(function (item, idx) {
              if (!item || !item.image) return null;
              const labelContent = item.label;
              const hasLabel = getLabelDisplay(labelContent) !== '';
              return React.createElement(
                'div',
                { className: 'right-image-block', key: 'img-' + idx },
                React.createElement('img', {
                  className: 'page-image',
                  src: item.image,
                  alt: getLabelDisplay(labelContent)
                }),
                hasLabel
                  ? React.createElement(
                      'div',
                      { className: 'page-image-label' },
                      CustomText ? React.createElement(CustomText, { content: labelContent, tagName: 'span' }) : getLabelDisplay(labelContent)
                    )
                  : null
              );
            })
          )
        : null
    );

    return React.createElement(
      'div',
      { className: 'right-container' },
      content
    );
  }

  global.RightContainer = RightContainer;
})(typeof window !== 'undefined' ? window : this);
