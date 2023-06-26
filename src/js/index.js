import { fetchBreeds, fetchCatByBreed } from './cat-api'
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';

const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


function makeOptions(items) {
    const options = items.map(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        return option;
    });

    select.append(...options);
    select.classList.remove('is-hidden');
}

fetchBreeds()
    .then(data => {
        makeOptions(data)
        new SlimSelect({
            select: '#single',
        })
    })
    .catch(err => {
        console.log(err);
        showError('Failed to fetch cat breeds.');
    })
    .finally(() => loader.classList.add('hidden'));

select.addEventListener('change', changeValue);

function changeValue(ev) {
    const breedId = ev.target.value;
    loader.classList.remove('is-hidden');
    catInfo.innerHTML = '';
    errorEl.classList.add('is-hidden');

    fetchCatByBreed(breedId)
    .then(data => createMarkup(data))
    .catch(err => {
        console.log(err);
        showError('Failed to fetch cat information.');
    })
    .finally(() => loader.classList.add('is-hidden'));
}

function createMarkup(cat) {
    const { url, breeds } = cat[0];
    const { name, temperament, discription } = breeds[0];

    const img = document.createElement('img');
    img.src = url;
    img.width = 400;

    const nameEl = document.createElement('h2');
    nameEl.textContent = name;

    const temperamentEl = document.createElement('p');
    temperamentEl.innerHTML = `<b>Temperament:</p> ${temperament}`;

    const discriptionEl = document.createElement('p');
    discriptionEl.textContent = discription;

    const catInfoContent = document.createElement('div');
    catInfoContent.classList.add('cat-info-content');
    catInfoContent.append(nameEl, temperamentEl, discriptionEl);

    catInfo.innerHTML = '';
    catInfo.append(img, catInfoContent);
}

function showError(massage) {
    Notiflix.Notify.failure(massage);
    errorEl.classList.remove('is-hidden');
}