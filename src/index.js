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
import SlimSelect from 'slim-select'



const refs = {
  infoContainer: document.querySelector(".cat-info"),
  errorContainer: document.querySelector(".error"),
    selectList: document.querySelector(".breed-select"),
}

// new SlimSelect({
//   select: refs.selectList
//   // Array of Option objects
//   // data: [{ text: 'Value 1', value: 'value1' }]

//   // or

//   // Array of Optgroups and/or Options
//   fetchBreeds.data: [{ label: 'Optgroup Label', options: { text: 'Value 1', value: 'value1' } }],


// });

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
      
 refs.selectList.classList.remove('loading');
clearError();
    // Слухаємо зміни вибору породи
    refs.selectList.addEventListener('change', async function () {
      const selectedBreedId = refs.selectList.value;

      // Якщо порода вибрана, отримуємо інформацію про кота за цією породою
      if (selectedBreedId) {
        try {
          refs.selectList.classList.add('loading');
          const catInfo = await fetchCatByBreed(selectedBreedId);
          displayCatInfo(catInfo[0]); // Показуємо інформацію про кота
        clearError();
        } catch (error) {
          console.error(error.message);
           showError();
        } finally {
          refs.selectList.classList.remove('loading');
        }
        
      } else {
        // Очищаємо інформацію, якщо порода не вибрана
        clearCatInfo();
                clearError();
      }
    });
  } catch (error) {
        console.error(error.message);
        refs.selectList.classList.remove('loading');
        showError();
  }
 function showError() {
    refs.infoContainer.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
  }
  function clearError() {
        refs.errorContainer.innerHTML = '';
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