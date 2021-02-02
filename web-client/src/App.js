import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes} from "./Routes";

import './Routing.css';
import {connect} from "react-redux";
import {Nav} from "./components/Nav";

class _App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = ({auth}) => ({...auth});
export const App = connect(mapStateToProps)(_App);
