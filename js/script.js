"use strict";

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Menu fade animation
const nav = document.querySelector(".nav");

// Smooth scroll
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Sticky navigation
const header = document.querySelector(".header");

// Reveal sections
const allSections = document.querySelectorAll(".section");

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

// Tabs component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Modal window
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Menu fade animation
const handleHover = function(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px` // Height of nav here = 90px
});

headerObserver.observe(header);

// Page navigation
document.querySelector(".nav__links").addEventListener("click", function(e) {
    // Matching strategy
    if (e.target.classList.contains("nav__link")) {
        e.preventDefault();
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// Button to scroll to 1° section
btnScrollTo.addEventListener("click", function(e) {
    // Scrolling
    // One way...
    /* const s1coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: s1coords.left + window.pageXOffset, 
        top: s1coords.top + window.pageYOffset,
        behavior: "smooth"
    }); */

    // Or another (I'm gonna get ya)
    section1.scrollIntoView({ behavior: "smooth" });
});

// Reveal sections
const revealSection = function(entries, observe) {
    const [entry] = entries;

    // Guard clause
    if (!entry.isIntersecting) return;

    // Make sections visible
    entry.target.classList.remove("section--hidden");

    // Stop observing - for improved performance
    observe.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// Lazy loading images
const loadImg = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    // Remove filter when loading's over
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    // Conceal lazy loading from viewers
    rootMargin: "200px"
});

imgTargets.forEach(img => imgObserver.observe(img));

// Tabs component
tabsContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab");

    if (!clicked) return;

    // Remove active tabs
    tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    tabsContent.forEach(c => c.classList.remove("operations__content--active"));

    // Active tab
    clicked.classList.add("operations__tab--active");

    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

// Slider
const slider = function() {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML("beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };

    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    };

    const goToSlide = function(slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    };

    const prevSlide = function() {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const nextSlide = function() {
        if (curSlide === (maxSlide - 1)) {
            curSlide = 0;
        } else {
            curSlide++
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function() {
        createDots();
        activateDot(0);
        goToSlide(0);
    };
    init();

    // Event handlers
    btnLeft.addEventListener("click", prevSlide);
    btnRight.addEventListener("click", nextSlide);

    document.addEventListener("keydown", function(e) {
        // e.key === "ArrowLeft" && prevSlide();
        // e.key === "ArrowRight" && nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    });

    dotContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();