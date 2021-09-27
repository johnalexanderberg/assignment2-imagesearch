export const pagination = (currentPage, totalPages, onPageClick, onArrowClick) => {


    if (totalPages < 2 || currentPage > totalPages) {
        return
    }

    const chevronLeftIcon = "icons/chevron_left_black_24dp.svg"
    const chevronRightIcon = "icons/chevron_right_black_24dp.svg"

    //parent element for pagination controls
    const controls = document.createElement('div')
    controls.className = 'pagination_controls'

    //previous page button
    const leftArrow = document.createElement('img')
    leftArrow.src = chevronLeftIcon
    leftArrow.alt = "Previous page icon"
    leftArrow.className = "btn btn-prev"
    leftArrow.data = {type: 'prev'};
    leftArrow.addEventListener('click', onArrowClick)

    controls.appendChild(leftArrow)

    //individual page buttons
    const startP = Math.max(currentPage-2, 1)
    const numberOfButtons = Math.min(totalPages, 5)
    const endP = startP+numberOfButtons-1

    for(let i = startP; i <= endP; i++){

        const pageButton = document.createElement('button')
        pageButton.className = 'btn btn-page';

        if (i === currentPage){
            pageButton.className += ' btn-active';
        }

        //save index data to button
        pageButton.textContent = i
        pageButton.data = {index: i};
        pageButton.addEventListener('click', onPageClick)

        controls.appendChild(pageButton)
    }

    //previous page button
    const rightArrow = document.createElement('img')
    rightArrow.src = chevronRightIcon
    rightArrow.alt = "Next page icon"
    rightArrow.className = "btn btn-next"
    rightArrow.data = {type: 'next'};
    rightArrow.addEventListener('click', onArrowClick)

    controls.appendChild(rightArrow)


    return controls
}


/* for testing
handleClick = (e) => {
    console.log(e.target.data)
}

container = document.querySelector('.pagination_container')
pag = pagination(12, 32, handleClick, handleClick, handleClick)
container.appendChild(pag)*/

