import React from 'react'
import moment from 'moment'

class App extends React.Component {
    // set state variable
    constructor(props) {
      super(props);
      this.state = {
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      };
    }
    // call function tick
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    // clear interval
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    // function set time date
    tick() {
      this.setState({
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      });
    }
    render() {
      return (
        <h1 className="Clock">
          {this.state.time}.
        </h1>
      );
    }
  }
  
  export default App;