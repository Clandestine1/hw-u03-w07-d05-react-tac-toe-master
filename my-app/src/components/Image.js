import React from 'react'
//Allows React to be used in this component

//Creates a class called Image that displays a h1 title tag on my app
//React.component tells React what needs to be rendered, in this case the Image class

class Image extends React.Component {
  render() {
    return (<h1 id="bs">Boss Shauna Tic Tac Toe</h1>);
  }
}

export default Image;
//Export allows the class to be used elsewhere in the app