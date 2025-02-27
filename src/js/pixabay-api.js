import axios from "axios";

export async function getImage(imageTitle) {
    const baseUrl = 'https://pixabay.com/api/';
    const API_KEY = '48985063-5c5813c169e3db6e477352dc5';

    try {
        const response = await axios.get(baseUrl, {
            params: {
                key: API_KEY,
                q: imageTitle,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: 1,
                per_page: 40,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching image data:", error);
        throw error;
    }
}
