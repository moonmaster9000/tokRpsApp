const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitHandler() {
        this.setState({result: "INVALID!"})
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}

describe("PlayForm", function () {
    describe("when the request processes as 'INVALID'", function () {
        beforeEach(function () {
            renderApp({play: (p1, p2, observer) => observer.invalid()})
        })

        it("displays 'INVALID!'", function () {
            expect(page()).not.toContain("INVALID!")
            submitForm()
            expect(page()).toContain("INVALID!")
        })
    })

    let domFixture

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

    afterEach(function () {
        cleanupDOM()
    })

    function renderApp(alwaysInvalidRequest) {
        ReactDOM.render(
            <PlayForm requests={alwaysInvalidRequest}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})










