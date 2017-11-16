const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitHandler() {
        this.props.requests.play("p1 throw placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({result: "INVALID!"})
    }

    tie(){
        this.setState({result: "TIE!"})
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
    
    describe("when the request processes as 'TIE'", function () {
        beforeEach(function () {
            renderApp({play: (p1, p2, observer) => observer.tie()})
        })

        it("displays 'TIE!'", function () {
            expect(page()).not.toContain("TIE!")
            submitForm()
            expect(page()).toContain("TIE!")
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

    function renderApp(requestStub) {
        ReactDOM.render(
            <PlayForm requests={requestStub}/>,
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










