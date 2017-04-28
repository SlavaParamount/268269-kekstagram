'use strict';

window.galleryUtils = (function () {
  var hiddenClass = 'invisible';
  var galleryElement = document.querySelector('.gallery-overlay');
  var uploadForm = document.querySelector('.upload-overlay');
  function showElement(element) {
    element.classList.remove(hiddenClass);
  }

  function hideOverlay() {
    document.querySelector('.gallery-overlay').classList.add('invisible');
  }
  var gallery = document.querySelector('.pictures');

  function hideElement(element) {
    element.classList.add(hiddenClass);
  }

  function isElementHidden(thing) {
    return thing.classList.contains(hiddenClass);
  }


  var closePic = document.querySelector('.gallery-overlay-close');
  closePic.addEventListener('click', function () {
    hideOverlay();
  });

  gallery.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.src) {
      evt.preventDefault();
      window.focusPic = evt.target;
      window.overlayFunc();
    }
  }, true);

  gallery.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      window.focusPic = evt.target.querySelector('img');
      window.overlayFunc(); // странно работает, сразу исчезает
    }
  });


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && galleryElement.classList.contains(hiddenClass) === false) {
      hideElement(galleryElement);
    }

    if (evt.keyCode === 13 && !isElementHidden(galleryElement) && evt.target.classList.contains('gallery-overlay-close')) {
      hideElement(galleryElement);
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
