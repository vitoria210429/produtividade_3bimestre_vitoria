// This file adds interactivity to the webpage. It includes functionality for a mobile menu that toggles visibility when a hamburger icon is clicked, a "back to top" button that appears on scroll and smoothly scrolls to the top when clicked, and smooth transition effects for elements as they become visible on scroll. It also logs simple messages to the console during page loading.

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded");

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Smooth transition effects for elements on scroll
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});