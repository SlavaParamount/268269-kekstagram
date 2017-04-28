'use strict';
(function (window) {
  window.initializeScale = function (scaleElement, setScale) {
    var currentScale = parseInt(document.querySelector('.upload-resize-controls-value').value, 10);
    switch (scaleElement) {
      case document.querySelector('.upload-resize-controls-button-dec'):
        if ((currentScale) > 35) {
          currentScale -= 25;
        } else {
          currentScale = 10;
        }
        setScale(currentScale);
        break;
      case document.querySelector('.upload-resize-controls-button-inc'):
        if ((currentScale) < 75) {
          currentScale += 25;
        } else {
          currentScale = 100;
        }
        setScale(currentScale);
        break;
    }
    window.setFilterLevel(window.currentLeft);
  };

})(window);
