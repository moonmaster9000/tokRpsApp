const {Requests, Round} = require("../src/rps")

describe("history", function () {
    describe("no one has played", function () {
        it("tell the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("employees have played", function () {
        fit("sends the rounds to the observer", function () {
            let playRoundObserver = {invalid(){}}
            let observer = jasmine.createSpyObj("observer", ["rounds"])
            let repo = {
                isEmpty(){},
                getAll(){},
                save(){}
            }

            new Requests().playRound("rock", "sailboat", playRoundObserver, repo)

            new Requests().getHistory(observer, repo)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })
})
















