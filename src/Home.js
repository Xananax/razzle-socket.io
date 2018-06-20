import React from 'react';
import logo from './react.svg';
import io from 'socket.io-client'
import './Home.css';

class Home extends React.Component {
  state = { value:'', messages:[] }
  componentDidMount(){
    this.socket = io()
    this.socket.on('message', this.onReceiveMessage)
  }
  onReceiveMessage = (message) => this.setState({messages:[...this.state.messages,message]})
  sendMessage = (message) => this.socket.emit('message',message)
  onChange = ({target:{value}}) => this.setState({value})
  onKeyDown = ({keyCode}) => keyCode === 13 ? this.onSubmit() : null
  onSubmit = () => {
    this.sendMessage(this.state.value)
    this.setState({value:''})
  }
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
        <div>
          <div style={{textAlign:'left'}}>{ this.state.messages.map((m,i)=><li key={i}>{m}</li>)}</div>
          <input type="text" value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
        </div>
      </div>
    );
  }
}

export default Home;
