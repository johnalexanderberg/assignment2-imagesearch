const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const results = document.querySelector('.results')
const paginationContainer = document.querySelector('.pagination_container')
import { pagination } from '/components/pagination.js'
import { createPlaceHolder } from '/components/image.js'

//data
const apiKey = '23472129-87dbba91496484c11f27a91c2';
let nextButton;
let previousButton;
const numberOfPlaceholders = 6;
const resultsPerPage = 10;
let totalHits;
let numberOfPages = 1;
let currentPage = 1;
let json = [];
let data = [];

const color = '';



//set up default page

    for(let i = 0; i < numberOfPlaceholders; i++) {
        results.appendChild(createPlaceHolder())

    }


const renderImages = () => {

    // clear results
    while(results.firstChild) {
        results.removeChild(results.firstChild);
    }


    // loop over data
    for(let i = 0; i < data.length; i++) {

        const singleResult = document.createElement('div')
        singleResult.className = 'single-result'

        const imageContainer = document.createElement( 'div' )
        const image = document.createElement('img')
        image.className = 'div'
        image.src = data[i].largeImageURL;
        image.alt = data[i].tags;


        const tags = document.createElement('h2')
        tags.textContent = data[i].tags

        const createdBy = document.createElement('p')
        createdBy.textContent = data[i].user


        imageContainer.appendChild(image)
        singleResult.appendChild(imageContainer)
        singleResult.appendChild(tags)
        singleResult.appendChild(createdBy)
        results.appendChild(singleResult)

    }
}

function updatePage(){

        renderImages()
        renderPagination()
}

function handlePageClick(e) {
    const query = inputTag.value
    searchPixabay(query);
    currentPage = e.target.data.index
    renderImages();
    renderPagination()
}

function renderPagination() {
    while(paginationContainer.firstChild){
    paginationContainer.removeChild(paginationContainer.firstChild)
    }

    const paginationElement = pagination(currentPage, numberOfPages, handlePageClick, handleArrowClick)

    paginationContainer.appendChild(paginationElement)
}

const searchPixabay = (query) => {

    fetch("https://pixabay.com/api/?key=" +apiKey +"&q="+query+","+color+"&per_page="+resultsPerPage+"&page="+currentPage)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData.hits;
            json = jsonData
            totalHits = jsonData.total
            numberOfPages = Math.ceil(totalHits/resultsPerPage);
            console.log('showing ' +jsonData.hits.length +"of " +totalHits)
            console.log(jsonData)
            console.log(numberOfPages)
            updatePage();
        });

}
//when we submit the form, get the info from input

const handleSubmit = (event) => {

    // get the info from input
    const query = inputTag.value

    searchPixabay(query);

    // stop the form from going to the next page
    event.preventDefault();


}

formTag.addEventListener('submit', handleSubmit)

function handleArrowClick(e) {

    //if prev button
    if (e.target.data.type === 'next')
    currentPage ++;
    const query = inputTag.value
    searchPixabay(query)

    //if next button
    if (e.target.data.type === 'prev'){
        currentPage --;
        const query = inputTag.value
        searchPixabay(query)
    }

}

