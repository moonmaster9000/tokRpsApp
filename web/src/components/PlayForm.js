const React = require("react")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitHandler() {
        this.props.requests.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({result: this.props.localize("invalid")})
    }

    p1Wins(){
        this.setState({result: this.props.localize("p1Wins")})
    }

    p2Wins(){
        this.setState({result: this.props.localize("p2Wins")})
    }

    tie(){
        this.setState({result: this.props.localize("tie")})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.result}
            <input name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input name="p2Throw" onChange={this.inputChanged.bind(this)}/>
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}

module.exports = PlayForm