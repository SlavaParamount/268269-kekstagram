'use strict';
var initializeScale = function(scaleElement, setScale){
  debugger;
  var scale = 55;
  setScale(scale);
  debugger;
    scaleElement.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
    if (scale < 76) {
      scale += 25;
      setScale(scale);
    } else {
      scale = 100;
      setScale(scale);
    }
  });

  scaleElement.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
    if (scale > 35) {
      scale -= 25;
      setScale(scale);
    } else {
      scale = 10;
      setScale(scale);
    }
  });
};