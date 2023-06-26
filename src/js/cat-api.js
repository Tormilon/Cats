import axios from 'axios';

const apiKey = "live_BU6IhkrNICvCbpqUqg8cyJk4J3qgp21zd7iGyT6byWhGBg5ujTRJRPLp1yMZlhCa";
axios.defaults.headers.common["x-api-key"] = apiKey;
const BASE_URL = 'https://api.thecatapi.com/v1';
const BREED_POINT = '/breeds';
const IMG_POINT = '/images/search';

export function fetchBreeds() {
    return axios
        .get(`${BASE_URL}${BREED_POINT}`)
        .then(resp => resp.data)
        .catch(error => {
            console.log(error);
            throw new Error('Failed to fetch cat breeds.');
        });
}

export function fetchCatByBreed(breedId) {
    return axios
        .get(`${BASE_URL}${IMG_POINT}?breed_ids=${breedId}`)
        .then(resp => resp.data)
        .catch(error => {
            console.log(error);
            throw new Error('Failed to fetch cat information.');
        });
}