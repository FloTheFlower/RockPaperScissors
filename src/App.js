import React from 'react';
import logo from './logo.jpg';
import './App.css';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import { Recipes } from './Recipes';

const client = new ApolloClient({
  uri: "http://localhost:3000"
});



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      games: [],
      idx: 0, 
      gamesPlayed: 0,
      gamesWon: 0,
      roundedRate: 0
    };

    this.createNewGame = this.createNewGame.bind(this);
    this.handleGameUpdate = this.handleGameUpdate.bind(this);
    this.handleGameDelete = this.handleGameUpdate.bind(this)

  }


handleGameUpdate(e) {
  if (e.type === "play")  {
this.setState((state, props ) => ({gamesPlayed: state.gamesPlayed +1 }))

// if (e.gamesPlayed < 0 ) {

//   this.setState((state, props) => ({gamesPlayed: state.gamesPlayed === 0}))
// }
    if(e.playerWon) {
      this.setState((state, props) => ({gamesWon: state.gamesWon + 1 }))
    } 

  } else {
    //reset   
    this.setState((state, props) => ({gamesPlayed: state.gamesPlayed -1}));
    if(e.playerWon) {
      this.setState((state, props) => ({gamesWon: state.gamesWon - 1 }))
    }
  }

  
}


handleGameDelete(e) {

  if(e.played>0){
this.setState((state, props ) => ({gamesPlayed: state.gamesPlayed  - 1 }));
  }

  if(e.playerWon > 0){
    this.setState((state, props) => ({gamesWon: state.gamesWon - 1 }))
  }

  //der unten versuchte code klappt nicht

  // else {
  //   this.setState((state, props) => ({gamesPlayed: state.gamesWon === 0}))
  // }

  // this.setState((state, props) => ({
  //   games: state.games.filter(game => game.key != e.index)

  // }))
}

createNewGame(){
  console.log("Creating New Game!")

  let game = <li key={this.state.idx}>
    
  
     <Game handleGameUpdate={this.handleGameUpdate}
     index={this.state.idx}
     handleGameDelete={this.handleGameDelete}
     /> </li>;

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
  return <div className="entireapp"> (
    <ApolloProvider client={client}>
<h1> Hello World</h1>

<Recipes />



    </ApolloProvider>
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
    let roundedRate = rate.toFixed(2)

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
    this.notifyParentOfPlay = this.notifyParentOfPlay.bind(this);
    this.notifyParentOfDelete = this.notifyParentOfDelete.bind(this);
    this.notifyParentOfReset = this.notifyParentOfReset.bind(this)
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
       }, this.notifyParentOfPlay
        )
    }
  }

  notifyParentOfPlay (){
    let playerWon = this.state.status === true; 
    this.props.handleGameUpdate({
      type: "play",
      playerWon: "playerWon"
    })
  }

  notifyParentOfDelete (){
    let playerWon = this.state.status === true; 
    this.props.handleGameDelete({
      playerWon: "playerWon", 
      played: this.state.played, 
      index: this.props.index
    })
  }

  
  notifyParentOfReset (){
    let playerWon = this.state.status == true; 
    this.props.handleGameUpdate({
      type: "reset",
      playerWon: "playerWon"
    })
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
      played: false },
      this.notifyParentOfReset 
      
      )
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
    
    <button onClick={this.notifyParentOfDelete} > Delete </button>
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
