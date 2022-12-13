import { IMAGES } from './constants';
import './style.css'

//Setup
const appElement = document.querySelector('#app');

const getCarouselTemplate = () => `
<div id="thepower-carousel" class="thepower-carousel">
    <ul class="scrollable-set"></ul>
    <div class="image-preview"></div>
</div>
`;

appElement.innerHTML += getCarouselTemplate();

//Logic
const scrollableSet = document.querySelector('.scrollable-set');
const imagePrevElement = document.querySelector('.image-preview');
let currentImageIndex = 0;
let imageInterval;

const getScrollableElementTemplate = (image, index) => `
    <li role="button" class="clickable">
        <img id="image-${index}" src="${image.src}" alt="${image.alt}" />
    </li>
`;

const setupScrollableSet = () => {
    IMAGES.forEach((image, index) => {
        const template = getScrollableElementTemplate(image, index);
        scrollableSet.innerHTML += template;
    });
};

const setupCarouselInterval = () => {
    imageInterval = setInterval(() => {
        if (currentImageIndex === IMAGES.length - 1) {
            currentImageIndex = 0;
        } else {
        currentImageIndex += 1;
        }

        setupImagePreview(IMAGES[currentImageIndex].src);
    }, 5000)
};

const resetCarouselPreview = () => {
    clearInterval(imageInterval);
    setupCarouselInterval();
};


const setupImagePreview = (src) => {
    imagePrevElement.style.backgroundImage = `url(${src})`;

    const selectedImage = document.querySelector(`img[src="${src}"]`)
    const imageIndex = Number(selectedImage.id.split('-')[1]);
    currentImageIndex = imageIndex;
    selectedImage.scrollIntoView({ behavior: 'smooth'});
    resetCarouselPreview();
};

const handleChangePreview = (event) => {
    const image = event.target.children[0];
    setupImagePreview(image.getAttribute('src'));
   
};

const addScrollableListeners = () => {
    const scrollables = document.querySelectorAll('li.clickable');
    scrollables.forEach((scrollable) => 
        scrollable.addEventListener('click', handleChangePreview)
    );
};



setupScrollableSet();
setupImagePreview(IMAGES[0].src);
addScrollableListeners();
setupCarouselInterval();