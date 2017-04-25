'use strict';
(function () {
window.load = (function(url, onLoad){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data');
  xhr.send();
  xhr.addEventListener('load', function () {
  console.log(xhr.status + ' ' + xhr.statusText);
  try{
    console.log(JSON.parse(xhr.responseText));
    var dataParsed = JSON.parse(xhr.responseText);
    onLoad(dataParsed);
  } catch(err) {
    console.error(err.message);
  }
});

});
})();