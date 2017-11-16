const {Requests, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let requests

    beforeEach(function () {
        requests = new Requests(new FakeRoundRepo())
    })

    describe("no one has played", function () {
        it("tell the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            requests.getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("employees have played", function () {
        let observer, playRoundObserver

        beforeEach(function () {
            playRoundObserver = { invalid(){ }, tie(){ }, p1Wins(){ }, p2Wins(){ }}
            observer = jasmine.createSpyObj("observer", ["rounds"])
        })

        describe("invalid rounds have been played", function () {
            beforeEach(function () {
                requests.playRound("rock", "sailboat", playRoundObserver)
            })

            it("sends the rounds to the observer", function () {
                requests.getHistory(observer)

                expect(observer.rounds).toHaveBeenCalledWith([
                    new Round("rock", "sailboat", "invalid"),
                ])
            })
        })

        describe("tie rounds have been played", function () {
            beforeEach(function () {
                requests.playRound("rock", "rock", playRoundObserver)
            })

            it("sends the rounds to the observer", function () {
                requests.getHistory(observer)

                expect(observer.rounds).toHaveBeenCalledWith([
                    new Round("rock", "rock", "tie"),
                ])
            })
        })

        describe("p1Wins rounds have been played", function () {
            beforeEach(function () {
                requests.playRound("rock", "scissors", playRoundObserver)
            })

            it("sends the rounds to the observer", function () {
                requests.getHistory(observer)

                expect(observer.rounds).toHaveBeenCalledWith([
                    new Round("rock", "scissors", "p1Wins"),
                ])
            })
        })

        describe("p2Wins rounds have been played", function () {
            beforeEach(function () {
                requests.playRound("scissors", "rock", playRoundObserver)
            })

            it("sends the rounds to the observer", function () {
                requests.getHistory(observer)

                expect(observer.rounds).toHaveBeenCalledWith([
                    new Round("scissors", "rock", "p2Wins"),
                ])
            })
        })
    })
})



















