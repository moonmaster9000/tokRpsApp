const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitHandler() {
        this.props.requests.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({result: "INVALID!"})
    }

    p1Wins(){
        this.setState({result: "P1 Wins!!!!"})
    }

    p2Wins(){
        this.setState({result: "P2 Wins!!!!"})
    }

    tie(){
        this.setState({result: "TIE!"})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.result}
            <input name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input name="p2Throw" onChange={this.inputChanged.bind(this)}/>
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
    
    describe("when the request processes as 'P1 Wins!!!'", function () {
        beforeEach(function () {
            renderApp({play: (p1, p2, observer) => observer.p1Wins()})
        })

        it("displays 'P1 Wins!!!!'", function () {
            expect(page()).not.toContain("P1 Wins!!!!")
            submitForm()
            expect(page()).toContain("P1 Wins!!!!")
        })
    })

    describe("when the request processes as 'P2 Wins!!!'", function () {
        beforeEach(function () {
            renderApp({play: (p1, p2, observer) => observer.p2Wins()})
        })

        it("displays 'P2 Wins!!!!'", function () {
            expect(page()).not.toContain("P2 Wins!!!!")
            submitForm()
            expect(page()).toContain("P2 Wins!!!!")
        })
    })

    it("sends the user's input to the play request", function () {
        let playSpy = jasmine.createSpy("playSpy")

        renderApp({play: playSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
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

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

    afterEach(function () {
        cleanupDOM()
    })

    function renderApp(requestsDouble) {
        ReactDOM.render(
            <PlayForm requests={requestsDouble}/>,
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










