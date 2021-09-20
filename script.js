const quoteTag = document.querySelector(".quote");
const authorTag = document.querySelector(".author");
const searchButton = document.querySelector("#searchButton");
inputForm = document.querySelector("#searchInput")
colorSelector = document.querySelector("#colorsSelector")





const imageGrid = document.querySelector(".image_grid");

const apiKey = '23472129-87dbba91496484c11f27a91c2';

let data = [];
let search = "";
let color = colorSelector.value;



const getQuote = function () {

    for(let i = 0; i < data.length ; i++) {

    const image = document.createElement( "img" ) ;
    image.src = data[i].largeImageURL;
    image.alt = "test";
    imageGrid.appendChild(image)

        if (i === 9){
            break
        }

    }

}


function fetchData() {


    fetch("https://pixabay.com/api/?key=23472129-87dbba91496484c11f27a91c2&q="+search+","+color)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData.hits;
            getQuote();
        });
}


function handleClick() {
    color = colorSelector.value;
    console.log(colorSelector.value)
    search = inputForm.value;
    fetchData();
}

searchButton.addEventListener('click', handleClick)


