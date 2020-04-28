import React from 'react';

class App extends React.Component {

render () {

  return <div>
  <h1>Rock Paper Scissors with React</h1>
  <Game />
  </div>
}
}


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.rock = this.rock.bind(this)
  }

  rock () {
    console.log("Rock's chosen");
  }

  paper() {
    console.log("paper chosen")
  }

  scissors() {
    console.log("Scissors chosen")
  }

  render() {
    return <div> 
      <button onClick={this.rock}> Rock </button>
      <button> Paper </button>
      <button> Scissors </button>

      <span>Game status</span>
      <span> |  Oponent Choice</span>
    </div>

  }
}
export default App;
