import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_EBFK47rnbJbxqGyEs0tu4iC9ZJQc9CkpcCB6F4BWv2qM2Q3vddCcoLIukgwT26zy';

const error = document.querySelector('.error');
const selectBeeds = document.querySelector('.breed-select');
const containerCat = document.querySelector('.cat-info');

selectBeeds.addEventListener('change', clickedSelect);

fetchBreeds()
  .then(data => selectOption(data))
  .catch(err => console.log(err));

function selectOption(data) {
  const murkapSelect = data
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  selectBeeds.insertAdjacentHTML('afterbegin', murkapSelect);

  new SlimSelect({
    select: '#selectElement',
  });
}

function clickedSelect(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => cartCarMurkap(data))
    .catch(err => console.log(err));
}

function cartCarMurkap(data) {
  const nameBreed = data[0].breeds[0].name;
  const descBreed = data[0].breeds[0].description;
  const temperBred = data[0].breeds[0].temperament;
  const breedImg = data[0].url;

  const cardCatMurkup = `
  <img src="${breedImg}" width="300" alt="${nameBreed}"/>
 <div claas="container-text">
  <h2>${nameBreed}</h2>
  <p>${descBreed}</p>
  <h3>Temperament:</h3>
  <p>${temperBred}</p>
  </div>
        `;
  return (containerCat.innerHTML = cardCatMurkup);
}
