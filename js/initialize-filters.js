'use strict';
var initializeFilters = function (filterElement, applyFilter) {
  applyFilter(filterElement);
  var progressBar = document.querySelector('.upload-filter-level');
  if (window.filterName === 'none') {
    progressBar.classList.add('invisible');
  } else {
    progressBar.classList.remove('invisible');
  }
};