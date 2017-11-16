function Requests() {
    this.playRound = function (p1Throw, p2Throw, observer, repo) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function(observer,  repo){
        if (repo.isEmpty()){
            observer.noRounds()
        } else {
            observer.rounds(repo.getAll())
        }
    }
}

function Round(){

}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo){
    this.process = function(){
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw)) {
            repo.save(new Round(p1Throw, p2Throw, "invalid"))
            observer.invalid()
        } else if (tie())
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

module.exports = {Requests, Round}