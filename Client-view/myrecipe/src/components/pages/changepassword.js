import React, { Component } from 'react'
import {Link} from 'react-router-dom'
//import '../css/changepassword.css'

export default class changepassword extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <div id="contain">
                        <Link className="navbar-brand" to="/">
                            <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '30px'}}> Nice Recipe</h1>
                        </Link>
                        </div>
                        <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
        
                                <li className="nav-item">
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
        
        <div  className="col-md-4 col-md-offset-4">
        <div className="card" >
                <div className="card-title">
                    <h3><span class="glyphicon glyphicon-cog" aria-hidden="true"></span>Change password</h3>
                </div>
                <div class="container">
                <form>
                    <div className="form-group">
                        <label for="password">Old password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your old password" required className="form-control"/></i>
                    </div>
                    <div className="form-field">
                        <label for="password">New password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your new password" required className="form-control"/></i>
                    </div>
                    <div className="form-field">
                        <label for="password">Confirm password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Confirm your new password" required className="form-control"/></i>
                    </div>
                        <button className="btn btn-primary">Change password</button>
                </form>
            </div>
            </div>
            </div>
      </div>
    )
  }
}

