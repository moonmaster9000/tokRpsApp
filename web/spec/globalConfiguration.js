const ReactDOM = require("react-dom")

function renderComponent(component){
    ReactDOM.render(component, domFixture)
}

var domFixture

function setupDOM() {
    domFixture = document.createElement("div")
    document.body.appendChild(domFixture)
}

beforeEach(function () {
    setupDOM()
})

function cleanupDOM() {
    domFixture.remove()
}

function fillIn(inputName, inputValue) {
    let input = document.querySelector(`[name='${inputName}']`)
    input.value = inputValue
    ReactTestUtils.Simulate.change(input)
}

afterEach(function () {
    cleanupDOM()
})

function page() {
    return domFixture.innerText;
}

function submitForm() {
    document.querySelector("button").click()
}


window.renderComponent = renderComponent
window.domFixture = domFixture
window.page = page