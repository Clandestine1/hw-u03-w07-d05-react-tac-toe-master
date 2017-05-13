import React from 'react';
//Allows React to be used in this component
import ReactDOM from 'react-dom';
//Allows the React library to be used in this component

import logo from '../../src/logo.svg';
//Allows logo class to be used in this component
import '../App.css';
//Allows style sheet to be used for this component 

//React.component tells React what needs to be rendered, in this case the App class
//App class displays React logo on my app
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          </div>
      </div>
    );
  }
}

export default App;
//Export allows the class to be used elsewhere in the app
