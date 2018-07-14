import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'

export default class home extends Component {
  render() {
    return (
      <div id="body">
        <div>
        <div class="containers">
            <h2 id="inside">Find And Share Your Cooking Experience.</h2>
        </div>
        <div id="wrapper">
            <h2>Start Your Cooking Journey</h2>
            <div id="main">
                <Link to="/login">
                <button className="btn-large waves-effect" id="signins">Signin</button>
                </Link>
                <h4>OR</h4>
                <Link to="/register">
                <button id="signups" className="btn-large waves-effect">signup</button>
                </Link>
            </div>
        </div>
        </div>
      </div>
    )
  }
}
