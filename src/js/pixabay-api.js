import axios from "axios";

let currentPage = 1;
let totalHits = 0;

export async function getImage(imageTitle) {
    const baseUrl = 'https://pixabay.com/api/';
    const API_KEY = '48985063-5c5813c169e3db6e477352dc5';
    
    const response = await axios.get(baseUrl, {
        params: {
            key: API_KEY,
            q: imageTitle,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: currentPage,
            per_page: 40,
        },
    });

    currentPage++;
    return response;
}

export function resetPage() {
    currentPage = 1;
}
