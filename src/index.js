/*
1. робимо запит на сервер 
2. вішаємо слухача подій на select по кліку -> виводиться випадаючий список
3. Викликати функцію для запиту на сервер і передати породу кішки
3.1 створити розмітку , перебор масиву даних
3.2 відмальовати розмітку на сторінці
4.1 описати функцію (у якості параметру буде порода кішки, за дефолтом перша)
4.2 повертаємо результат виклику функції фетч (в середині робимо запит та стандартні перевірки )



*/
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
    infoContainer: document.querySelector(".cat-info"),
    selectList: document.querySelector(".breed-select"),
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
      refs.selectList.classList.add('loading'); // Показати loader під час завантаження порід

    // Отримуємо список порід та заповнюємо вибір пород
    const breeds = await fetchBreeds();
    
    // Очищаємо вибір породи перед додаванням нових опцій
    refs.selectList.innerHTML = '';

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.selectList.appendChild(option);
    });

    // Слухаємо зміни вибору породи
    refs.selectList.addEventListener('change', async function () {
      const selectedBreedId = refs.selectList.value;

      // Якщо порода вибрана, отримуємо інформацію про кота за цією породою
      if (selectedBreedId) {
        try {
          const catInfo = await fetchCatByBreed(selectedBreedId);
          displayCatInfo(catInfo[0]); // Показуємо інформацію про кота
        } catch (error) {
          console.error(error.message);
        }
      } else {
        // Очищаємо інформацію, якщо порода не вибрана
        clearCatInfo();
      }
    });
  } catch (error) {
        console.error(error.message);
        refs.selectList.classList.remove('loading');
        showError();
  }

  // Функція для відображення інформації про кота
  function displayCatInfo(cat) {
    refs.infoContainer.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Темперамент: ${cat.breeds[0].temperament}</p>
    `;
  }

  // Функція для очищення інформації про кота
  function clearCatInfo() {
    refs.infoContainer.innerHTML = '';
  }
});