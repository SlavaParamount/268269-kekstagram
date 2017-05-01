'use strict';
(function () {
  window.initializeData = function (sortClicked, pics, showSorted) {
    var sortedPics = [];

    function shuffle(arrayToShuffle) {
      var j;
      var x;
      for (var i = arrayToShuffle.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arrayToShuffle[i - 1];
        arrayToShuffle[i - 1] = arrayToShuffle[j];
        arrayToShuffle[j] = x;
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

          if (first.comments.length > second.comments.length) {
            return -1;
          } else if (first.comments.length < second.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });

        showSorted(sortedPics);
        break;
    }
  };
})();
