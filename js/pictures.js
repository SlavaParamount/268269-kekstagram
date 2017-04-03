'use strict';

var photoArray = [];

for (var i=0; i < 25; i++) {
	photoArray[i] = {
		'url' : getUrl(),
		'likes' : getLikes(),
		'coments' : getComents()
	}
}

function getUrl(){
	var urlString = 'photos/' + (i + 1) + '.jpg';
	//console.log(urlString);
	return urlString;
}

function getLikes(){
	return Math.floor(Math.random() * (186)) + 15;
}

function getComents(){
	var comentsBase = [ //плохо, что эта ерунда все время при вызове функции выскакивает, но другого варианта не придумал
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
	];
	var comentArray = [];
	
	function rand(){
		return Math.floor(Math.random() * (5));
		;}
	
	var comentAmount = Math.floor(Math.random() * 2 + 1);
	
	for (var i = 0; i < comentAmount; i++){
		comentArray[i] = comentsBase[rand()];   //придумать чтобы не было одинаковых коментов? Удалить из массива строку, которую берем, а в 36 строке прописать вместо 5 ComentsBase.lenght-1?
	};
	
	return comentArray;
	};

var template = document.querySelector('#picture-template');
var pool = document.querySelector('.pictures');

for(i = 0; i < 25; i++) {
	var element = template.content.cloneNode(true);
	var pic = element.querySelector('img');
	pic.src = photoArray[i].url;
	element.querySelector('.picture-likes').textContent = photoArray[i].likes;
	element.querySelector('.picture-comments').textContent = photoArray[i].coments.length;
	pool.appendChild(element);
};

//разбить на функции?

var uploadForm = document.querySelector('.upload-overlay');
uploadForm.classList.add('invisible');

var overlay = document.querySelector('.gallery-overlay');
var pic = overlay.querySelector('.gallery-overlay-image');
pic.src = photoArray[1].url;
overlay.querySelector('.likes-count').textContent = photoArray[1].likes;
overlay.querySelector('.comments-count').textContent = photoArray[1].coments.length;
overlay.classList.remove('invisible');