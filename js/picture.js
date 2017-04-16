'use strict';
// отрисовка миниатюры
(function (window) {
  var template = document.querySelector('#picture-template');
  var pool = document.querySelector('.pictures');
  function getElementPic(photo) {
    var element = template.content.cloneNode(true);
    var pic = element.querySelector('img');
    pic.src = window.photoArray[i].url;
    element.querySelector('.picture-likes').textContent = window.photoArray[i].likes;
    element.querySelector('.picture-comments').textContent = window.photoArray[i].coments.length;
    element.querySelector('img').setAttribute('tabindex', '0');
    return element;
  }

  for (var i = 0; i < 25; i++) {
    pool.appendChild(getElementPic(window.photoArray[i]));
  }
})(window);
