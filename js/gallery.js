'use strict';

window.galleryUtils = (function () {
  var hiddenClass = 'invisible';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var uploadForm = document.querySelector('.upload-overlay');
  var closePic = document.querySelector('.gallery-overlay-close');
  var gallery = document.querySelector('.pictures');
  var focusPic;
  function showElement(element) {
    element.classList.remove(hiddenClass);
  }

  function hideOverlay() {
    galleryOverlay.classList.add(hiddenClass);
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
      focusPic = evt.target;
      window.showPicOverlay(focusPic);
    }
  }, true);

  gallery.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      if (evt.target.src) {
        focusPic = evt.target;
      } else {
        focusPic = evt.target.querySelector('img');
      }
      window.showPicOverlay(focusPic);
    }
  });


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.escCode && !galleryOverlay.classList.contains(hiddenClass)) {
      hideElement(galleryOverlay);
    }

    if (evt.keyCode === window.enterCode && !isElementHidden(galleryOverlay) && evt.target.classList.contains('gallery-overlay-close')) {
      hideElement(galleryOverlay);
    }
  });

  return {
    uploadForm: uploadForm,
    showElement: showElement,
    hideElement: hideElement,
    isElementHidden: isElementHidden
  };

})();
