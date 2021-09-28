const colorButtons = [];

export function colorMenu(colorClick) {

    const colors = ['any', 'red', 'purple', 'blue', 'green']

    const colorMenu = document.createElement('div')
    colorMenu.className = ('colormenu')

    colors.forEach(color => {
        const colorButton = document.createElement('span')
        colorButton.id = color
        colorButton.className = 'color'
        colorButton.addEventListener('click', colorClick)
        colorMenu.appendChild(colorButton)
        colorButtons.push(colorButton)
    })

    return colorMenu;
}

export function updateColorMenu(currentColor) {

    colorButtons.forEach(color => {
        color.id === currentColor ? color.className = "color color-active" : "color"
    })

}


