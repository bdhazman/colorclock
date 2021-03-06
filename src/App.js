import React, { Component } from 'react';
import play from "./imgs/play.svg"
import pause from "./imgs/pause.svg"

/**
 * calculateHexTime - calculates the hex code that correlates
 * to the current time.
 *
 * @return {string}  the hexCode relating to the current time
 */
function calculateHexTime(){
  var date = new Date()

  var seconds = date.getSeconds() + date.getMilliseconds()/1000;
  var minutes = date.getMinutes() + seconds/60;
  var hours = date.getHours() + minutes/60;

  var hexHours = parseInt((hours/24.0)*256.0).toString(16);
  var hexMinutes = parseInt((minutes/60.0)*256.0).toString(16);
  var hexSeconds = parseInt((seconds/60.0)*256.0).toString(16);

  if (hexHours.length === 1){
    hexHours = "0" + hexHours;
  }
  if (hexMinutes.length === 1){
    hexMinutes = "0" + hexMinutes;
  }
  if (hexSeconds.length === 1){
    hexSeconds = "0" + hexSeconds;
  }

  return "#" + hexHours + hexMinutes + hexSeconds;
}

/**
 * calculateInverseHexTime - calculates the inverse hex code that correlates
 * to the current time. The inverse color is used for the text so it is visible
 * and correlates well to the current background time.
 *
 * @return {string}  the inverse hexCode relating to the current time
 */
function calculateInverseHexTime(){
  var date = new Date()

  var seconds = date.getSeconds() + date.getMilliseconds()/1000;
  var minutes = date.getMinutes() + seconds/60;
  var hours = date.getHours() + minutes/60;

  var hexHours = (256 - parseInt((hours/24.0)*256.0)).toString(16);
  var hexMinutes = (256- parseInt((minutes/60.0)*256.0)).toString(16);
  var hexSeconds = (256- parseInt((seconds/60.0)*256.0)).toString(16);

  if (hexHours.length === 1){
    hexHours = "0" + hexHours;
  }
  if (hexMinutes.length === 1){
    hexMinutes = "0" + hexMinutes;
  }
  if (hexSeconds.length === 1){
    hexSeconds = "0" + hexSeconds;
  }

  return "#" + hexHours + hexMinutes + hexSeconds;
}

function formattedTime(){
  var date = new Date();
  var hours = date.getHours().toString();
  var minutes = date.getMinutes().toString();
  var seconds = date.getSeconds().toString();

  if (hours.length === 1){
    hours = "0" + hours;
  }
  if (minutes.length === 1){
    minutes = "0" + minutes;
  }
  if (seconds.length === 1){
    seconds = "0" + seconds;
  }

  return hours + ":" + minutes + ":" + seconds;
}

class ClockApp extends Component{
  constructor(props){
    super(props);
    this.state = {
      paused: false,
      time: formattedTime(),
      displayTime: false,
      hex: calculateHexTime(),
      inverseHex: calculateInverseHexTime()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  tick() {
    if(this.state.displayTime){
      this.setState({
        time: formattedTime()
      })
    }
    if(!this.state.paused){
      var hexCode = calculateHexTime();
      this.setState({
        hex: hexCode,
        inverseHex: calculateInverseHexTime()
      });
    }
  }

  handleClick = () => {
    this.setState({
      paused: !this.state.paused
    });
  }

  toggleTime = () => {
    this.setState({
      displayTime: !this.state.displayTime
    })
  }

  render(){
    var clockStyle = {
      fontFamily: 'Roboto Mono',
      fontSize: '18vw',
      width: '100vw',
      textAlign: 'center',
      transition: '.5s ease-in',
      color: this.state.inverseHex,
    }

    var buttonStyle = {
      height: '5vw',
      width: '5vw',
      opacity: '.6'
    }

    return(
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '.5s ease-in',
        background: this.state.hex}}>

        <div style={clockStyle} onClick={this.toggleTime}>{this.state.displayTime ? this.state.time : this.state.hex}</div>
        <img onClick={this.handleClick} alt={this.state.paused ? "play" : "pause"} src={this.state.paused ? play : pause} style={buttonStyle}/>
      </div>
    );
  }
}

export default ClockApp;
