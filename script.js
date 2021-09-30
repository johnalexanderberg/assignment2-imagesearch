const results = document.querySelector('.results')
const paginationContainer = document.querySelector('.pagination_container')
const colorsContainer = document.querySelector('.colors_container')
const header = document.querySelector('header')
const main = document.querySelector('main');



import {pagination} from './components/pagination.js'
import {image} from './components/image.js'
import {colorMenu, updateColorMenu} from './components/colorMenu.js'
import {searchBar} from './components/searchBar.js'
import {modal} from './components/modal.js'

const apiKey = '23472129-87dbba91496484c11f27a91c2';
const resultsPerPage = 10;

let query = '';

let previousWindowSize = document.body.clientWidth;
let totalHits;
let numberOfPages = 1;
let currentPage = 1;
let json = [];
let data = [];

// number of placeholders on start page
data.length = 6;

const colors = ['any', 'red', 'purple', 'blue', 'green']
let currentColor = '';

const searchPixabay = () => {

    let searchColor = "," + currentColor;

    //empty string will search for any color
    if (currentColor === 'any') {
        searchColor = '';
    }

    const params = new URLSearchParams({
        key: apiKey,
        q: query + searchColor,
        per_page: resultsPerPage,
        page: currentPage,
    });


    fetch("https://pixabay.com/api/?" + params.toString())
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

    query && searchPixabay()
}

function handlePageClick(e) {
    currentPage = e.target.data.index
    searchPixabay()
}

const handleSubmit = (e) => {
    // stop the form from going to the next page
    e.preventDefault();

    currentPage = 1;

    searchPixabay();
}

const handleInputChange = (e) => {

    query = e.target.value

}

function handleArrowClick(e) {

    e.target.data.type === 'next' ? currentPage++ : currentPage--
    searchPixabay()

}

function handleModalClick(e) {
    document.body.removeChild(e.target)
    main.className = "";
}

const handleImageClick = (e) => {

    main.className = "blurred";
    const m = modal(e.target.src, handleModalClick);

    document.body.appendChild(m)
}

const renderImages = () => {
    // clear results
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // render new results
    for (let i = 0; i < data.length; i++) {
        const imageElement = image(data[i], handleImageClick)
        results.appendChild(imageElement)
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

    paginationElement && paginationContainer.appendChild(paginationElement)
}


function handleResize() {

    if (document.body.clientWidth > 900 && previousWindowSize < 900){
        renderPagination()
        previousWindowSize = document.body.clientWidth
    }

    if (document.body.clientWidth < 900 && previousWindowSize > 900){
        renderPagination()
        previousWindowSize = document.body.clientWidth
    }
}

//create search bar, color menu & load image placeholders
window.addEventListener('resize', handleResize)
colorsContainer.appendChild(colorMenu(handleColorClick, colors))
header.appendChild(searchBar(handleSubmit, handleInputChange, "Search Pixabay..."))
updatePage()

