export const pagination = (currentPage, totalPages, onPageClick, onArrowClick) => {

    if (totalPages < 2 || currentPage > totalPages) {
        return
    }

    //parent element for pagination buttons
    const pagination = document.createElement('div')
    pagination.className = 'pagination_controls'

    //previous page button
    const leftArrow = document.createElement('img')
    leftArrow.src = "icons/chevron_left_black_24dp.svg"
    leftArrow.alt = "Previous page icon"

    //disable on first page
    leftArrow.className = currentPage === 1 ? "btn btn-prev btn-disabled" : "btn btn-prev"
    currentPage !== 1 && leftArrow.addEventListener('click', onArrowClick)

    leftArrow.data = {type: 'prev'};

    pagination.appendChild(leftArrow)

    //individual page buttons


    const numberOfButtons = document.body.clientWidth > 900 ? Math.min(totalPages, 10) : Math.min(totalPages, 5)

    let startP = Math.max(currentPage - Math.round(numberOfButtons/2-1), 1)
    const endP = Math.min(startP + (numberOfButtons - 1), totalPages)

    //make sure to display all buttons when browsing the last few pages
    if (totalPages > numberOfButtons && currentPage > totalPages-numberOfButtons/2-1) {
        startP = totalPages - numberOfButtons;
    }


    for (let i = startP; i <= endP; i++) {

        const pageButton = document.createElement('button')
        pageButton.className = 'btn btn-page';

        if (i === currentPage) {
            pageButton.className += ' btn-active';
        }

        //save index data to button
        pageButton.textContent = i
        pageButton.data = {index: i};
        pageButton.addEventListener('click', onPageClick)

        pagination.appendChild(pageButton)
    }

    //next page button
    const rightArrow = document.createElement('img')
    rightArrow.src = "icons/chevron_right_black_24dp.svg"
    rightArrow.alt = "Next page icon"


    //disable on last page
    rightArrow.className = currentPage === totalPages ? "btn btn-next btn-disabled" : "btn btn-next"
    currentPage !== totalPages && rightArrow.addEventListener('click', onArrowClick)

    rightArrow.data = {type: 'next'};

    pagination.appendChild(rightArrow)

    return pagination
}

