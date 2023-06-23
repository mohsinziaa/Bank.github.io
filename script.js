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

/*
FADING ANIMATION IN THE NAVBAR.
*/
const navbarFade = (event, opacity) => {
  if (event.target.classList.contains('nav__link')) {
    let linkHovered = event.target;
    let navBar = linkHovered.closest('.nav');
    let otherLinks = navBar.querySelectorAll('.nav__link');
    let logo = navBar.querySelector('img');

    otherLinks.forEach(link => {
      link === linkHovered
        ? (link.style.opacity = 1)
        : (link.style.opacity = opacity);
    });
    logo.style.opacity = opacity;
  }
};

// Adding the fade animation.
nav.addEventListener('mouseover', e => {
  navbarFade(e, 0.5);
});

// Removing the fading Animation.
nav.addEventListener('mouseout', e => {
  navbarFade(e, 1);
});

/* 
SMOOTH PAGE NAVIGATION.
*/
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

/*
ADDING STICKY NAVIGATION (Intersection Observer API) AT THE END OF HEADER.
*/

let navHeight = nav.getBoundingClientRect().height;

const callBackFunction = entries => {
  // const [entry] = entries;
  // console.log(entries[0]);

  if (!entries[0].isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const obeserveHeader = new IntersectionObserver(callBackFunction, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

obeserveHeader.observe(header);

/*
ADDING SMOOTH NAVIGATION THROUGH ALL SECTIONS AS WE SCROLL.
*/
const observeSections = (entries, observer) => {
  // const [entry] = entries;
  // console.log(entries[0]);

  if (!entries[0].isIntersecting) {
    return;
  }
  entries[0].target.classList.remove('section--hidden');
  observer.unobserve(entries[0].target);
};

const sectionObserver = new IntersectionObserver(observeSections, {
  root: null,
  threshold: 0.12,
});

let allSections = document.querySelectorAll('.section');

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/*
ADDING LAZY IMAGE LOADING.
*/

const observeImages = (entries, observer) => {
  // const [entry] = entries;
  // console.log(entries[0]);

  if (!entries[0].isIntersecting) {
    return;
  }
  entries[0].target.src = entries[0].target.dataset.src;
  entries[0].target.classList.remove('lazy-img');

  entries[0].target.addEventListener('load', () => {});

  observer.unobserve(entries[0].target);
};

const imageObserver = new IntersectionObserver(observeImages, {
  root: null,
  threshold: 0.8,
});

let allImages = document.querySelectorAll('img[data-src]');

allImages.forEach(image => {
  imageObserver.observe(image);
});

/*OPERATIONS TAB FUNCTIONALITIES*/
tabsContainer.addEventListener('click', e => {
  let buttonClicked = e.target.closest('.operations__tab');
  console.log(buttonClicked);

  if (!buttonClicked) {
    return;
  }

  // Removing the active class.
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(contentTab =>
    contentTab.classList.remove('operations__content--active')
  );

  // Activate the tab.
  buttonClicked.classList.add('operations__tab--active');

  // Activate the content.
  document
    .querySelector(`.operations__content--${buttonClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/*
FUNCTIONALITIES FOR SLIDER.
*/

const sliderFunction = () => {
  // Required Variables.
  const dotContainer = document.querySelector('.dots');
  let slides = document.querySelectorAll('.slide');
  const rightButton = document.querySelector('.slider__btn--right');
  const leftButton = document.querySelector('.slider__btn--left');
  let currentSlide = 0;
  const maxSlidesLength = slides.length;

  // Functions.
  const createDots = () => {
    for (let index = 0; index < slides.length; index++) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    }
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const calculateSlidesTransformation = slideNumber => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - slideNumber)}%)`;
    });
  };

  const nextSlide = () => {
    if (currentSlide === maxSlidesLength - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    calculateSlidesTransformation(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlidesLength - 1;
    } else {
      currentSlide--;
    }
    calculateSlidesTransformation(currentSlide);
    activateDot(currentSlide);
  };

  const initializeSlider = () => {
    createDots();
    activateDot(currentSlide);
    calculateSlidesTransformation(currentSlide);
  };

  initializeSlider();

  // Event Handelers.
  rightButton.addEventListener('click', nextSlide);
  leftButton.addEventListener('click', previousSlide);
  document.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight') {
      nextSlide();
    } else if (e.key == 'ArrowLeft') {
      previousSlide();
    } else {
      return;
    }
  });

  dotContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('dots__dot')) {
      return;
    }

    let currentDot = e.target;
    let currentSlide = currentDot.dataset.slide;
    calculateSlidesTransformation(currentSlide);
    activateDot(currentSlide);
  });
};

sliderFunction();
