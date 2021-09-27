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


export const imageElement = (hit) => {


        const singleResult = document.createElement('div')
        singleResult.className = 'single-result'

        const imageContainer = document.createElement( 'div' )
        const image = document.createElement('img')
        image.className = 'div'
        image.src = hit.largeImageURL;
        image.alt = hit.tags;


        const tags = document.createElement('h2')
        tags.textContent = hit.tags

        const createdBy = document.createElement('p')
        createdBy.textContent = "Provided by: " + hit.user


        imageContainer.appendChild(image)
        singleResult.appendChild(imageContainer)
        singleResult.appendChild(tags)
        singleResult.appendChild(createdBy)
        return singleResult;

}