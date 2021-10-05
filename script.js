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
let currentSearchValue = '';

let previousWindowSize = document.body.clientWidth;
let totalHits;
let numberOfPages = 1;
let currentPage = 1;
let hits = [];

// number of empty images on start page
hits.length = 6;

const colors = ['any', 'red', 'lilac', 'blue', 'green']
let currentColor = '';

const searchPixabay = () => {

    const params = new URLSearchParams({
        key: apiKey,
        q: query,
        per_page: resultsPerPage,
        page: currentPage,
        colors: currentColor === 'any' ? null : currentColor,
    });

    console.log(params)


    fetch("https://pixabay.com/api/?" + params.toString())
        .then((response) => response.json())
        .then((jsonData) => {
            hits = jsonData.hits;
            totalHits = jsonData.total
            numberOfPages = Math.ceil(totalHits / resultsPerPage);

            updatePage();
        });


}


// event handlers

const handleColorClick = (e) => {

    if (e.target.id === currentColor) return

    currentColor = e.target.id
    updateColorMenu(currentColor, e.target.parentNode);

    query = currentSearchValue

    currentPage = 1;
    query && searchPixabay()
}

function handlePageClick(e) {
    currentPage = e.target.data.index
    searchPixabay()
}

const handleSubmit = (e) => {
    // stop the form from going to the next page
    e.preventDefault();

    query = document.querySelector('input').value

    currentPage = 1;

    searchPixabay();
}

const handleInputChange = (e) => {

    currentSearchValue = e.target.value

}

function handleArrowClick(e) {

    e.target.data.type === 'next' ? currentPage++ : currentPage--
    searchPixabay()

}

function handleModalClick(e) {

    //do nothing if the click happened within the image
   if (e.target.className === ('modal-image')){
       return
   }

   //else remove modal & background blur
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
    const errormessage = document.querySelector('.noresults')
    if (errormessage)
    {
        document.body.removeChild(errormessage)
    }

    // render new results
    if (hits.length === 0) {
        
        const response = document.createElement('p')
        document.body.appendChild(response)
        response.className='noresults'
        response.textContent = 'Your search was unsuccessful please try again!'
    }
    else {
        for (let i = 0; i < hits.length; i++) {
            const imageElement = image(hits[i], handleImageClick)
            results.appendChild(imageElement)
        }
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

    //render new pagination (for max 500 results because of pixabay limit)
    const paginationElement = pagination(currentPage, Math.min(numberOfPages, 500/resultsPerPage), handlePageClick, handleArrowClick)

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

