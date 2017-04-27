'use strict';
(function () {
  var showElement = window.galleryUtils.showElement;
  var uploadForm = window.galleryUtils.uploadForm;
  var hideElement = window.galleryUtils.hideElement;
  var isElementHidden = window.galleryUtils.isElementHidden;
  var picElement = document.querySelector('.filter-image-preview');
  window.filterName = '';

  hideElement(uploadForm);

  showElement(document.querySelector('.upload-form'));

  document.querySelector('#upload-file').addEventListener('change', function () {
    setFilterLevel(91);
    applyFilter(oldFilter, 'none');
    showElement(uploadForm);
    document.querySelector('.filter-image-preview').style.cssText = 'transform: scale(0.55)';
  });

  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    hideElement(uploadForm);
    document.querySelector('.upload-form').reset();
  });

  document.onkeydown = function (evt) {
    if (evt.keyCode === 27 && !isElementHidden(uploadForm) && document.querySelector('.upload-form-description') !== document.activeElement) {
      applyFilter('none', oldFilter);
      hideElement(uploadForm);
      document.querySelector('.upload-form').reset();
    }
    if (evt.code === 13 && document.querySelector('.upload-form-cancel') === document.activeElement) {
      applyFilter('none', oldFilter);
      hideElement(uploadForm);
      document.querySelector('.upload-form').reset();
    }
  };

  var scaleElement = document.querySelector('.upload-resize-controls');
  scaleElement.addEventListener('click', function (evt) {
    function setScale(val) {
      document.querySelector('.upload-resize-controls-value').value = val + '%';
      var stringVal = 'transform: scale(' + val / 100 + ')';
      document.querySelector('.filter-image-preview').style.cssText = stringVal;
    }
    window.initializeScale(evt.target, setScale);

  });


  var applyFilter = function (oldFilter, newFilter) {
    picElement.classList.remove('filter-' + oldFilter);  // сделать нормально
    if (newFilter === 'none') {
      picElement.style.filter = '';
    }
    picElement.classList.add('filter-' + newFilter);
  };
  hideElement(document.querySelector('.upload-filter-level'));
  /*
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
 //   document.querySelector('.filter-image-preview').classList.add('filter-' + filterName);
  }
*/
  var oldFilter;
  document.querySelector('.upload-filter-controls').addEventListener('click', function (evt) {
    if (evt.target.name === 'upload-filter') {
      var filterSelected = evt.target;
      oldFilter = window.initializeFilters(filterSelected, applyFilter, oldFilter);
      var defaultFilterLevel = document.querySelector('.upload-filter-level-line').offsetWidth * 0.2;
      setFilterLevel(defaultFilterLevel);
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
    switch (oldFilter) {
      case 'chrome':
        stringLevel = 'grayscale(' + k + ')';
        break;
      case 'sepia':
        stringLevel = 'sepia(' + k + ')';
        break;
      case 'marvin':
        stringLevel = 'invert(' + k * 100 + '%)';
        break;
      case 'phobos':
        stringLevel = 'blur(' + k * 3 + 'px)';
        break;
      case 'heat':
        stringLevel = 'brightness(' + k * 3 + ')';
        break;
    }
    applyLevel(stringLevel);
  }

  handler.addEventListener('mousedown', function (evt) {   // весь код ползунка перенести в iniatalize-filters
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
