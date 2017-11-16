function localize(result){
    return {
        invalid: "INVALID!",
        p1Wins: "P1 Wins!!! Woohoo!",
        p2Wins: "P2 Wins!!! All right!",
        tie: "TIE? Sad."
    }[result]
}

module.exports = localize