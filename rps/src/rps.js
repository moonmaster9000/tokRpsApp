function Requests() {
    this.playRound = function (p1Throw, p2Throw, observer) {
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.process = function(){
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            observer.invalid()
        else if (tie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return  p1Throw === "rock"     && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper"    ||
            p1Throw === "paper"    && p2Throw === "rock"
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function invalidThrow(t) {
        return !VALID_THROWS.includes(t)
    }
}

module.exports = {Requests}