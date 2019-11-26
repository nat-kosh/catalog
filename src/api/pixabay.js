import axios from 'axios';

const baseImagesApiUrl = 'https://pixabay.com/api/';
const baseImagesApiKey = '11960215-f43ca29ac9a029d50ed69a0c4';

export function fetchImagesByName(name) {
    const minWidth = 258;
    const minHeight = 84;

    return axios.get(`${baseImagesApiUrl}?key=${baseImagesApiKey}&per_page=3&min_width=${minWidth}&min_height=${minHeight}&safesearch=${encodeURI(name)}`);
}
