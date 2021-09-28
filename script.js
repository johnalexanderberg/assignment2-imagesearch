const htmlFormElement = document.querySelector('form')
const htmlInputElement = htmlFormElement.querySelector('input')
const results = document.querySelector('.results')
const paginationContainer = document.querySelector('.pagination_container')
const colorsContainer = document.querySelector('.colors_container')


import {pagination} from '/components/pagination.js'
import {image} from '/components/image.js'
import {colorMenu, updateColorMenu} from './components/colorMenu.js'

const apiKey = '23472129-87dbba91496484c11f27a91c2';
const resultsPerPage = 10;

let query = '';

let totalHits;
let numberOfPages = 1;
let currentPage = 1;
let json = [];
let data = [];

// number of placeholders on start page
data.length = 6;

let currentColor = '';

const searchPixabay = () => {

    let searchColor = "," + currentColor;

    //empty string will search for any color
    if (currentColor === 'any') {
        searchColor = '';
    }

    fetch("https://pixabay.com/api/?key=" + apiKey + "&q=" + query + searchColor + "&per_page=" + resultsPerPage + "&page=" + currentPage)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData.hits;
            json = jsonData
            totalHits = jsonData.total
            numberOfPages = Math.ceil(totalHits / resultsPerPage);
            updatePage();
        });

}

// event handlers

const handleColorClick = (e) => {

    if (e.target.id === currentColor) return

    currentColor = e.target.id
    updateColorMenu(currentColor);

    searchPixabay()
}

function handlePageClick(e) {
    currentPage = e.target.data.index
    searchPixabay()
}

const handleSubmit = (event) => {
    // stop the form from going to the next page
    event.preventDefault();

    // get the info from input
    query = htmlInputElement.value
    currentPage = 1;

    searchPixabay();
}

function handleArrowClick(e) {

    e.target.data.type === 'next' ? currentPage++ : currentPage--
    searchPixabay()

}

const renderImages = () => {
    // clear results
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // render new results
    for (let i = 0; i < data.length; i++) {
        results.appendChild(image(data[i]))
    }
}

function updatePage() {

    renderImages()
    renderPagination()
}

function renderPagination() {

    //clear pagination
    while (paginationContainer.firstChild) {
        paginationContainer.removeChild(paginationContainer.firstChild)
    }

    //render new pagination
    const paginationElement = pagination(currentPage, numberOfPages, handlePageClick, handleArrowClick)

    paginationContainer.appendChild(paginationElement)
}


htmlFormElement.addEventListener('submit', handleSubmit)

//load page
renderImages()
colorsContainer.appendChild(colorMenu(handleColorClick))

