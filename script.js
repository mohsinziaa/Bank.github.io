'use strict';

// Required Variables.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const navigationLinks = document.querySelector('.nav__links');

// Function to open the modal window.
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to close the modal window.
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Page Navigation.
navigationLinks.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);

  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href') !== '#'
  ) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// To open the modal.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// To close modal.
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Close with escape key!
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating a cookie message.
let cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');

cookieMessage.innerHTML = `We create cookie message to annoy other people, click on button to close it 
                          <button class="btn btn--close-cookie">Accept Cookies</button>  >`;
header.append(cookieMessage);

const btnCloseCookie = document.querySelector('.btn--close-cookie');
btnCloseCookie.style.textTransform = 'uppercase';

// Close the cookie message.
btnCloseCookie.addEventListener('click', () => {
  cookieMessage.remove(cookieMessage);
});

// Implementation of smooth scrolling.
btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});
