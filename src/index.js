import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBoxInput = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onSearchBoxInput = event => {
  event.preventDefault();

  let countryValueEl = event.target.value.trim();
  countryListEl.innerHtml = '';
  countryInfoEl.innerHtml = '';

  if (countryValueEl !== '') {
    fetchCountries(countryValueEl)
      .then(response => {
        console.log(response);
        countryResult(response);
      })
      .catch(error => {
        countryError();
        console.log(error.message);
      });
  }
};

searchBoxInput.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

const countryResult = result => {
  if (result.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (result.length >= 2 && result.length <= 10) {
    const markup = countryItemEl(result);
    countryInfoEl.innerHTML = markup;
  } else if (result.length === 1) {
    const markup = countryEl(result);
    countryInfoEl.innerHTML = markup;
  } else {
    countryError();
  }
};

function countryItemEl(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
        <img class="country-list__flag" src="${flags.svg}" alt="flags" width ="50" height="30">
      <h2 class="country-list__name">${name}</h2>
        </li>`;
    })
    .join('');
  return markup;
}

function countryEl(countries) {
  const markup = countries
    .map(({ capital, population, languages, name, flags }) => {
      const polationString = String(population).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
      return `<h2 class="country-list__title"><span class="country-imageS"><img class="country-list__eblem" src="${flags.svg}" alt="flags" width ="55" height="45"></span>${name}</h2>
      <ul class="country-info__list">
        <li class="country-info__item">Capital: <span class="itemS">${capital}</span></li>
        <li class="country-info__item">Population: <span class="itemS">${polationString}</span></li>
        <li class="country-info__item">Languages: <span class="itemS">${languages[0]['name']}</span></li>
        </ul>`;
    })
    .join('');
  return markup;
}

function countryError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
