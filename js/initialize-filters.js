'use strict';

var initializeFilters = function (filterElement, applyFilter, oldFilter) {
  var filterSelected = filterElement.value; 
  applyFilter(oldFilter, filterSelected);
  var progressBar = document.querySelector('.upload-filter-level');
  if (filterSelected === 'none') {
    galleryUtils.hideElement(progressBar);
  } else {
    galleryUtils.showElement(progressBar);
  }
  return filterSelected;
};
