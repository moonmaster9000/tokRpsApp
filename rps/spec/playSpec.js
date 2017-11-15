function Requests() {
    this.play = function (p1, p2, observer) {
        new PlayRequest(p1, p2, observer).process()
    }
}

function PlayRequest(p1, p2, observer){
    this.process = function(){
        if (invalid(p1) || invalid(p2))
            observer.invalid()
        else if (draw())
            observer.tie()
        else if (p1ShapeWins()
        )
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    function draw() {
        return p1 === p2
    }

    function p1ShapeWins() {
        return  p1 === "rock"     && p2 === "scissors" ||
                p1 === "scissors" && p2 === "paper"    ||
                p1 === "paper"    && p2 === "rock"
    }

    const VALID_SHAPES = ["rock", "paper", "scissors"]

    function invalid(t) {
        return !VALID_SHAPES.includes(t)
    }
}


describe("play", function () {
    let observer, requests

    beforeEach(function () {
        requests = new Requests()
    })

    describe("p1 win scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p1Wins"])
        })
        it("rock v. scissors", function () {
            requests.play("rock", "scissors", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            requests.play("scissors", "paper", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            requests.play("paper", "rock", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            requests.play("scissors", "rock", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            requests.play("paper", "scissors", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            requests.play("rock", "paper", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it("rock v. rock", function () {
            requests.play("rock", "rock", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            requests.play("paper", "paper", observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            requests.play("scissors", "scissors", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["invalid"])
        })

        it("<INVALID> v. rock", function () {
            requests.play(invalidThrow(), "rock", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("rock v. <INVALID>", function () {
            requests.play("rock", invalidThrow(), observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("same invalid throws for p1 and p2", function () {
            requests.play("sailboat", "sailboat", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        function invalidThrow() {
            return Math.random();
        }
    })
})