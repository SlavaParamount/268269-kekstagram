'use strict';
window.showPicOverlay = (function (pic) {
  var picParent = pic.parentNode;
  var overlay = document.querySelector('.gallery-overlay');
  var picGallery = overlay.querySelector('.gallery-overlay-image');
  picGallery.src = pic.src;
  overlay.querySelector('.likes-count').textContent = picParent.querySelector('.picture-likes').textContent;
  overlay.querySelector('.comments-count').textContent = picParent.querySelector('.picture-comments').textContent;
  window.galleryUtils.showElement(overlay);
});
