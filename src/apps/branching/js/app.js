/**
 * Page-based math applet – React root, state, and navigation
 * Data and getters from data.js (getPage, getData, setPage, goNext, goPrev, etc.)
 */
(function (global) {
  const React = global.React;
  const ReactDOM = global.ReactDOM;
  const UpperContext = global.UpperContext;
  const LeftContainer = global.LeftContainer;
  const RightContainer = global.RightContainer;
  const FooterContext = global.FooterContext;

  function getAnimationData() {
    var leftCfg = typeof global.getLeftConfig === 'function' ? global.getLeftConfig() : null;
    if (!leftCfg || !leftCfg.lottie) return null;
    return global[leftCfg.lottie] || null;
  }

  function App() {
    const [currentStep, setCurrentStep]= React.useState(1);
    const [pageIndex, setPageIndex] = React.useState(function () {
      return typeof global.getPageIndex === 'function' ? global.getPageIndex() : 1;
    });
    const [currentFrame, setCurrentFrame] = React.useState(function () {
      var leftCfg = typeof global.getLeftConfig === 'function' ? global.getLeftConfig() : null;
      return leftCfg ? leftCfg.frameStart : 0;
    });
    const [langKey, setLangKey] = React.useState(function () {
      return typeof global.getLanguage === 'function' ? global.getLanguage() : 'en';
    });

  

    var page = typeof global.getPage === 'function' ? global.getPage() : null;
    var totalPages = typeof global.getTotalPages === 'function' ? global.getTotalPages() : 1;

    React.useEffect(function () {
      if (typeof global.setPage === 'function') global.setPage(pageIndex);
    }, [pageIndex]);

    var upperText = page ? page.upperContext : null;
    var leftTopText = page ? page.leftTopText : null;
    var left = typeof global.getLeftConfig === 'function' ? global.getLeftConfig() : null;
    var right = page ? page.right : null;
    var footerText = page ? page.footerText : null;
    var isFooterButton = !!(page && page.isFooterButton);
    var footerButtonName = page ? page.footerButtonName : null;
    var animationData = getAnimationData();
    var canPrev = pageIndex > 1;
    var canNext = pageIndex < totalPages;
    var isNavigationDisabled = page ? page.isNavigationDisabled : false;
    var onPrev = React.useCallback(function () {
      if (typeof global.goPrev === 'function' && global.goPrev()) {
        setPageIndex(global.getPageIndex());
      }
    }, []);

    var onNext = React.useCallback(function () {
      if (typeof global.goNext === 'function' && global.goNext()) {
        setPageIndex(global.getPageIndex());
      }
    }, []);

    var onRestart = React.useCallback(function () {
      if (typeof global.playClickMp3 === 'function') global.playClickMp3();
      if (typeof global.setPage === 'function') {
        global.setPage(1);
      }
      setCurrentStep(1);
      setCurrentFrame(0);
    }, []);


    var onFrameChange = React.useCallback(function (frame) {
      setCurrentFrame(frame);
    }, []);

    var onMarkerSnap = React.useCallback(function (markerIndex) {
      var total = typeof global.getTotalPages === 'function' ? global.getTotalPages() : totalPages;
      var target = Math.max(1, Math.min(markerIndex, total));

      // Sync global data.js page index immediately so getPage()
      // reflects the snapped scene on the very next render.
      if (typeof global.setPage === 'function') {
        global.setPage(target);
      }
      setPageIndex(target);
      console.log('onMarkerSnap', markerIndex, target, pageIndex);
    }, [totalPages, pageIndex]);

    var onPlayClick = React.useCallback(function (leftConfig) {
      if (typeof global.lottie === 'undefined') return;
      // Optional: trigger play from frameStart to frameEnd; for now slider drives frame
      setCurrentFrame(leftConfig.holdFrame);
    }, []);

    return React.createElement(
      'div',
      { className: 'applet-container' },
      React.createElement(
        'div',
        { className: 'applet-frame math-applet' },
        React.createElement(UpperContext, { text: upperText }),
        React.createElement(
          'div',
          { className: 'main-section' },
          React.createElement(LeftContainer, {
            left: left,
            animationData: animationData,
            currentFrame: currentFrame,
            onFrameChange: onFrameChange,
            onPlayClick: onPlayClick,
            onMarkerSnap: onMarkerSnap,
            leftTopText: leftTopText,
            currentStep: currentStep,
            setCurrentStep: setCurrentStep
          }),
          React.createElement(RightContainer, { right: right })
        ),
        React.createElement(FooterContext, {
          footerText: footerText,
          footerButtonName: footerButtonName,
          isFooterButton: isFooterButton,
          onFooterButtonClick: onRestart,
          onPrev: onPrev,
          onNext: onNext,
          canPrev: canPrev,
          canNext: canNext,
          isNavigationDisabled: isNavigationDisabled
        })
      )
    );
  }

  var rootEl = document.getElementById('root');
  if (rootEl && React && ReactDOM) {
    ReactDOM.createRoot(rootEl).render(React.createElement(App));
  }
})(typeof window !== 'undefined' ? window : this);
