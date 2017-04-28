'use strict';
// отрисовка миниатюры
(function (window) {
  var template = document.querySelector('#picture-template');
  var pool = document.querySelector('.pictures');
  function onLoad(photoArray) {
    function getElementPic(photo) {
      var element = template.content.cloneNode(true);
      var pic = element.querySelector('img');
      pic.src = photo.url;
      element.querySelector('.picture-likes').textContent = photo.likes;
      element.querySelector('.picture-comments').textContent = photo.comments.length;
      element.querySelector('img').setAttribute('tabindex', '0');
      return element;
    }
    for (var b = 0; b < photoArray.length - 1; b++) {
      pool.appendChild(getElementPic(photoArray[b]));
    }
  }
  window.load('', onLoad);

})(window);
