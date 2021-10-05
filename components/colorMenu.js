export const colorMenu = (colorClick, colors) => {

    const colorButtons = [];
    const colorMenu = document.createElement('div')
    colorMenu.className = ('colormenu')

    colors.forEach(color => {
        const colorButton = document.createElement('button')
        colorButton.id = color
        colorButton.className = 'color'
        colorButton.addEventListener('click', colorClick)
        colorMenu.appendChild(colorButton)
        colorButtons.push(colorButton)

        if (color === 'any') colorButton.className += " color-active"
    })

    //save list of buttons in parent so their state can be updated later
    colorMenu.data = {
        colorButtons: colorButtons
    };

    return colorMenu;
}

export function updateColorMenu(currentColor, colorMenu) {

    colorMenu.data.colorButtons.forEach(color => {
        color.id === currentColor ? color.className = "color color-active" : color.className = "color"
    })

}


