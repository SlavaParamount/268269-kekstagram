'use strict';
(function (window) {
  window.initializeScale = function (scaleElement, setScale) {
    var currentScale = parseInt(document.querySelector('.upload-resize-controls-value').value, 10);
    var scaleStep = 25;
    var minScale = 25;
    var maxScale = 100;
    switch (scaleElement) {
      case document.querySelector('.upload-resize-controls-button-dec'):
        if ((currentScale) > (minScale + scaleStep)) {
          currentScale -= scaleStep;
        } else {
          currentScale = minScale;
        }
        setScale(currentScale);
        break;
      case document.querySelector('.upload-resize-controls-button-inc'):
        if ((currentScale) < (maxScale - scaleStep)) {
          currentScale += scaleStep;
        } else {
          currentScale = maxScale;
        }
        setScale(currentScale);
        break;
    }

    window.setFilterLevel(window.currentLeft);
  };

})(window);
