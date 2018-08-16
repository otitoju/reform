import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
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
import notFound from './components/pages/notfound'
import pic from './components/pages/pics'
import RecipePhoto from './components/pages/recipeImage'
import Single from './components/pages/fetchsingledata'
import Footer from './components/layout/footer'
import AdminRegister from './components/pages/adminRegister'
import AdminRecipe from './components/pages/adminControlRecipe'
import adminControlRecipe from './components/pages/adminControlRecipe';
import deleteRecipe from './components/pages/deleteRecipe';
import comment from './components/pages/newComment'


class App extends Component {

  render() {

    return (
      <div className="App">
          {/* <Navbar /> */}
          <Switch>
          <Route path="/img/:id" strict exact={true} component={pic}/>
          <Route path="/del/:id" strict exact={true} component={deleteRecipe}/>
          <Route path="/createsuperuser" strict exact={true} component={AdminRegister}/>
          <Route path="/comment/:id" strict exact={true} component={comment}/>
          <Route path="/ctrlrecipe" strict exact={true} component={AdminRecipe}/>
          <Route path="/post/:id" strict exact={true} component={Single}/>
          <Route path="/reset" strict exact={true} component={Reset}/>
          <Route path="/userprofile" strict exact={true} component={userprofile}/>
          <Route path="/users" strict exact={true} component={Alluser}/>
          <Route path="/adminhome" strict exact={true} component={Admindashboard}/>
          <Route path="/admin" strict exact={true} component={Admin}/>
          <Route path="/dashboard/:id" strict exact={true} component={Dashboard}/>
          <Route path="/photo/:id" strict exact={true} component={RecipePhoto}/>
          <Route path="/report" strict exact={true} component={Report}/>
          <Route path="/forgot" strict exact={true} component={Forgotpassword}/>
          <Route path="/login" strict exact={true} component={Login}/>
          <Route path="/" strict exact={true} component={Home}/>
          <Route path="/create" strict exact={true} component={Recipe}/>
          <Route path="/register" strict exact={true} component={Register}/>
          <Route path="/update/:id" strict exact={true} component={Changeprofile}/>
          <Route path="/chgpassword" strict exact={true} component={Changepassword}/>
          <Route path="/recipe" strict exact={true} component={Recipes}/>
          <Route path="*" exact={true} component={notFound}/>
          </Switch>
      </div>

    );
  }
}

export default App;
