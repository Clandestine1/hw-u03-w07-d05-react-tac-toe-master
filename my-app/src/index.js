import React from 'react';
//Allows React to be used in this component
import ReactDOM from 'react-dom';
//Allows the React library to be used in this component
import App from './components/App';
//Allows the App component to be used in this page
import Image from './components/Image';
//Allows the Image component to be used in this page
import './index.css';
//Allows css stylesheet to be used in this page

//Function that creates a button that onClick will display a value of either X or O
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

 //React.component tells React what needs to be rendered, in this case the Board class
 //Board class renders the tic tac toe grid, extends on the Square function 
 //and assigns value to the props
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

 //React.component tells React what needs to be rendered, in this case the Game class
 //Game sets the squares prop into an array that has no value until an event listener goes off
 // Game also sets the win conditions, determining the move number and whose turn it is
 // Sets X as the first player, uses history.map and keys to show prior moves from the game
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div id="game" className="game-board">
          <Board id="pad"
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div id="info" className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

//Renders the Game, App and Image class in the DOM, specifically the root div. 
//It is all wrapped in a div so there is an outermost element for the code to work

ReactDOM.render(
	(<div>
		<Game />
		<App /> 
		<Image />
	</div>), 
	document.getElementById("root"));

//Function for calculating the winning combination of squares occupid by a player

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  //For loop to loop through all the winning combinations until someone wins or 
  //there are no spaces left which returns null

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
