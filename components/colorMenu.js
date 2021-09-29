const colorButtons = [];

export const colorMenu = (colorClick, colors) => {

    const colorMenu = document.createElement('div')
    colorMenu.className = ('colormenu')

    colors.forEach(color => {
        const colorButton = document.createElement('span')
        colorButton.id = color
        colorButton.className = 'color'
        colorButton.addEventListener('click', colorClick)
        colorMenu.appendChild(colorButton)
        colorButtons.push(colorButton)

        if (color === 'any') colorButton.className += " color-active"
    })

    return colorMenu;
}

export function updateColorMenu(currentColor) {

    colorButtons.forEach(color => {
        color.id === currentColor ? color.className = "color color-active" : color.className = "color"
    })

}


