const colors = [];



export function colorMenu(colorClick) {

    const colorMenu = document.createElement('div')
    colorMenu.className = ('colormenu')

    const any = document.createElement('span')
    any.id = 'any'
    any.className = 'color'
    colorMenu.appendChild(any)
    colors.push(any)

    const red = document.createElement('span')
    red.id = 'red'
    red.className = 'color'
    colorMenu.appendChild(red)
    colors.push(red)

    const purple = document.createElement('span')
    purple.id = 'purple'
    purple.className = 'color'
    colorMenu.appendChild(purple)
    colors.push(purple)

    const blue = document.createElement('span')
    blue.id = 'blue'
    blue.className = 'color'
    colorMenu.appendChild(blue)
    colors.push(blue)

    const green = document.createElement('span')
    green.id = 'green'
    green.className = 'color'
    colorMenu.appendChild(green)
    colors.push(green)


    colors.forEach(c => {
        c.addEventListener('click', colorClick)
    })


    return colorMenu;

}






export function updateColorMenu(currentColor) {


    colors.forEach(color => {

  
        if (color.id === currentColor){
            color.className = "color color-active"
        } else {
            color.className = "color"
        }

    })

}


