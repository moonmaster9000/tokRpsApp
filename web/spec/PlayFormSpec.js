const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")
const localize = require("../src/localize")

describe("Play Form Presentation Logic", function () {
    describe("when the request processes as 'INVALID'", function () {
        beforeEach(function () {
            render({playRound: (p1, p2, observer) => observer.invalid()})
        })

        it("displays 'INVALID!'", function () {
            expect(page()).not.toContain(localize("invalid"))
            submitForm()
            expect(page()).toContain(localize("invalid"))
        })
    })
    
    describe("when the request processes as 'TIE'", function () {
        beforeEach(function () {
            render({playRound: (p1, p2, observer) => observer.tie()})
        })

        it("displays 'TIE!'", function () {
            expect(page()).not.toContain(localize("tie"))
            submitForm()
            expect(page()).toContain(localize("tie"))
        })
    })
    
    describe("when the request processes as 'P1 Wins!!!'", function () {
        beforeEach(function () {
            render({playRound: (p1, p2, observer) => observer.p1Wins()})
        })

        it("displays 'P1 Wins!!!!'", function () {
            expect(page()).not.toContain(localize("p1Wins"))
            submitForm()
            expect(page()).toContain(localize("p1Wins"))
        })
    })

    describe("when the request processes as 'P2 Wins!!!'", function () {
        beforeEach(function () {
            render({playRound: (p1, p2, observer) => observer.p2Wins()})
        })

        it("displays 'P2 Wins!!!!'", function () {
            expect(page()).not.toContain(localize("p2Wins"))
            submitForm()
            expect(page()).toContain(localize("p2Wins"))
        })
    })

    it("sends the user's input to the play request", function () {
        let playSpy = jasmine.createSpy("playSpy")

        render({playRound: playSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })

    function render(requestsDouble) {
        renderComponent(<PlayForm localize={localize} requests={requestsDouble}/>)
    }

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})










