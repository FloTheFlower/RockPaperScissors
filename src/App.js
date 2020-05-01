import React from 'react';
import logo from './logo.jpg';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      games: [],
      idx: 0, 
      gamesPlayed: 0,
      gamesWon: 0
    };

    this.createNewGame = this.createNewGame.bind(this);

  }


handleGameUpdate(e) {
  if (e.type === "play")  {
this.setState((state, props ) => ({gamesPlayed: state.gamesPlayed +1 }))
  } else {
    //reset 
    this.setState((state, props) => ({gamesPlayed: state.gamesPlayed -1}));
  }
}


createNewGame(){
  console.log("Creating New Game!")

  let game = <li key={this.state.idx}>
    
  
     <Game/> </li>;

  this.setState((state, props) => {
    console.log(this.state.idx)
    state.games.push(game);
    return {
      games: state.games, 
      idx: state.idx + 1
    }
  })

}

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
  <Stats gamesPlayed={this.state.gamesPlayed} 
  
  gamesWon={this.state.gamesWon} />
  <ul>  
   
    {this.state.games} 
    
  </ul>
  <button className="space" onClick={this.createNewGame}> New Game</button>
  </div>
}
}


class Stats extends React.Component{
  render() {
    let rate = this.props.gamesPlayed ? this.props.gamesWon / this.props.gamesPlayed : 0;

    let roundedRate = Math.round((rate+ Number.EPSILON) * 100) / 180;
    return <div className="space"> 
    <span>Games Played   {this.props.gamesPlayed}:      | Games won:    {this.props.gamesWon}   | Win rate: {roundedRate} </span> 
    
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
    this.reset  = this.reset.bind(this);
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

  reset() {
    console.log("Resetting game")
    this.setState({
      played: false

    })
  }

  render() {
    let stat = this.state.played ? statusCodeToText(this.state.status) : " " ;
    let op = this.state.played ? this.state.oponentMove : " ";

    let resetBtn = this.state.played ? <button onClick={this.reset}> Reset </button> : null;


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
     
    <div className="space">
    {resetBtn}
      </div> 
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

function statusCodeToText (status) {
if (status === -1) return "Loss";
if (status === 0) return "Draw";
if (status === 1 ) return "Won";
}



export default App;
