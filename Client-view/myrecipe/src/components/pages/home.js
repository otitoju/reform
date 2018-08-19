import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import logo from '../logo/logo1.PNG'

export default class home extends Component {
  render() {
    return (
      <div id="body">
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                          <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '30px'}}> Nice Recipe</h1>
                        </Link>
                        <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                    Signin
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Signup
                                    </Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
              </nav>
        <div>
          <div className="containers">
              <h2 id="inside">Find And Share Your Cooking Experience.</h2>
          </div>
          <div id="wrapper">
              <h2>Start Your Cooking Journey</h2>
              <div id="main">
                  <Link to="/login">
                  <button className="btn btn-info waves-effect" id="signins">Signin</button>
                  </Link>
                  <h4>OR</h4>
                  <Link to="/register">
                  <button id="signups" className="btn btn-info waves-effect">signup</button>
                  </Link>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
