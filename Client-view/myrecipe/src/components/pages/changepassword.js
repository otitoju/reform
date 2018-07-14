import React, { Component } from 'react'
import '../css/changepassword.css'

export default class changepassword extends Component {
  render() {
    return (
      <div>
        <div className="card hoverable" id="cCard">
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
