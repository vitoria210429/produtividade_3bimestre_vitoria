// This file contains the JavaScript code for managing the carousel component, including transitions and item display.

class Carousel {
    constructor(carouselElement) {
        this.carouselElement = carouselElement;
        this.slides = carouselElement.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.init();
    }

    init() {
        this.showSlide(this.currentSlide);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const nextButton = this.carouselElement.querySelector('.carousel-next');
        const prevButton = this.carouselElement.querySelector('.carousel-prev');

        nextButton.addEventListener('click', () => this.nextSlide());
        prevButton.addEventListener('click', () => this.prevSlide());
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
}

// Usage example (to be called in main.js):
// const carouselElement = document.querySelector('.carousel');
// const carousel = new Carousel(carouselElement);