'use strict';

//открытие/закрытие меню

const nav = document.querySelector('.nav'),
      navToggle = document.querySelector('.nav__toggle-button');

nav.classList.remove('nav--nojs');
nav.classList.add('nav--closed');

navToggle.addEventListener('click', function() {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
  } else {
    nav.classList.add('nav--closed');
  }
});
