import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  infoContainer: document.querySelector('.cat-info'),
  errorContainer: document.querySelector('.error'),
  selectList: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
};

document.addEventListener('DOMContentLoaded', async function () {
  try {
    refs.loader.classList.add('loading');

    const breeds = await fetchBreeds();

    refs.selectList.innerHTML = '';

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.selectList.appendChild(option);
    });

    new SlimSelect({
      select: refs.selectList,
    });

    refs.loader.classList.remove('loading');
    clearError();

    refs.selectList.addEventListener('change', async function () {
      const selectedBreedId = refs.selectList.value;

      refs.loader.classList.add('loading');
      refs.infoContainer.classList.add('not-loading');

      setTimeout(async () => {
        if (selectedBreedId) {
          try {
            const catInfo = await fetchCatByBreed(selectedBreedId);
            displayCatInfo(catInfo[0]);
            clearError();
          } catch (error) {
            console.error(error.message);
            showError();
          } finally {
            refs.loader.classList.remove('loading');
            refs.infoContainer.classList.remove('not-loading');
          }
        } else {
          clearCatInfo();
          clearError();
        }
      }, 1000);
    });
  } catch (error) {
    console.error(error.message);
    refs.loader.classList.remove('loading');
    showError();
  }
  function showError() {
    Report.failure(
      'Something went wrong',
      'Oops! Something went wrong! Try reloading the page!',
      'Close'
    );
  }
  function clearError() {
    refs.errorContainer.innerHTML = '';
  }

  function displayCatInfo(cat) {
    refs.infoContainer.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p><b>Temperament</b>: ${cat.breeds[0].temperament}</p>
    `;
  }

  function clearCatInfo() {
    refs.infoContainer.innerHTML = '';
  }
});
