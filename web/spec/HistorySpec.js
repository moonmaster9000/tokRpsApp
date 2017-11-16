const React = require("react")
const ReactDOM = require("react-dom")
const {Round} = require("rps")
const localize = require("../src/localize")
const History = require("../src/components/History")

describe("history", function () {
    describe("when the request says there are no rounds", function () {
        beforeEach(function () {
            render({getHistory: (observer) => observer.noRounds() })
        })

        it("displays 'NO ROUNDS'", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when the request responds with an invalid round", function () {
        beforeEach(function () {
            renderAndRespondWithRound("rock", "sailboat", "invalid")
        })

        it("displays the round result", function () {


            expect(page()).toContain("rock")
            expect(page()).toContain("sailboat")
            expect(page()).toContain(localize("invalid"))
        })
    })

    describe("when the request responds with an p1Wins round", function () {
        beforeEach(function () {
            renderAndRespondWithRound("rock", "scissors", "p1Wins")
        })

        it("displays the round result", function () {
            expect(page()).toContain("rock")
            expect(page()).toContain("scissors")
            expect(page()).toContain(localize("p1Wins"))
        })
    })

    describe("when the request responds with an p2Wins round", function () {
        beforeEach(function () {
            renderAndRespondWithRound("scissors", "rock", "p2Wins")
        })

        it("displays the round result", function () {
            expect(page()).toContain("scissors")
            expect(page()).toContain("rock")
            expect(page()).toContain(localize("p2Wins"))
        })
    })

    describe("when the request responds with an tie round", function () {
        beforeEach(function () {
            renderAndRespondWithRound("rock", "rock", "tie")
        })

        it("displays the round result", function () {
            expect(page()).toContain("rock")
            expect(page()).toContain("rock")
            expect(page()).toContain(localize("tie"))
        })
    })

    function renderAndRespondWithRound(p1Throw, p2Throw, result) {
        render({getHistory: (observer) => observer.rounds([new Round(p1Throw, p2Throw, result)])})
    }

    function render(requestsDouble) {
        renderComponent(<History localize={localize} requests={requestsDouble}/>)
    }
})