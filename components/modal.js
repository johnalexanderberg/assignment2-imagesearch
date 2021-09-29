export const modal = (image, handleModalClick) => {

    const modal = document.createElement('div')

    modal.className = 'modal'
    modal.addEventListener('click', handleModalClick)

    const modalImage = document.createElement('img')
    modalImage.className = ('modal-image')
    modalImage.src = image;


    modal.appendChild(modalImage)
    return modal


}