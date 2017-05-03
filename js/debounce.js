'use strict';
(function (window) {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  window.debounce = function (functionArg) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(functionArg, DEBOUNCE_INTERVAL);
  };
})(window);
