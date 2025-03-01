import { getImage, resetPage } from './js/pixabay-api.js';
import {
    hideLoader,
    renderGallery,
    createImgCard,
    showLoader,
    showMessage,
    showEndMessage,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');
const endLoaderDiv = document.querySelector('.end-loader-div');
let searchQuery = '';
let currentPage = 1;
let totalHits = 0;
let cardHeight = 0;

form.addEventListener('submit', funSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
 
async function funSubmit(e) {
    e.preventDefault();


  const newSearchText = input.value.trim();
  if (!newSearchText) return showMessage();

  searchQuery = newSearchText;
  resetPage();
  input.value = '';
  showLoader();
  clearGallery();

  getImage(searchQuery)
    .then(data => {
        const images = data.data.hits;
        totalHits = data.data.totalHits;

        console.log('Total hits:', totalHits);

        if (!images || images.length === 0) {
            showMessage();
            loadMoreBtn.classList.add('hidden');
            endLoaderDiv.classList.add('hidden');
      } else {
          renderGallery(images);
          toggleLoadMoreButton(images.length);
          scrollPage();
      }
    })
    .catch(err => {
      console.error('Error during image search', err);
      hideLoader();
      showMessage();
    });
}

async function loadMoreImages() {
    // showLoader();
    endLoaderDiv.classList.remove('hidden');

  getImage(searchQuery)
    .then(data => {
        const images = data.data.hits;
        totalHits = data.data.totalHits;

        console.log('Total hits:', totalHits);

      if (!images || images.length === 0) {
        // hideLoader();
        endLoaderDiv.classList.add('hidden');
        loadMoreBtn.classList.add('hidden');
        return;
      }

      renderGallery(images); 
        toggleLoadMoreButton(images.length); 
        scrollPage();
        currentPage += 1;
    })
    .catch(err => {
      console.error('Error during image load more', err);
      hideLoader();
      showMessage();
    });
}

function toggleLoadMoreButton(imageCount) {
  const totalLoadedImages = gallery.querySelectorAll('.image-card').length;

  if (totalLoadedImages >= totalHits) {
    loadMoreBtn.classList.add('hidden');
    endLoaderDiv.classList.add('hidden');
    showEndMessage();
  } else {
    loadMoreBtn.classList.remove('hidden');
    endLoaderDiv.classList.add('hidden');
  }
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  hideLoader();
}

function scrollPage() {
  const firstImageCard = gallery.querySelector('.image-card');
  if (firstImageCard && !cardHeight) {
    cardHeight = firstImageCard.getBoundingClientRect().height;
  }

  if (cardHeight) {
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
  }
}