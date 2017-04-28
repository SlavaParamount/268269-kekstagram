'use strict';
(function () {
  window.load = (function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    function onError(message) {
      document.appendChild(message);
    }


    function galleryClear() {
      var pictures = document.querySelectorAll('.picture');
      [].forEach.call(pictures, function (it) {
        it.parentNode.removeChild(it);
      });
    }

    xhr.open('GET', url);
    xhr.send();
    var error;
    xhr.addEventListener('load', function () {
      var filtersBlock = document.querySelector('.filters');
      filtersBlock.classList.remove('hidden');
      filtersBlock.addEventListener('click', function (evt) {
        function showSorted(arr) {
          onLoad(arr);
        }
        if (evt.target.classList.contains('filters-radio')) {
          galleryClear();

          window.debounce(window.initializeData(evt.target, dataParsed, showSorted));
        }
      });

      switch (xhr.status) {
        case 200:
          var dataParsed = JSON.parse(xhr.responseText);
          onLoad(dataParsed);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
    });
    if (error) {
      onError(error);
    }
  });
})();
