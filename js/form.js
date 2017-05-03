'use strict';
(function () {
  window.filterName = '';
  window.ESC_CODE = 27;
  window.ENTER_CODE = 13;
  var showElement = window.galleryUtils.showElement;
  var hideElement = window.galleryUtils.hideElement;
  var isElementHidden = window.galleryUtils.isElementHidden;
  var picElement = document.querySelector('.filter-image-preview');
  var DEFAULT_SCALE = 100;
  var form = document.querySelector('.upload-filter');
  var uploadForm = document.querySelector('.upload-overlay');
  var commentField = form.querySelector('.upload-form-description');
  var cancelButton = document.querySelector('.upload-form-cancel');
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
    setScale(DEFAULT_SCALE);
  });

  cancelButton.addEventListener('click', function () {
    hideElement(uploadForm);
    chooseFileForm.reset();
  });

  document.onkeydown = function (evt) {
    if (evt.keyCode === window.ESC_CODE && !isElementHidden(uploadForm) && commentField !== document.activeElement) {
      closeForm();
    }

    if (evt.code === window.ENTER_CODE && cancelButton === document.activeElement) {
      closeForm();
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
  var FIRST_FILTER_LEVEL = 0.2;

  document.querySelector('.upload-filter-controls').addEventListener('click', function (evt) {
    if (evt.target.name === 'upload-filter') {
      var filterSelected = evt.target;
      oldFilter = window.initializeFilters(filterSelected, applyFilter, oldFilter);
      var defaultFilterLevel = document.querySelector('.upload-filter-level-line').offsetWidth * FIRST_FILTER_LEVEL;
      window.setFilterLevel(defaultFilterLevel);
    }
  });

  var handler = document.querySelector('.upload-filter-level-pin');
  var progressLine = document.querySelector('.upload-filter-level-val');
  var LINE_MAX_WIDTH = 455;

  window.setFilterLevel = function (lineWidth) {
    handler.style.left = lineWidth + 'px';
    progressLine.style.width = lineWidth + 'px';
    var handlerLevel = lineWidth / LINE_MAX_WIDTH;
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
      if ((window.currentLeft > 0) && ((window.currentLeft) < LINE_MAX_WIDTH)) {
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

  function closeForm() {
    applyFilter('none', oldFilter);
    hideElement(uploadForm);
    chooseFileForm.reset();
    window.currentLeft = 0;
    form.reset();
  }

  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 150;

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    commentField.style.border = '';
    if ((commentField.value.length < MIN_TEXT_LENGTH) || (commentField.value.length > MAX_TEXT_LENGTH)) { // на chrome выскакивает предупреждение (благодаря атрибуту minlength), на остальных - красная рамка появляется при попытке отправки. если отслеживать input в textarea, то рамка сразу появляется, не очень комфортно для пользователя
      commentField.style.border = '2px solid #CD5C5C';
    } else {
      closeForm();
    }
  });
})();
