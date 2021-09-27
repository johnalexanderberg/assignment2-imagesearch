export function createPlaceHolder(){

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