import axios from 'axios';

const apiKey =
  'live_9oOQb3YZa95vuFJjY96Zv3AmqV5jQ8nftsmTivVFLfy1KInjHp0Zz85PNAIvmFaE';
axios.defaults.headers.common['x-api-key'] = apiKey;

// Функція для отримання списку порід котів
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw new Error('Failed to fetch cat breeds');
  }
};

// Функція для отримання інформації про кота за ідентифікатором породи
export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
    throw new Error('Failed to fetch cat information');
  }
};
