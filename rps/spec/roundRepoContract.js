const {Round} = require("../src/rps")

function roundRepoContract(RoundRepo){
    describe("round repo contract", function () {
        let repo

        beforeEach(function () {
            repo = new RoundRepo()
        })

        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                repo.save(new Round())

                expect(repo.isEmpty()).toBe(false)
            })

            it("returns the rounds", function () {
                let round = new Round()

                repo.save(round)

                expect(repo.getAll()).toEqual([round])
            })
        })
    })
}

module.exports = roundRepoContract