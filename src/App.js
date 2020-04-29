import React from 'react';
import logo from './logo.jpg';
import './App.css';

class App extends React.Component {

render () {

  return <div className="entireapp">
    <div className="column">
 
     
    <div className="headline">
  <h1>Rock Paper Scissors with React</h1>
  </div>
  <div>
     <img className="image" src={logo} alt="logo" />
     </div>
  
  </div>

  <Game />
  </div>
}
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false, 
      status: null, 
      playerMove: null, 
      oponentMove: null
    };
    this.rock = this.rock.bind(this);
    this.paper = this.paper.bind(this);
    this.scissors = this.scissors.bind(this);
    this.playGame = this.playGame.bind(this);
  }


  playGame(playerMove){
    if(! this.state.played) {
      let oponentMove = chooseRandomAction();
      let status = choseWinner(playerMove, oponentMove);
      this.setState({
        played: true, 
        status: status, 
        playerMove: playerMove,
        oponentMove: oponentMove
       } )
    }
  }

  rock () {
    console.log("Rock chosen");
    this.playGame("Rock");
  }

  paper() {
    console.log("paper chosen")
    this.playGame("Paper");
  }

  scissors() {
    console.log("Scissors chosen")
    this.playGame("Scissors");
  }

  render() {
    let stat = this.state.played ? this.state.status : " " ;
    let op = this.state.played ? this.state.oponentMove : " ";


    return <div className="space">
      <div className="buttons">
      <button className = "buttonspace" onClick={this.rock}> Rock </button>
      <button className = "buttonspace" onClick={this.paper}> Paper </button>
      <button className = "buttonspace" onClick={this.scissors}> Scissors </button>
      </div> 
      <div className="space">
      <span className="gamestatus">Game status: {stat} </span>
      </div>
      <div className="space">
      <span className="gamestatus">Player Choice: {this.state.playerMove} </span>
      </div>
      <div className="space">
      <span className="gamestatus">Oponent Choice: {op}</span>
      </div>
    </div>    
  }
}



function chooseRandomAction(){

  let moves = ["Rock", "Paper", "Scissors"];
  let randNr =Math.floor(Math.random() * 3);
  let randMove = moves[randNr];
  return randMove;
}


function choseWinner(playerMove, oponentMove){
if (playerMove === oponentMove) return 0;


if (playerMove === "Rock") {
  if (oponentMove === 'Paper') return -1;  //lost 
  if (oponentMove === 'Scissors') return 1; //won 
}

if (playerMove === "Paper") {
  if (oponentMove === 'Rock') return 1;  //won 
  if (oponentMove === 'Scissors') return -1;  //lost
}

if (playerMove === "Scissors") {
  if (oponentMove === 'Paper') return 1;
  if (oponentMove === 'Rock') return -1;
}
  
}



export default App;
