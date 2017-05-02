'use strict';
(function (window) {
  window.initializeScale = function (scaleElement, setScale) {
    var currentScale = parseInt(document.querySelector('.upload-resize-controls-value').value, 10);
    var scaleStep = 25;
    var minScale = 25;
    var maxScale = 100;
    switch (scaleElement) {
      case document.querySelector('.upload-resize-controls-button-dec'):
        currentScale -= scaleStep;
        currentScale = Math.max(currentScale, minScale);
        setScale(currentScale);
        break;
      case document.querySelector('.upload-resize-controls-button-inc'):
        currentScale += scaleStep;
        currentScale = Math.min(currentScale, maxScale);
        setScale(currentScale);
        break;
    }

    window.setFilterLevel(window.currentLeft);
  };

})(window);
