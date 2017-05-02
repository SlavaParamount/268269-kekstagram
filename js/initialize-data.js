'use strict';
(function () {
  window.initializeData = function (sortClicked, pics, showSorted) {
    var sortedPics = [];

    function shuffle(arrayToShuffle) {
      var exchangeElement;
      var rand;
      for (var i = arrayToShuffle.length; i; i--) {
        rand = Math.floor(Math.random() * i);
        exchangeElement = arrayToShuffle[i - 1];
        arrayToShuffle[i - 1] = arrayToShuffle[rand];
        arrayToShuffle[rand] = exchangeElement;
      }
    }

    switch (sortClicked.id) {
      case 'filter-popular':
        showSorted(pics);
        break;
      case 'filter-new':
        var picsIndex = [];
        for (var i = 0; i < 25; i++) {
          picsIndex.push(i);
        }

        shuffle(picsIndex);

        for (i = 0; i < 10; i++) {
          sortedPics.push(pics[picsIndex[i]]);
        }
        showSorted(sortedPics);

        break;
      case 'filter-discussed':
        sortedPics = pics.slice();
        sortedPics.sort(function (first, second) {

          return Math.sign(second.comments.length - first.comments.length);

        });

        showSorted(sortedPics);
        break;
    }
  };
})();
