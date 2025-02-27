import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loader-div');

const lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionDelay: 250,
});

export function createImgCard(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `
    <div class="image-card">
      <a href="${largeImageURL}" target="_blank">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
      </a>
      <div class="info">
        <p><strong>Likes:</strong>${likes}</p>
        <p><strong>Views:</strong>${views}</p>
        <p><strong>Comments:</strong>${comments}</p>
        <p><strong>Downloads:</strong>${downloads}</p>
      </div>
    </div>
  `;
}

export function renderGallery(images) {
  gallery.innerHTML = images.map(createImgCard).join('');
  lightbox.refresh();
  hideLoader();
}

export function showLoader() {
  gallery.classList.add('hidden');
  loading.classList.remove('hidden');
}

export function hideLoader() {
  loading.classList.add('hidden');
  gallery.classList.remove('hidden');
}

export function showMessage() {
  iziToast.show({
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: '#fff',
    maxWidth: '432px',
    backgroundColor: '#EF4040',
  });
}
