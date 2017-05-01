'use strict';

window.galleryUtils = (function () {
  var hiddenClass = 'invisible';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var uploadForm = document.querySelector('.upload-overlay');
  var closePic = document.querySelector('.gallery-overlay-close');
  var gallery = document.querySelector('.pictures');

  function showElement(element) {
    element.classList.remove(hiddenClass);
  }

  function hideOverlay() {
    document.querySelector('.gallery-overlay').classList.add('invisible');
  }

  function hideElement(element) {
    element.classList.add(hiddenClass);
  }

  function isElementHidden(element) {
    return element.classList.contains(hiddenClass);
  }


  closePic.addEventListener('click', function () {
    hideOverlay();
  });

  gallery.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.src) {
      window.focusPic = evt.target;
      window.showPicOverlay();
    }
  }, true);

  gallery.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      if (evt.target.src) {
        window.focusPic = evt.target;
      } else {
        window.focusPic = evt.target.querySelector('img');
      }
      window.showPicOverlay();
    }
  });


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && galleryOverlay.classList.contains(hiddenClass) === false) {
      hideElement(galleryOverlay);
    }

    if (evt.keyCode === 13 && !isElementHidden(galleryOverlay) && evt.target.classList.contains('gallery-overlay-close')) {
      hideElement(galleryOverlay);
    }
  });

  return {
    uploadForm: uploadForm,
    showElement: showElement,
    hiddenClass: hiddenClass,
    hideElement: hideElement,
    isElementHidden: isElementHidden
  };

})();
