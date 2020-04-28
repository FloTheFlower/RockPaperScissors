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
    this.paper = this.paper.bind(this)
    this.scissors = this.scissors.bind(this)
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
      <button onClick={this.paper}> Paper </button>
      <button onClick={this.scissors}> Scissors </button>

      <span>Game status</span>
      <span> |  Oponent Choice</span>
    </div>

  }
}

function chooseRandomAction(){

  let moves = ["Rock", "Paper", "Scissors"];
  let randNr =Math.floor(Math.random() * 3);
  let randMove = moves[randNr];
  return randMove;

}
export default App;
