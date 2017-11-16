function Requests(repo) {
    this.playRound = function (p1Throw, p2Throw, observer) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function (observer) {
        if (repo.isEmpty()) {
            observer.noRounds()
        } else {
            observer.rounds(repo.getAll())
        }
    }
}

function Round(p1Throw, p2Throw, result) {
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo) {
    this.process = function () {
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            handleResult("invalid")
        else if (tie())
            handleResult("tie")
        else if (p1Wins())
            handleResult("p1Wins")
        else
            handleResult("p2Wins")
    }

    function handleResult(result) {
        repo.save(new Round(p1Throw, p2Throw, result))
        observer[result]()
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper" ||
            p1Throw === "paper" && p2Throw === "rock"
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function invalidThrow(t) {
        return !VALID_THROWS.includes(t)
    }
}

module.exports = {Requests, Round}