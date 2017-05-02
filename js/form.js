'use strict';
(function () {
  var showElement = window.galleryUtils.showElement;
  var hideElement = window.galleryUtils.hideElement;
  var isElementHidden = window.galleryUtils.isElementHidden;
  var picElement = document.querySelector('.filter-image-preview');
  window.filterName = '';
  var defaultScale = 100;
  var form = document.querySelector('.upload-filter');
  var uploadForm = document.querySelector('.upload-overlay');
  var commentField = form.querySelector('.upload-form-description');
  var cancelButton = document.querySelector('.upload-form-cancel');
  window.ESC_CODE = 27;
  window.ENTER_CODE = 13;
  var chooseFileForm = document.querySelector('.upload-form');
  var filterLevel = document.querySelector('.upload-filter-level');

  hideElement(uploadForm);

  showElement(document.querySelector('.upload-form'));

  document.querySelector('#upload-file').addEventListener('change', function () {
    applyFilter(oldFilter, 'none');
    showElement(uploadForm);
    commentField.style.border = '';
    form.reset();
    hideElement(filterLevel);
    setScale(defaultScale);
  });

  cancelButton.addEventListener('click', function () {
    hideElement(uploadForm);
    chooseFileForm.reset();
  });

  document.onkeydown = function (evt) {
    if (evt.keyCode === window.ESC_CODE && !isElementHidden(uploadForm) && commentField !== document.activeElement) {
      applyFilter('none', oldFilter);
      hideElement(uploadForm);
      chooseFileForm.reset();
    }

    if (evt.code === window.ENTER_CODE && cancelButton === document.activeElement) {
      applyFilter('none', oldFilter);
      hideElement(uploadForm);
      chooseFileForm.reset();
    }
  };

  function setScale(val) {
    document.querySelector('.upload-resize-controls-value').value = val + '%';
    var stringVal = 'transform: scale(' + val / 100 + ')';
    document.querySelector('.filter-image-preview').style.cssText = stringVal;
  }

  var scaleElement = document.querySelector('.upload-resize-controls');

  scaleElement.addEventListener('click', function (evt) {
    window.initializeScale(evt.target, setScale);
  });


  var applyFilter = function (oldFilter, newFilter) {
    picElement.classList.remove('filter-' + oldFilter);  // сделать нормально
    if (newFilter === 'none') {
      picElement.style.filter = '';
    }
    picElement.classList.add('filter-' + newFilter);
  };

  hideElement(filterLevel);

  var oldFilter;

  document.querySelector('.upload-filter-controls').addEventListener('click', function (evt) {
    if (evt.target.name === 'upload-filter') {
      var filterSelected = evt.target;
      oldFilter = window.initializeFilters(filterSelected, applyFilter, oldFilter);
      var defaultFilterLevel = document.querySelector('.upload-filter-level-line').offsetWidth * 0.2;
      window.setFilterLevel(defaultFilterLevel);
    }
  });

  var handler = document.querySelector('.upload-filter-level-pin');
  var progressLine = document.querySelector('.upload-filter-level-val');
  var lineMaxWidth = 455;

  window.setFilterLevel = function (lineWidth) {
    handler.style.left = lineWidth + 'px';
    progressLine.style.width = lineWidth + 'px';
    var handlerLevel = lineWidth / lineMaxWidth;
    var stringLevel;
    function applyLevel(string) {
      document.querySelector('.filter-image-preview').style.filter = string;
    }

    switch (oldFilter) {
      case 'chrome':
        stringLevel = 'grayscale(' + handlerLevel + ')';
        break;
      case 'sepia':
        stringLevel = 'sepia(' + handlerLevel + ')';
        break;
      case 'marvin':
        stringLevel = 'invert(' + handlerLevel * 100 + '%)';
        break;
      case 'phobos':
        stringLevel = 'blur(' + handlerLevel * 3 + 'px)';
        break;
      case 'heat':
        stringLevel = 'brightness(' + handlerLevel * 3 + ')';
        break;
    }
    applyLevel(stringLevel);
  };

  handler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    function mouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;
      window.currentLeft = handler.offsetLeft - shiftX;
      if ((window.currentLeft > 0) && ((window.currentLeft) < lineMaxWidth)) {
        window.setFilterLevel(window.currentLeft);
      }
      startX = moveEvt.clientX;
    }

    function mouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    }
  });

  var minTextLength = 30;
  var maxTextLength = 150;

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if ((commentField.value.length < minTextLength) || (commentField.value.length > maxTextLength)) {
      commentField.style.border = '2px solid #CD5C5C';
    } else {
      commentField.style.border = '';
    }
  });
})();
