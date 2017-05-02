'use strict';

window.galleryUtils = (function () {
  var hiddenClass = 'invisible';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var uploadForm = document.querySelector('.upload-overlay');
  var closePicture = document.querySelector('.gallery-overlay-close');
  var gallery = document.querySelector('.pictures');
  var focusPicture;

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


  closePicture.addEventListener('click', function () {
    hideOverlay();
  });

  gallery.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.src) {
      focusPicture = evt.target;
      window.showPicOverlay(focusPicture);
    }
  }, true);

  gallery.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_CODE) {
      evt.preventDefault();
      if (evt.target.src) {
        focusPicture = evt.target;
      } else {
        focusPicture = evt.target.querySelector('img');
      }
      window.showPicOverlay(focusPicture);
    }
  });


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_CODE && !galleryOverlay.classList.contains(hiddenClass)) {
      hideElement(galleryOverlay);
    }

    if (evt.keyCode === window.ENTER_CODE && !isElementHidden(galleryOverlay) && evt.target.classList.contains('gallery-overlay-close')) {
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
