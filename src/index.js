/*
1. робимо запит на сервер 
2. вішаємо слухача подій на select по кліку -> виводиться випадаючий список
3. Викликати функцію для запиту на сервер і передати породу кішки
3.1 створити розмітку , перебор масиву даних
3.2 відмальовати розмітку на сторінці
4.1 описати функцію (у якості параметру буде порода кішки, за дефолтом перша)
4.2 повертаємо результат виклику функції фетч (в середині робимо запит та стандартні перевірки )



*/
import axios from "axios";

const refs = {
    catBox: document.querySelector(".cat-info"),
    selectList: document.querySelector(".breed-select"),

}
let breed = 1;

function serviceCat(breed) {
    const BASE_URL = "https://api.thecatapi.com/v1";
    const END_POINT = "images/search";
    const API_KEY = "live_ 9oOQb3YZa95vuFJjY96Zv3AmqV5jQ8 nftsmTivVFLfy1KInjHp0Zz85PNAIv mFaE";

    const params = new URLSearchParams({
        api_key: API_KEY,
        breed
    })
}