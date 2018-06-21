import React from 'react';
import logo from './react.svg';
import io from 'socket.io-client'
import './Home.css';

const socketPort = (process.env.RAZZLE_SOCKET_PORT || parseInt( process.env.PORT ||  3000, 10 ) + 10 )

class Home extends React.Component {
  state = { value:'', messages:[] }
  componentDidMount(){
    const socket = io(`${window.location.protocol}//${window.location.hostname}:${socketPort}`)
    socket.on('message', (message) => this.setState({messages:[...this.state.messages,message]}))
  
    const sendMessage = (message) => socket.emit('message',message)

    const onSubmit = () => {
      sendMessage(this.state.value)
      this.setState({value:''})
    }

    this.onChange = ({target:{value}}) => this.setState({value})
    this.onKeyDown = ({keyCode}) => keyCode === 13 ? onSubmit() : null
    this.forceUpdate()
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
          <div>{ this.state.messages.map((m,i)=><li key={i}>{m}</li>)}</div>
          <input type="text" value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
        </div>
      </div>
    );
  }
}

export default Home;
