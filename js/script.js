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

// Tabs component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Sticky navigation
const header = document.querySelector(".header");

// Modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
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

const stickyNav = function (entries) {
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

// Tabs component
tabsContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab");

    // Guard clause
    if (!clicked) return;

    // Remove active tabs
    tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    tabsContent.forEach(c => c.classList.remove("operations__content--active"));

    // Active tab
    clicked.classList.add("operations__tab--active");

    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});