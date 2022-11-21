import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

const gallery = document.querySelector('.gallery');
function galleryCreationv2() {
  galleryItems.forEach(element => {
    let newLink = document.createElement('a');
    let newImg = document.createElement('img');
    newLink.classList.add('gallery__item');
    newLink.setAttribute(`href`, `${element.original}`);
    newImg.classList.add('gallery__image');
    newImg.setAttribute(`src`, `${element.original}`);
    newImg.setAttribute(`data-source`, `${element.original}`);
    newImg.setAttribute(`alt`, `${element.description}`);
    gallery.appendChild(newLink);
    newLink.appendChild(newImg);
    //troche radiusa nie zaszkodzi
    newImg.style.borderRadius = 3 + `px`;
  });
}

galleryCreationv2();

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  //czas pojawienia się opisu jest domyślny i wynosi 250ms
});
gallery.addEventListener('click', event => {
  if (event.target.tagName.toLowerCase() !== 'a') return;
  const image = document.querySelector('href');
  lightbox.open();
});
