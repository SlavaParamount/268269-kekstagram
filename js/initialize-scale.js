'use strict';
(function (window) {
  window.initializeScale = function (scaleElement, setScale) {
    var currentScale = parseInt(document.querySelector('.upload-resize-controls-value').value, 10);
    var SCALE_STEP = 25;
    var MIN_SCALE = 25;
    var MAX_SCALE = 100;
    switch (scaleElement) {
      case document.querySelector('.upload-resize-controls-button-dec'):
        currentScale -= SCALE_STEP;
        currentScale = Math.max(currentScale, MIN_SCALE);
        setScale(currentScale);
        break;
      case document.querySelector('.upload-resize-controls-button-inc'):
        currentScale += SCALE_STEP;
        currentScale = Math.min(currentScale, MAX_SCALE);
        setScale(currentScale);
        break;
    }

    window.setFilterLevel(window.currentLeft);
  };

})(window);
