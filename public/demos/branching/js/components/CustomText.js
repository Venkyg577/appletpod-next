/**
 * CustomText – renders text with optional font, color, size (and other style props).
 * content: string | { text, font?, color?, size?, ... } | Array<{ text, font?, color?, size?, ... }>
 * Composes multiple text objects into a single element; each segment keeps its own styling.
 */
(function (global) {
  const React = global.React;

  function styleFromItem(item) {
    if (!item || typeof item !== 'object') return undefined;
    const style = {
      fontFamily: item.font || undefined,
      color: item.color || undefined,
      fontSize: item.size || undefined,
      fontWeight: item.fontWeight || undefined,
      fontStyle: item.fontStyle || undefined,
      textDecoration: item.textDecoration || undefined,
      lineHeight: item.lineHeight || undefined
    };
    const clean = {};
    Object.keys(style).forEach(function (k) {
      if (style[k] != null) clean[k] = style[k];
    });
    return Object.keys(clean).length ? clean : undefined;
  }

  function textFromItem(item) {
    if (item == null) return '';
    if (typeof item === 'string') return item;
    return item.text != null ? String(item.text) : '';
  }

  function CustomText(props) {
    const { content, tagName = 'span', className = '' } = props;

    if (content == null) {
      return React.createElement(tagName, { className: 'custom-text ' + className });
    }

    if (typeof content === 'string') {
      return React.createElement(
        tagName,
        { className: 'custom-text ' + className },
        content
      );
    }

    // Array of text objects: compose into single text with per-segment styling
    if (Array.isArray(content)) {
      const parts = content.map(function (item, idx) {
        const text = textFromItem(item);
        if (text === '') return null;
        const style = styleFromItem(item);
        return React.createElement(
          'span',
          {
            key: 'seg-' + idx,
            className: 'custom-text-segment',
            style: style
          },
          text
        );
      }).filter(Boolean);
      if (parts.length === 0) {
        return React.createElement(tagName, { className: 'custom-text ' + className });
      }
      return React.createElement(
        tagName,
        { className: 'custom-text custom-text-composed ' + className },
        parts
      );
    }

    // Single object
    const text = textFromItem(content);
    const style = styleFromItem(content);
    return React.createElement(
      tagName,
      {
        className: 'custom-text ' + className,
        style: style
      },
      text
    );
  }

  /**
   * Normalize content to array of objects for consistent use.
   * Returns [{ text, font?, color?, size? }, ...].
   */
  function normalizeText(content) {
    if (content == null) return [{ text: '' }];
    if (typeof content === 'string') return [{ text: content }];
    if (Array.isArray(content)) {
      return content.map(function (item) {
        if (item == null) return { text: '' };
        if (typeof item === 'string') return { text: item };
        return {
          text: item.text != null ? String(item.text) : '',
          font: item.font,
          color: item.color,
          size: item.size,
          fontWeight: item.fontWeight,
          fontStyle: item.fontStyle,
          textDecoration: item.textDecoration,
          lineHeight: item.lineHeight
        };
      });
    }
    return [{
      text: content.text != null ? String(content.text) : '',
      font: content.font,
      color: content.color,
      size: content.size,
      fontWeight: content.fontWeight,
      fontStyle: content.fontStyle,
      textDecoration: content.textDecoration,
      lineHeight: content.lineHeight
    }];
  }

  /**
   * Get a single display string from content (string | object | array of objects).
   * Used for aria-label, slider label, and "has text" checks.
   */
  function getDisplayString(content) {
    if (content == null) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map(function (s) {
        return typeof s === 'string' ? s : (s && s.text != null ? String(s.text) : '');
      }).join('');
    }
    return content.text != null ? String(content.text) : '';
  }

  global.CustomText = CustomText;
  global.normalizeText = normalizeText;
  global.getDisplayString = getDisplayString;
})(typeof window !== 'undefined' ? window : this);
