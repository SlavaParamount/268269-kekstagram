'use strict';
(function (window) {
  window.initializeFilters = function (filterElement, applyFilter, oldFilter) {
    var filterSelected = filterElement.value;
    var progressBar = document.querySelector('.upload-filter-level');

    applyFilter(oldFilter, filterSelected);

    if (filterSelected === 'none') {
      window.galleryUtils.hideElement(progressBar);
    } else {
      window.galleryUtils.showElement(progressBar);
    }

    return filterSelected;

  };
})(window);
