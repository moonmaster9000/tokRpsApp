const React = require("react")
const ReactDOM = require("react-dom")

const History = require("./components/History")
const PlayForm = require("./components/PlayForm")
const localize = require("./localize")

const {FakeRoundRepo, Requests, Round} = require("rps")

const repo = new FakeRoundRepo()
repo.save(new Round("foo", "bar", "invalid"))
repo.save(new Round("rock", "scissors", "p1Wins"))
repo.save(new Round("scissors", "rock", "p2Wins"))
repo.save(new Round("rock", "rock", "tie"))

const requests = new Requests(repo)

class App extends React.Component {
    render(){
        return <div>
            <History localize={localize} requests={requests}/>
            <PlayForm requests={requests}/>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
)