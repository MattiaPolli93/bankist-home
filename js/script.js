"use strict";

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Smooth scroll
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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

// Page navigation
document.querySelector(".nav__links").addEventListener("click", function(e) {
    // Matching strategy
    if (e.target.classList.contains("nav__link")) {
        e.preventDefault();
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// Tabbed component
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
})