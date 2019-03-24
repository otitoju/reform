import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import Router from './router'
import Header from './components/layout/Navbar'
import Footer from './components/layout/footer'



class App extends Component {

  render() {

    return (
      <div className="App">
          <Route component={Header}/>
          <Route component={Router}/>
      </div>

    );
  }
}

export default App;
