const BASE_URL = 'https://api.thecatapi.com/v1/';
const Api_KEY =
  'api_key=live_EBFK47rnbJbxqGyEs0tu4iC9ZJQc9CkpcCB6F4BWv2qM2Q3vddCcoLIukgwT26zy';

export function fetchBreeds() {
  const breeds = 'breeds';
  return fetch(`${BASE_URL}${breeds}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  const PART_serch = 'images/search?';
  const PART_URL_DREED_ID = `breed_ids=${breedId}`;

  return fetch(`${BASE_URL}${PART_serch}${PART_URL_DREED_ID}&${Api_KEY}`).then(
    res => {
      if (!res.ok) {
        throw new Error(errorEl.claslist.remore('is-hidden'));
      }
      return res.json();
    }
  );
}
