'use strict';
(function () {
  window.initializeData = function (sortClicked, pics, showSorted) {
    var sortedPics = [];
    function shuffle(a) {
      var j;
      var x;
      var i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
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
        showSorted(sortedPics);
        var j;
        for (j = 0; j < 10; j++) {
          sortedPics.push(pics[picsIndex[j]]);
        }
        showSorted(sortedPics);
        break;
      case 'filter-discussed':
       // debugger;
        sortedPics = pics;
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
