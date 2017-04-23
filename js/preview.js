'use strict';
window.overlayFunc = (function () {
  var pic = window.focusPic;
  var overlay = document.querySelector('.gallery-overlay');
  var picGallery = overlay.querySelector('.gallery-overlay-image');
  picGallery.src = pic.src;
  overlay.querySelector('.likes-count').textContent = pic.parentNode.querySelector('.picture-likes').textContent;
  overlay.querySelector('.comments-count').textContent = pic.parentNode.querySelector('.picture-comments').textContent;
  overlay.classList.remove('invisible');
});