import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_EBFK47rnbJbxqGyEs0tu4iC9ZJQc9CkpcCB6F4BWv2qM2Q3vddCcoLIukgwT26zy';

const error = document.querySelector('.error');
const selectBeeds = document.querySelector('.breed-select');
const containerCat = document.querySelector('.cat-info');

selectBeeds.addEventListener('change', clickedSelect);

fetchBreeds()
  .then(data => data.forEach(data => selectOption(data)))
  .catch(err => console.log(err));

function selectOption(data) {
  const valueSelect = data.id;
  const nameSelect = data.name;

  const murkapSelect = `
    <option value="${valueSelect}">${nameSelect}</option>`;
  return selectBeeds.insertAdjacentHTML('beforeend', murkapSelect);
}

function clickedSelect(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function cartCarMurkap(data) {
  const nameBreed = data.name;
  const descBreed = data.description;
  const temperBred = data.temperament;
  const breedImg = data.url;

  const cardCatMurkup = `
  <img src="${breedImg}"/>
  <h2>${nameBreed}</h2>
  <p>${descBreed}</p>
  <h3>Temperament: ${temperBred}</h3>
        `;
  return (containerCat.innerHTML = cardCatMurkup);
}
