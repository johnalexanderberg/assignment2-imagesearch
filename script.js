const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const results = document.querySelector('.results')
const paginationContainer = document.querySelector('.pagination_container')
const colorsContainer = document.querySelector('.colors_container')
console.log(colorsContainer)



import { pagination } from '/components/pagination.js'
import { createPlaceHolder, imageElement } from '/components/image.js'
import { colorMenu, updateColorMenu } from './components/colorMenu.js'

//data
const apiKey = '23472129-87dbba91496484c11f27a91c2';
const numberOfPlaceholders = 6;
const resultsPerPage = 10;

let query = '';

let totalHits;
let numberOfPages = 1;
let currentPage = 1;
let json = [];
let data = [];

let currentColor = '';




const handleColorClick = (e) => {
    
    if (e.target.id === currentColor) return

    currentColor = e.target.id
    updateColorMenu(currentColor);

    searchPixabay()
}



//set up default page

    for(let i = 0; i < numberOfPlaceholders; i++) {
        results.appendChild(createPlaceHolder())

    }

  
    colorsContainer.appendChild(colorMenu(handleColorClick))


const renderImages = () => {

    // clear results
    while(results.firstChild) {
        results.removeChild(results.firstChild);
    }


    // loop over data
    for(let i = 0; i < data.length; i++) {

        const image = imageElement(data[i])
        results.appendChild(image)

    }
}

function updatePage(){

        renderImages()
        renderPagination()
}

function handlePageClick(e) {
    currentPage = e.target.data.index
    searchPixabay()
}

function renderPagination() {
    while(paginationContainer.firstChild){
    paginationContainer.removeChild(paginationContainer.firstChild)
    }

    const paginationElement = pagination(currentPage, numberOfPages, handlePageClick, handleArrowClick)

    paginationContainer.appendChild(paginationElement)
}

const searchPixabay = () => {

    let searchColor = "," +currentColor;

    if (currentColor === 'any'){
        searchColor = '';
    }
    


    fetch("https://pixabay.com/api/?key=" +apiKey +"&q="+query+searchColor+ "&per_page="+resultsPerPage+"&page="+currentPage)
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

    query = inputTag.value
    currentPage = 1;
    searchPixabay();

    // stop the form from going to the next page
    event.preventDefault();


}

formTag.addEventListener('submit', handleSubmit)







function handleArrowClick(e) {

    //if prev button
    if (e.target.data.type === 'next')
    currentPage ++;

    searchPixabay()

    //if next button
    if (e.target.data.type === 'prev'){
        currentPage --;
        searchPixabay()
    }

}


