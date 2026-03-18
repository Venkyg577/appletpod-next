// Play assets/click.mp3 for slider snap and restart
(function (global) {
  var clickAudio = null;
  var clickSrc = 'assets/click.mp3';

  function playClickMp3() {
    try {
      if (!clickAudio) {
        clickAudio = new Audio(clickSrc);
      }
      clickAudio.currentTime = 0;
      clickAudio.volume = 1;
      clickAudio.play().catch(function () {});
    } catch (e) {}
  }

  global.playClickMp3 = playClickMp3;
})(typeof window !== 'undefined' ? window : this);
