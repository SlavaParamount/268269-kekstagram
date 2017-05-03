'use strict';
(function () {
  window.load = (function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    function onError(message) {
      document.appendChild(message);
    }

    xhr.open('GET', url);
    xhr.send();
    var error;

    xhr.addEventListener('load', function () {
      window.filtersBlock = document.querySelector('.filters');
      window.filtersBlock.classList.remove('hidden');

      switch (xhr.status) {
        case 200:
          window.dataParsed = JSON.parse(xhr.responseText);
          onLoad(window.dataParsed);
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
