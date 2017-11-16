const React = require("react")

class History extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        this.props.requests.getHistory(this)
    }

    noRounds(){
        this.setState({roundsDisplay: <NoRounds/>})
    }

    rounds(rs){
        this.setState({roundsDisplay: <Rounds localize={this.props.localize} rounds={rs}/>})
    }

    render(){
        return <div>{this.state.roundsDisplay}</div>
    }
}

class NoRounds extends React.Component {
    render(){
        return <h1>NO ROUNDS</h1>
    }
}

class Rounds extends React.Component {
    render(){
        return <div>
            <ul>
                {this.props.rounds.map((round, i) => {
                    return <li key={i}>{round.p1Throw} {round.p2Throw} {this.props.localize(round.result)}</li>
                })}
            </ul>
        </div>
    }
}

module.exports = History