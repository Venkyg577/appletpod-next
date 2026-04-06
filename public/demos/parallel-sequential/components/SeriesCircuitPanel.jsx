function SeriesCircuitPanel(props){
  var h = window.MiniReact.h;
  var t = props.t || function(k){ return k; };
  var bulbCount = props.bulbCount || 2;
  var masterOn = props.masterOn !== false;
  var onToggleMaster = props.onToggleMaster || function(){};
  var audio = window.useAudioFeedback ? window.useAudioFeedback() : { switchOn:function(){}, switchOff:function(){} };

  // In series: all bulbs share voltage equally
  var brightnessPerBulb = masterOn ? Math.round(100 / bulbCount) : 0;

  function handleToggleMaster(){
    if (masterOn) audio.switchOff(); else audio.switchOn();
    onToggleMaster();
  }

  // ---- Circuit geometry (same as reference) ----
  var circuitW = 960;
  var circuitH = 500;
  var batteryX = 50;
  var batteryY = 170;
  var wireY_top = 40;
  var wireY_bottom = circuitH - 36;
  var startX = 200;
  var endX = 900;
  var batTopX = batteryX + 40;
  var bulbHalf = 35;
  var leftBound = startX + 56;
  var rightBound = endX - 56;

  var bxList = [];
  var bi;
  for (bi = 0; bi < bulbCount; bi++) {
    bxList.push(
      bulbCount === 1
        ? Math.round((leftBound + rightBound) / 2)
        : Math.round(leftBound + (bi / (bulbCount - 1)) * (rightBound - leftBound))
    );
  }

  var wireElements = [];
  var flowElements = [];
  var overlayElements = [];
  var strokeOn = masterOn ? '#FFD700' : '#555';

  // Main frame wires
  var frameLines = [
    { x1: batTopX, y1: batteryY, x2: batTopX, y2: wireY_top, k: 'w-bt' },
    { x1: batTopX, y1: wireY_top, x2: endX, y2: wireY_top, k: 'w-top' },
    { x1: batTopX, y1: batteryY + 140, x2: batTopX, y2: wireY_bottom, k: 'w-bb' },
    { x1: batTopX, y1: wireY_bottom, x2: endX, y2: wireY_bottom, k: 'w-bot' },
    { x1: endX, y1: wireY_top, x2: endX, y2: wireY_bottom, k: 'w-right' }
  ];
  frameLines.forEach(function(l){
    wireElements.push(h('line', { x1: String(l.x1), y1: String(l.y1), x2: String(l.x2), y2: String(l.y2), stroke: strokeOn, 'stroke-width': '5', key: l.k }));
    if (masterOn) {
      flowElements.push(h('line', { x1: String(l.x1), y1: String(l.y1), x2: String(l.x2), y2: String(l.y2), className: 'wire-flow', 'stroke-width': '5', key: 'f-' + l.k }));
    }
  });

  // Bottom wire segments between bulb terminals
  if (bulbCount >= 1) {
    var b0 = bxList[0];
    wireElements.push(h('line', { x1: String(startX), y1: String(wireY_bottom), x2: String(b0 - bulbHalf), y2: String(wireY_bottom), stroke: strokeOn, 'stroke-width': '4', key: 'sw-l-0' }));
    if (masterOn) {
      flowElements.push(h('line', { x1: String(startX), y1: String(wireY_bottom), x2: String(b0 - bulbHalf), y2: String(wireY_bottom), className: 'wire-flow', 'stroke-width': '4', key: 'fs-l-0' }));
    }
    for (bi = 1; bi < bulbCount; bi++) {
      wireElements.push(h('line', {
        x1: String(bxList[bi - 1] + bulbHalf),
        y1: String(wireY_bottom),
        x2: String(bxList[bi] - bulbHalf),
        y2: String(wireY_bottom),
        stroke: strokeOn,
        'stroke-width': '4',
        key: 'sw-m-' + bi
      }));
      if (masterOn) {
        flowElements.push(h('line', {
          x1: String(bxList[bi - 1] + bulbHalf),
          y1: String(wireY_bottom),
          x2: String(bxList[bi] - bulbHalf),
          y2: String(wireY_bottom),
          className: 'wire-flow',
          'stroke-width': '4',
          key: 'fs-m-' + bi
        }));
      }
    }
    var bLast = bxList[bulbCount - 1];
    wireElements.push(h('line', { x1: String(bLast + bulbHalf), y1: String(wireY_bottom), x2: String(endX), y2: String(wireY_bottom), stroke: strokeOn, 'stroke-width': '4', key: 'sw-r-end' }));
    if (masterOn) {
      flowElements.push(h('line', { x1: String(bLast + bulbHalf), y1: String(wireY_bottom), x2: String(endX), y2: String(wireY_bottom), className: 'wire-flow', 'stroke-width': '4', key: 'fs-r-end' }));
    }
  }

  // Bulb overlays
  for (bi = 0; bi < bulbCount; bi++) {
    var bx = bxList[bi];
    overlayElements.push(
      h('div', {
        className: 'circuit-overlay-item series-circuit-bulb',
        style: {
          position: 'absolute',
          left: bx + 'px',
          top: wireY_bottom + 'px',
          transform: 'translate(-50%, -50%)'
        },
        key: 'bulb-s-' + bi
      },
        h(window.CircuitBulb, {
          brightness: brightnessPerBulb,
          isOn: masterOn,
          size: 70,
          showPercent: true
        })
      )
    );
  }

  // Scale factor to fit panel
  var scaleFactor = 0.73;
  var scaledW = Math.round(circuitW * scaleFactor);
  var scaledH = Math.round(circuitH * scaleFactor);

  return h('div', { className: 'circuit-panel circuit-panel--series' },
    h('h3', { className: 'panel-title' }, t('content-ui.dialogs.series_title')),
    h('div', { className: 'circuit-diagram-container', style: { width: scaledW + 'px', height: scaledH + 'px', overflow: 'visible' } },
      h('div', {
        className: 'circuit-scale-wrapper',
        style: {
          width: circuitW + 'px',
          height: circuitH + 'px',
          transform: 'scale(' + scaleFactor + ')',
          transformOrigin: 'top left',
          position: 'relative'
        }
      },
        h('svg', { width: String(circuitW), height: String(circuitH), viewBox: '0 0 ' + circuitW + ' ' + circuitH, style: { position: 'absolute', top: '0', left: '0', overflow: 'visible' } },
          wireElements,
          flowElements
        ),
        h('div', { style: { position: 'absolute', left: batteryX + 'px', top: batteryY + 'px' } },
          h(window.Battery, { label: t('content-ui.labels.voltage'), width: 80, height: 140 })
        ),
        overlayElements
      )
    )
  );
}
window.SeriesCircuitPanel = SeriesCircuitPanel;
