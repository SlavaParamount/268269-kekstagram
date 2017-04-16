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

  function setFilter(filter) {
    if (filterName) {
      document.querySelector('.filter-image-preview').classList.remove('filter-' + filterName);
    }
    filterName = filter.value;
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

})();
