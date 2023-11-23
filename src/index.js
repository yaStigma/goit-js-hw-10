
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
     refs.selectList.classList.add('loading'); 


    const breeds = await fetchBreeds();
    

    refs.selectList.innerHTML = '';

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.selectList.appendChild(option);
    });
      
 refs.selectList.classList.remove('loading');
clearError();
 
    refs.selectList.addEventListener('change', async function () {
      const selectedBreedId = refs.selectList.value;

   
      if (selectedBreedId) {
        try {
          refs.selectList.classList.add('loading');
          const catInfo = await fetchCatByBreed(selectedBreedId);
          displayCatInfo(catInfo[0]); 
        clearError();
        } catch (error) {
          console.error(error.message);
           showError();
        } finally {
          refs.selectList.classList.remove('loading');
        }
        
      } else {
       
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
  
 
  function displayCatInfo(cat) {
    refs.infoContainer.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Темперамент: ${cat.breeds[0].temperament}</p>
    `;
  }


  function clearCatInfo() {
    refs.infoContainer.innerHTML = '';
  }
});