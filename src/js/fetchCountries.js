const BASE_URL = 'https://restcountries.com/v2/name/';
const field = 'fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}?${field}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
