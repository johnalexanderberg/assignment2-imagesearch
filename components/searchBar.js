export const searchBar = (handleSubmit, handleChange, placeholder) => {

    const form = document.createElement('form')
    const input = document.createElement('input')
    form.appendChild(input)

    input.type = 'text'
    input.name = 'search'
    input.placeholder = placeholder
    input.autocomplete = 'off'

    input.addEventListener('input', handleChange)
    form.addEventListener('submit', handleSubmit)

    return form
}