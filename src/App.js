import React from 'react';

class App extends React.Component {

render () {

  return <div>
  <h1>Rock Paper Scissors</h1>
  <Game />
  </div>
}
}


class Game extends React.Component {

  render() {
    return <div> 
      <button> Rock </button>
      <button> Paper </button>
      <button> Scissors </button>

      <span>Game status</span>
      <span> |  Oponent Choice</span>
    </div>

  }
}
export default App;
