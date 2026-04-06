function Battery(props){
  var h = window.MiniReact.h;
  var label = props.label || '1.5V';
  var w = props.width || 80;
  var ht = props.height || 140;

  return h('svg', {
    className: 'battery-svg',
    width: String(w),
    height: String(ht),
    viewBox: '0 0 80 140',
    preserveAspectRatio: 'xMidYMid meet'
  },
    // Battery body
    h('rect', { x: '15', y: '25', width: '50', height: '100', rx: '6', fill: '#3a3a4a', stroke: '#888', 'stroke-width': '2' }),
    // Positive terminal
    h('rect', { x: '28', y: '12', width: '24', height: '16', rx: '3', fill: '#cc3333', stroke: '#991111', 'stroke-width': '1.5' }),
    // Plus sign
    h('text', { x: '40', y: '24', 'text-anchor': 'middle', fill: '#fff', 'font-size': '14', 'font-weight': '700' }, '+'),
    // Minus sign
    h('text', { x: '40', y: '136', 'text-anchor': 'middle', fill: '#fff', 'font-size': '16', 'font-weight': '700' }, '\u2013'),
    // Voltage label (font from .battery-svg text in main.css)
    h('text', { x: '40', y: '110', 'text-anchor': 'middle', fill: '#FFD700', 'font-size': '16', 'font-weight': '700' }, label),
    // Charge indicator lines
    h('rect', { x: '24', y: '52', width: '32', height: '4', rx: '2', fill: '#58D98B' }),
    h('rect', { x: '24', y: '60', width: '32', height: '4', rx: '2', fill: '#58D98B' }),
    h('rect', { x: '24', y: '68', width: '32', height: '4', rx: '2', fill: '#58D98B' })
  );
}
window.Battery = Battery;
