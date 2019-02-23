import React, { Component } from 'react';
import ReactDOM from 'react';
import './App.css';

const clockStyle = {
  fontFamily: 'Roboto',
  fontSize: '18vw',
  textAlign: 'center'
};

function calculateHexTime(){
  var date = new Date()

  var seconds = date.getSeconds() + date.getMilliseconds()/1000;
  var minutes = date.getMinutes() + seconds/60;
  var hours = date.getHours() + minutes/60;

  var hexHours = parseInt((hours/24)*256).toString(16);
  var hexMinutes = parseInt((minutes/60)*256).toString(16);
  var hexSeconds = parseInt((seconds/60)*256).toString(16);

  if (hexHours.length == 1){
    hexHours = "0" + hexHours;
  }
  if (hexMinutes.length == 1){
    hexMinutes = "0" + hexMinutes;
  }
  if (hexSeconds.length == 1){
    hexSeconds = "0" + hexSeconds;
  }

  return "#" + hexHours + hexMinutes + hexSeconds;
}

function calculateInverseHexTime(){
  var date = new Date()

  var seconds = date.getSeconds() + date.getMilliseconds()/1000;
  var minutes = date.getMinutes() + seconds/60;
  var hours = date.getHours() + minutes/60;

  var hexHours = (256 - parseInt((hours/24)*256)).toString(16);
  var hexMinutes = (256- parseInt((minutes/60)*256)).toString(16);
  var hexSeconds = (256- parseInt((seconds/60)*256)).toString(16);

  if (hexHours.length == 1){
    hexHours = "0" + hexHours;
  }
  if (hexMinutes.length == 1){
    hexMinutes = "0" + hexMinutes;
  }
  if (hexSeconds.length == 1){
    hexSeconds = "0" + hexSeconds;
  }

  return "#" + hexHours + hexMinutes + hexSeconds;
}

class Clock extends Component{
  constructor(props){
    super(props);
    var hexCode = calculateHexTime();
    this.state = {hex: hexCode};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    var hexCode = calculateHexTime();
    this.setState({
      hex: hexCode,
      inverseHex: calculateInverseHexTime()
    });

  }

  render(){
    var clockStyle = {
      fontFamily: 'Roboto',
      fontSize: '18vw',
      textAlign: 'center',
      color: this.state.inverseHex
    }
    return(
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: this.state.hex}}>
        <div style={clockStyle}>{this.state.hex}</div>
      </div>
    );
  }
}

function App(){
  return (
      <Clock/>
  )
}

export default App;
