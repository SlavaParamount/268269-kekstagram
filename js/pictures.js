'use strict';
var photoArray = [];

var comentsBase = [ // плохо, что эта ерунда все время при вызове функции выскакивает, но другого варианта не придумал
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

for (var i = 0; i < 25; i++) {
  photoArray[i] = {
    'url': getUrl(),
    'likes': getLikes(),
    'coments': getComents()
  };
}

function getUrl() {
  var urlString = 'photos/' + (i + 1) + '.jpg';
  return urlString;
}

function getLikes() {
  return Math.floor(Math.random() * (186)) + 15;
}


function getRandomComent() {
  var rand = Math.floor(Math.random() * (5));
  return comentsBase[rand];
}
function getComents() {
  var comentArray = [];

  var comentAmount = Math.floor(Math.random() * 2 + 1);

  for (var j = 0; j < comentAmount; j++) {
    comentArray[j] = getRandomComent();   // придумать чтобы не было одинаковых коментов? Удалить из массива строку, которую берем, а в 36 строке прописать вместо 5 ComentsBase.lenght-1?
  }

  return comentArray;
}
var template = document.querySelector('#picture-template');
var pool = document.querySelector('.pictures');

function getElementPic(photo) {
  var element = template.content.cloneNode(true);
  var pic = element.querySelector('img');
  pic.src = photoArray[i].url;
  element.querySelector('.picture-likes').textContent = photoArray[i].likes;
  element.querySelector('.picture-comments').textContent = photoArray[i].coments.length;
  element.querySelector('img').setAttribute('tabindex', '0');
  return element;
}

for (i = 0; i < 25; i++) {
  pool.appendChild(getElementPic(photoArray[i]));
}

// разбить на функции?

var uploadForm = document.querySelector('.upload-overlay');
uploadForm.classList.add('invisible');

function showOverlay(pic) {
  var overlay = document.querySelector('.gallery-overlay');
  var picGallery = overlay.querySelector('.gallery-overlay-image');
  picGallery.src = pic.src;
  overlay.querySelector('.likes-count').textContent = pic.parentNode.querySelector('.picture-likes').textContent;
  overlay.querySelector('.comments-count').textContent = pic.parentNode.querySelector('.picture-comments').textContent;
  overlay.classList.remove('invisible');

}

function hideOverlay() {
  document.querySelector('.gallery-overlay').classList.add('invisible');
}

var gallery = document.querySelector('.pictures');

gallery.addEventListener('click', function (evt) {
  if (evt.target.src) {
    var clickedPic = evt.target;
    showOverlay(clickedPic);
    evt.preventDefault();
  }
}, true);

var closePic = document.querySelector('.gallery-overlay-close');
closePic.addEventListener('click', function () {
  hideOverlay();
});

gallery.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    var focusPic = evt.target.querySelector('img');
    showOverlay(focusPic); // странно работает, сразу исчезает
  }
});

var hiddenClass = 'invisible';
var galleryElement = document.querySelector('.gallery-overlay');

function showElement(element) {
  element.classList.remove(hiddenClass);
}

function hideElement(element) {
  element.classList.add(hiddenClass);
}

function isElementHidden(thing) {
  return thing.classList.contains(hiddenClass);
}

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 && galleryElement.classList.contains(hiddenClass) === false) {
    hideElement(galleryElement);
  }

  if (evt.keyCode === 13 && !isElementHidden(galleryElement) && evt.target.classList.contains('gallery-overlay-close')) {
    hideElement(galleryElement);
  }
});

document.querySelector('#upload-select-image').classList.remove(hiddenClass);

document.querySelector('#upload-file').addEventListener('change', function () {
  showElement(uploadForm);
});

document.querySelector('.upload-form-cancel').addEventListener('click', function () {
  hideElement(uploadForm);
});

document.onkeydown = function (evt) {
  if (evt.keyCode === 27 && !isElementHidden(uploadForm) && document.querySelector('.upload-form-description') !== document.activeElement) {
    hideElement(uploadForm);
  }
  if (evt.code === 13 && document.querySelector('.upload-form-cancel') === document.activeElement) {
    hideElement(uploadForm);
  }
};
