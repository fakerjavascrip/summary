import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router';
import './App.css';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import Child from './containers/Child.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route path="/" component={Child}></Route>
        </HashRouter>
      </div>
    );
  }
}

export default App;
