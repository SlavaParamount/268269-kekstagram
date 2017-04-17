'use strict';
(function () {
  var hiddenClass = window.galleryUtils.hiddenClass;
  var showElement = window.galleryUtils.showElement;
  var uploadForm = window.galleryUtils.uploadForm;
  var hideElement = window.galleryUtils.hideElement;
  var isElementHidden = window.galleryUtils.isElementHidden;

  document.querySelector('#upload-select-image').classList.remove(hiddenClass);

  document.querySelector('#upload-file').addEventListener('change', function () {
    showElement(uploadForm);
  });

  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    hideElement(uploadForm);
  });

  document.onkeydown = function (evt) {
    if (evt.keyCode === 27 && !isElementHidden(uploadForm) && document.querySelector('.upload-form-description') !== document.activeElement) {
      hideElement(uploadForm);
    }
    if (evt.code === 13 && document.querySelector('.upload-form-cancel') === document.activeElement) {
      hideElement(uploadForm);
    }
  };

  var scale = 55;
  setScale(scale);

  function setScale(val) {
    document.querySelector('.upload-resize-controls-value').value = val + '%';
    var stringVal = 'transform: scale(' + val / 100 + ')';
    document.querySelector('.filter-image-preview').style.cssText = stringVal;
  }

  var filterName;
  var progressBar = document.querySelector('.upload-filter-level');
  hideElement(progressBar);

  function setFilter(filter) {
    if (filterName) {
      document.querySelector('.filter-image-preview').classList.remove('filter-' + filterName);
    }
    if (filter.value === 'none') {
      document.querySelector('.filter-image-preview').style.filter = '';
    }
    filterName = filter.value;
    setFilterLevel(91);
    if (filterName === 'none') {
      hideElement(handler);
      hideElement(progressBar);
      setFilterLevel(0);
    } else {
      if (isElementHidden(progressBar)) {
        showElement(progressBar);
        showElement(handler);
      }
    }
    document.querySelector('.filter-image-preview').classList.add('filter-' + filterName);
  }

  document.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
    if (scale < 76) {
      scale += 25;
      setScale(scale);
    } else {
      scale = 100;
      setScale(scale);
    }
  });

  document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
    if (scale > 35) {
      scale -= 25;
      setScale(scale);
    } else {
      scale = 10;
      setScale(scale);
    }
  });

  document.querySelector('.upload-filter-controls').addEventListener('click', function (evt) {
    if (evt.target.name === 'upload-filter') {
      var filterSelected = evt.target;
      setFilter(filterSelected);
    }
  });

  var handler = document.querySelector('.upload-filter-level-pin');
  var progressLine = document.querySelector('.upload-filter-level-val');

  function setFilterLevel(lineWidth) {
    handler.style.left = lineWidth + 'px';
    progressLine.style.width = lineWidth + 'px';
    var k = lineWidth / 455;
    var stringLevel;
    function applyLevel(string) {
      document.querySelector('.filter-image-preview').style.filter = string;
    }
    switch (filterName) {
      case 'chrome':
        stringLevel = 'grayscale(' + k + ')';
        applyLevel(stringLevel);
        break;
      case 'sepia':
        stringLevel = 'sepia(' + k + ')';
        applyLevel(stringLevel);
        break;
      case 'marvin':
        stringLevel = 'invert(' + k * 100 + '%)';
        applyLevel(stringLevel);
        break;
      case 'phobos':
        stringLevel = 'blur(' + k * 3 + 'px)';
        applyLevel(stringLevel);
        break;
      case 'heat':
        stringLevel = 'brightness(' + k * 3 + ')';
        applyLevel(stringLevel);
        break;
    }
  }

  handler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    document.addEventListener('mousemove', mouseMoveFunc);
    document.addEventListener('mouseup', mouseUpFunc);
    function mouseMoveFunc(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;
      var currentLeft = handler.offsetLeft - shiftX;
      if ((currentLeft > 0) && ((currentLeft) < 455)) {
        setFilterLevel(currentLeft);
      }
      startX = moveEvt.clientX;
    }


    function mouseUpFunc(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveFunc);
      document.removeEventListener('mouseup', mouseUpFunc);
    }
  });
})();
