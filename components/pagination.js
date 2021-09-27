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


    if(currentPage === 1) {
        console.log(currentPage)
        leftArrow.className = "btn btn-prev btn-disabled"
    } else {
        leftArrow.className = "btn btn-prev"
        leftArrow.addEventListener('click', onArrowClick)
    }


    leftArrow.data = {type: 'prev'};


    controls.appendChild(leftArrow)

    //individual page buttons
    const startP = Math.max(currentPage-2, 1)
    const numberOfButtons = Math.min(totalPages, 5)
    const endP = Math.min(startP+(numberOfButtons-1), totalPages)

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

    //next page button
    const rightArrow = document.createElement('img')
    rightArrow.src = chevronRightIcon
    rightArrow.alt = "Next page icon"



    if(currentPage === totalPages) {
        console.log(currentPage)
        rightArrow.className = "btn btn-next btn-disabled"
    } else {
        rightArrow.className = "btn btn-next"
        rightArrow.addEventListener('click', onArrowClick)
    }



    rightArrow.data = {type: 'next'};
    

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

