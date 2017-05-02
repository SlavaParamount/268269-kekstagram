'use strict';
// отрисовка миниатюр
(function (window) {
  var template = document.querySelector('#picture-template');
  var picturesContainer = document.querySelector('.pictures');
  var sortPics = document.querySelector('.filters');

  sortPics.addEventListener('click', function (evt) {
    function showSorted(arr) {
      onLoad(arr);
    }

    if (evt.target.classList.contains('filters-radio')) {
      window.galleryClear();
      window.debounce(window.initializeData(evt.target, window.dataParsed, showSorted));
    }
  });

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

    window.galleryClear = function () {
      var pictures = document.querySelectorAll('.picture');
      [].forEach.call(pictures, function (it) {
        it.parentNode.removeChild(it);
      });
    };

    photoArray.forEach(function (it) {
      picturesContainer.appendChild(getElementPic(it));
    });
  }

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data', onLoad);

})(window);
