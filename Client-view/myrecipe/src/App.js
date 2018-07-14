import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';
import Login from './components/pages/login'
import Register from './components/pages/register'
import Recipe from './components/pages/createRecipe'
import Forgotpassword from './components/pages/forgotPassword'
import Navbar from './components/layout/Navbar'
import Report from './components/pages/report'
import Reset from './components/pages/resetpassword'
import Home from './components/pages/home'
import Changeprofile from './components/pages/updateprofiles'
import Changepassword from './components/pages/changepassword'
import Dashboard from './components/pages/dashboard'
import Recipes from './components/pages/fetchData'
import Admin from './components/pages/adminLogin'
import Admindashboard from './components/pages/admindashboard'
import Alluser from './components/pages/allUsers'
import userprofile from './components/pages/userprofile'


class App extends Component {

  render() {
    return (
      <div className="App">
          <Navbar />
          <Route path="/reset" exact={true} component={Reset}/>
          <Route path="/userprofile" exact={true} component={userprofile}/>
          <Route path="/users" exact={true} component={Alluser}/>
          <Route path="/adminhome" exact={true} component={Admindashboard}/>
          <Route path="/admin" exact={true} component={Admin}/>
          <Route path="/dashboard" exact={true} component={Dashboard}/>
          <Route path="/report" exact={true} component={Report}/>
          <Route path="/forgot" exact={true} component={Forgotpassword}/>
          <Route path="/login" exact={true} component={Login}/>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/create" exact={true} component={Recipe}/>
          <Route path="/register" exact={true} component={Register}/>
          <Route path="/update" exact={true} component={Changeprofile}/>
          <Route path="/chgpassword" exact={true} component={Changepassword}/>
          <Route path="/recipe" exact={true} component={Recipes}/>
      </div>

    );
  }
}

export default App;
