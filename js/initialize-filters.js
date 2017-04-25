'use strict';

var initializeFilters = function (filterElement, applyFilter) {
  applyFilter(filterElement);
  var progressBar = document.querySelector('.upload-filter-level');
  if (window.filterName === 'none') {
    galleryUtils.hideElement(progressBar);
  } else {
    galleryUtils.showElement(progressBar);
  }
};
