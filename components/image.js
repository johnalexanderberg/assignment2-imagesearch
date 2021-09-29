export const image = (hit) => {

        const singleResult = document.createElement('div')
        singleResult.className = 'single-result'
        const imageContainer = document.createElement( 'div' )
        imageContainer.className = 'image'
        const image = document.createElement('img')
        const tags = document.createElement('h2')
        const createdBy = document.createElement('p')

    if (hit){ // if there is data, load images
        image.src = hit.largeImageURL;
        image.alt = hit.tags;
        tags.textContent = hit.tags
        createdBy.textContent = "Provided by: " + hit.user
        imageContainer.appendChild(image)

    } else { // else load placeholders
        const tagsPlaceholder = document.createElement('span')
        tagsPlaceholder.className = 'loading'
        tags.appendChild(tagsPlaceholder)
        const createdByPlaceholder = document.createElement('span')
        createdByPlaceholder.className = 'loading'
        createdBy.appendChild(createdByPlaceholder)
    }
    
        singleResult.appendChild(imageContainer)
        singleResult.appendChild(tags)
        singleResult.appendChild(createdBy)
        return singleResult;

}