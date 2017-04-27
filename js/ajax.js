'use strict';
(function () {
  window.load = (function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    function onError(message) {
      document.appendChild(message);
    }
    xhr.open('GET', 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data');
    xhr.send();
    var error;
    xhr.addEventListener('load', function () {
      var filtersBlock = document.querySelector('.filters');
      filtersBlock.classList.remove('invisible');
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
