function ParallelCircuitPanel(props){
  var h = window.MiniReact.h;
  var t = props.t || function(k){ return k; };
  var bulbs = props.bulbs || []; // array of booleans (on/off)
  var onToggleBulb = props.onToggleBulb || function(){};
  var audio = window.useAudioFeedback ? window.useAudioFeedback() : { switchOn:function(){}, switchOff:function(){} };

  var brightnessPerBulb = 100;

  function handleToggle(idx){
    if (bulbs[idx]) audio.switchOff(); else audio.switchOn();
    onToggleBulb(idx);
  }

  // ---- Circuit geometry (same as reference) ----
  var circuitW = 900;
  var topRailY = 26;
  var branchStartX = 210;
  var branchEndX = 760;
  var batteryX = 52;
  var batteryY = 178;
  var batCx = batteryX + 40;

  var n = bulbs.length;
  var minBranchY = topRailY + 108;
  var branchGap = 120;
  var spaceBelowLastBranch = 100;

  var bottomRailY;
  var branchYs = [];
  if (n === 1) {
    var soloMidOffset = 125;
    branchYs.push(Math.round(minBranchY + soloMidOffset));
    bottomRailY = minBranchY + soloMidOffset * 2 + spaceBelowLastBranch;
  } else {
    var lastBranchY = minBranchY + (n - 1) * branchGap;
    bottomRailY = lastBranchY + spaceBelowLastBranch;
    for (var bi = 0; bi < n; bi++) {
      branchYs.push(Math.round(minBranchY + bi * branchGap));
    }
  }

  var svgH = bottomRailY + 48;
  var bulbX = Math.round((branchStartX + branchEndX) / 2);
  var switchTrackLeft = branchStartX + 56;
  var switchTrackW = 48;
  var switchTrackCx = switchTrackLeft + switchTrackW / 2;
  var bulbHalf = 35;

  var wireElements = [];
  var flowElements = [];
  var anyOn = bulbs.some(function(b){ return b; });

  // Main rail wires
  var railLines = [
    { x1: batCx, y1: batteryY, x2: batCx, y2: topRailY, k: 'bat-top-vert' },
    { x1: batCx, y1: topRailY, x2: branchStartX, y2: topRailY, k: 'to-left-rail-top' },
    { x1: batCx, y1: batteryY + 140, x2: batCx, y2: bottomRailY, k: 'bat-bot-vert' },
    { x1: batCx, y1: bottomRailY, x2: branchStartX, y2: bottomRailY, k: 'to-left-rail-bot' },
    { x1: branchStartX, y1: topRailY, x2: branchStartX, y2: bottomRailY, k: 'rail-left' },
    { x1: branchEndX, y1: topRailY, x2: branchEndX, y2: bottomRailY, k: 'rail-right' },
    { x1: branchStartX, y1: topRailY, x2: branchEndX, y2: topRailY, k: 'rail-top-span' },
    { x1: branchStartX, y1: bottomRailY, x2: branchEndX, y2: bottomRailY, k: 'rail-bot-span' }
  ];
  railLines.forEach(function(l){
    wireElements.push(h('line', { x1: String(l.x1), y1: String(l.y1), x2: String(l.x2), y2: String(l.y2), stroke: '#FFD700', 'stroke-width': '5', key: l.k }));
    if (anyOn) {
      flowElements.push(h('line', { x1: String(l.x1), y1: String(l.y1), x2: String(l.x2), y2: String(l.y2), className: 'wire-flow', 'stroke-width': '5', key: 'f-' + l.k }));
    }
  });

  // Branch wires, switches, bulbs
  var branchElements = [];
  bulbs.forEach(function(isOn, idx){
    var by = branchYs[idx];
    var strokeOn = isOn ? '#FFD700' : '#555';
    var swEnd = switchTrackLeft + switchTrackW;

    wireElements.push(h('line', { x1: String(branchStartX), y1: String(by), x2: String(swEnd), y2: String(by), stroke: strokeOn, 'stroke-width': '4', key: 'bw-l-' + idx }));
    wireElements.push(h('line', { x1: String(swEnd), y1: String(by), x2: String(bulbX - bulbHalf), y2: String(by), stroke: strokeOn, 'stroke-width': '4', key: 'bw-m-' + idx }));
    wireElements.push(h('line', { x1: String(bulbX + bulbHalf), y1: String(by), x2: String(branchEndX), y2: String(by), stroke: strokeOn, 'stroke-width': '4', key: 'bw-r-' + idx }));
    if (isOn) {
      flowElements.push(h('line', { x1: String(branchStartX), y1: String(by), x2: String(swEnd), y2: String(by), className: 'wire-flow', 'stroke-width': '4', key: 'fb-l-' + idx }));
      flowElements.push(h('line', { x1: String(swEnd), y1: String(by), x2: String(bulbX - bulbHalf), y2: String(by), className: 'wire-flow', 'stroke-width': '4', key: 'fb-m-' + idx }));
      flowElements.push(h('line', { x1: String(bulbX + bulbHalf), y1: String(by), x2: String(branchEndX), y2: String(by), className: 'wire-flow', 'stroke-width': '4', key: 'fb-r-' + idx }));
    }

    branchElements.push(
      h('div', {
        className: 'circuit-overlay-item parallel-branch-bulb',
        style: {
          position: 'absolute',
          left: bulbX + 'px',
          top: (by - 30) + 'px',
          transform: 'translate(-50%, -50%)'
        },
        key: 'bulb-' + idx
      },
        h(window.CircuitBulb, {
          brightness: brightnessPerBulb,
          isOn: isOn,
          size: 70,
          showPercent: true,
          percentAbove: true
        })
      )
    );
  });

  // Scale factor to fit panel
  var scaleFactor = 0.78;
  var scaledW = Math.round(circuitW * scaleFactor);
  var scaledH = Math.round(svgH * scaleFactor);

  return h('div', { className: 'circuit-panel circuit-panel--parallel' },
    h('h3', { className: 'panel-title' }, t('content-ui.dialogs.parallel_title')),
    h('div', { className: 'circuit-diagram-container', style: { width: scaledW + 'px', height: scaledH + 'px', overflow: 'visible' } },
      h('div', {
        className: 'circuit-scale-wrapper',
        style: {
          width: circuitW + 'px',
          height: svgH + 'px',
          transform: 'scale(' + scaleFactor + ')',
          transformOrigin: 'top left',
          position: 'relative'
        }
      },
        h('svg', { width: String(circuitW), height: String(svgH), viewBox: '0 0 ' + circuitW + ' ' + svgH, style: { position: 'absolute', top: '0', left: '0', overflow: 'visible' } },
          wireElements,
          flowElements
        ),
        h('div', {
          style: { position: 'absolute', left: batteryX + 'px', top: batteryY + 'px' }
        }, h(window.Battery, { label: t('content-ui.labels.voltage'), width: 80, height: 140 })),
        branchElements
      )
    )
  );
}
window.ParallelCircuitPanel = ParallelCircuitPanel;
