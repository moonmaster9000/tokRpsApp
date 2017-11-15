const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    render(){
        return <button>Hello World!</button>
    }
}

describe("PlayForm", function () {
    describe("when the request processes as 'INVALID'", function () {
        it("displays 'INVALID!'", function () {
            let domFixture = document.createElement("div")
            document.body.appendChild(domFixture)

            let alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            }

            ReactDOM.render(
                <PlayForm requests={alwaysInvalidRequest}/>,
                domFixture
            )

            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID!")
        })

    })
})