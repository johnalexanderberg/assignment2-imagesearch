const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const results = document.querySelector('.results')

//data
const apiKey = '23472129-87dbba91496484c11f27a91c2';
const numberOfPlaceholders = 6;
let data = [];

const color = '';


//set up page

function createPlaceHolder(){

        //create elements
        const singleResult = document.createElement('div')
        singleResult.className = 'single-result'

        const imageContainer = document.createElement('div')
        imageContainer.className = 'image'


        const title = document.createElement('h2')

        const tags = document.createElement('p')


        const loadingTitle = document.createElement('span')
        loadingTitle.className = 'loading'

        const loadingTags = document.createElement('span')
        loadingTags.className = 'loading'


        // add to DOM

        singleResult.appendChild(imageContainer)
        title.appendChild(loadingTitle)
        tags.appendChild(loadingTags)
        singleResult.appendChild(title)
        singleResult.appendChild(tags)

    return singleResult;

}

function loadScreen() {

    // create placeholders for loading screen
    for(let i = 0; i < numberOfPlaceholders; i++) {
        results.appendChild(createPlaceHolder())

    }
}

loadScreen();


const loadImages = () => {

    // clear results
    while(results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // loop over data
    for(let i = 0; i < data.length && i < 9; i++) {

        const singleResult = document.createElement('div')
        singleResult.className = 'single-result'

        const imageContainer = document.createElement( 'div' )
        const image = document.createElement('img')
        image.className = 'div'
        image.src = data[i].largeImageURL;
        image.alt = "test";


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


const searchPixabay = (query) => {

    fetch("https://pixabay.com/api/?key=" +apiKey +"&q="+query+","+color)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData.hits;
            loadImages();
            console.log(data)
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