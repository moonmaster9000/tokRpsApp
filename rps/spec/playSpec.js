const {Requests} = require("../src/rps")
const FakeRoundRepo = require("../src/FakeRoundRepo")

describe("play round", function () {
    let observer, requests

    beforeEach(function () {
        requests = new Requests(new FakeRoundRepo())
    })

    describe("p1 win scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p1Wins"])
        })
        it("rock v. scissors", function () {
            requests.playRound("rock", "scissors", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            requests.playRound("scissors", "paper", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            requests.playRound("paper", "rock", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            requests.playRound("scissors", "rock", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            requests.playRound("paper", "scissors", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            requests.playRound("rock", "paper", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it("rock v. rock", function () {
            requests.playRound("rock", "rock", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            requests.playRound("paper", "paper", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            requests.playRound("scissors", "scissors", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["invalid"])
        })

        it("<INVALID> v. rock", function () {
            requests.playRound(invalidThrow(), "rock", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("rock v. <INVALID>", function () {
            requests.playRound("rock", invalidThrow(), observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("same invalid throws for p1 and p2", function () {
            requests.playRound("sailboat", "sailboat", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        function invalidThrow() {
            return Math.random();
        }
    })
})