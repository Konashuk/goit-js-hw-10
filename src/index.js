import axios from 'axios';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_EBFK47rnbJbxqGyEs0tu4iC9ZJQc9CkpcCB6F4BWv2qM2Q3vddCcoLIukgwT26zy';

const errorEl = document.querySelector('.error');
const selectBeeds = document.querySelector('.breed-select');
const containerCat = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

selectBeeds.addEventListener('change', clickedSelect);
errorEl.classList.add('is-hidden');
selectBeeds.classList.add('is-hidden');

fetchBreeds()
  .then(data => selectOption(data))
  .catch(err => errorMess());

function errorMess() {
  errorEl.classList.remove('is-hidden');
  loaderEl.classList.add('is-hidden');
}

function selectOption(data) {
  selectBeeds.classList.remove('is-hidden');
  loaderEl.classList.add('is-hidden');
  const murkapSelect = data
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  selectBeeds.insertAdjacentHTML('afterbegin', murkapSelect);
  new SlimSelect({
    select: selectBeeds,
    settings: {
      placeholderText: "Here is Cat's breed",
    },
  });
}

function clickedSelect(event) {
  const breedId = event.currentTarget.value;
  loaderEl.classList.remove('is-hidden');
  fetchCatByBreed(breedId)
    .then(data => cartCarMurkap(data))
    .catch(err => console.log(errorEl));
}
function cartCarMurkap(data) {
  loaderEl.classList.add('is-hidden');
  containerCat.classList.add('.is-hidden');
  const nameBreed = data[0].breeds[0].name;
  const descBreed = data[0].breeds[0].description;
  const temperBred = data[0].breeds[0].temperament;
  const breedImg = data[0].url;

  const cardCatMurkup = `
  <img src="${breedImg}" width="400" height="300"alt="${nameBreed}"/>
 <div claas="container-text">
  <h2>${nameBreed}</h2>
  <p>${descBreed}</p>
  <h3>Temperament:</h3>
  <p>${temperBred}</p>
  </div>
        `;
  return (containerCat.innerHTML = cardCatMurkup);
}
