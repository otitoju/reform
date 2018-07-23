import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/changepassword.css'

export default class changepassword extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <div id="contain">
                        <Link className="navbar-brand" to="/">
                            Online Recipe
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
        <div className="card" id="cCard">
                <div className="card-action teal lighten-1 white-text">
                    <h3>Change password</h3>
                </div>
            <div className="card-content">
                <form>
                    <div className="form-field">
                        <label for="password">Old password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your old password" required/></i>
                    </div>
                    <div className="form-field">
                        <label for="password">New password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your new password" required/></i>
                    </div>
                    <div className="form-field">
                        <label for="password">Confirm password*</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Confirm your new password" required/></i>
                    </div>
                    <div className="form-field">
                        <button className="btn-small waves-effect">Change password</button>
                    </div>
                </form>
            </div>
            </div>
      </div>
    )
  }
}
