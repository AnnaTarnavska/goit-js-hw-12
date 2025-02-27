import { getImage } from './js/pixabay-api.js';
import {
    hideLoader,
    renderGallery,
    showLoader,
    showMessage,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', funSubmit);

async function funSubmit(e) {
  e.preventDefault();

  const searchText = input.value.trim();
  if (!searchText) return showMessage();

    input.value = '';
    clearGallery();
  showLoader();

  try {
    const data = await getImage(searchText);
    const images = data.data.hits;

    if (!images || images.length === 0) {
      clearGallery();
      throw new Error("No images found");
    }

    renderGallery(images);
  } catch (err) {
    console.error('No results', err);
    hideLoader();
    showMessage();
  }
}

function clearGallery() {
    gallery.innerHTML = '';
}
