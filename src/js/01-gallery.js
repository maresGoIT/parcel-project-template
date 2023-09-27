// Add imports above this line
import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
galleryItems.forEach(image => {
  const galleryItemEl = document.createElement('li');
  galleryItemEl.classList.add('gallery__item');
  galleryItemEl.innerHTML = `<a class="gallery__link" href="${image.original}">
   <img
        class="gallery__image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
    />
    </a>`;
  galleryEl.appendChild(galleryItemEl);
});

galleryEl.addEventListener('click', openLargeImage);
let modalEl;
function openLargeImage(event) {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    const imageSource = event.target.dataset.source;
    modalEl = new SimpleLightbox(
      `<img src="${imageSource}" alt="${event.target.alt}" />`
    );
    modalEl.open();
    modalEl.show();
    window.addEventListener('keydown', closeModal);
    document.addEventListener('click', closeModal);
  }
}

function closeModal(e) {
  if (modalEl && (e.key === 'Escape' || e.target === modalEl.element())) {
    modalEl.close();

    window.removeEventListener('keydown', closeModal);
    document.removeEventListener('click', closeModal);
  }
}
