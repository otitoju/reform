import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
          token: null
        }
        this.handleSignOut = this.handleSignOut.bind(this)
      }
    
      async componentDidMount(){
        const token = await window.localStorage.getItem('token')
        this.setState({ token })
      }

      
      async handleSignOut(e){
        await window.localStorage.clear()
      }
  render() {
    if(this.state.token){
      return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">

                
                <Link to="/" class="navbar-brand" style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '25px', color:'rgb(97, 15, 15)'}}>Nice Recipe</Link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="basicExampleNav">

                    
                    <ul class="navbar-nav mr-auto pull-center" style={{color:'black'}}>
                        <li className="nav-item" style={{textColor:'black', visibility:'hidden'}}>
                            <Link to="/"class="nav-link">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item" style={{textColor:'black'}}>
                            <Link to="/userprofile"class="nav-link">Profile
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>

                    </ul>
                    

                    <form class="form-inline">
                        <div class="md-form my-0">
                            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-primary">search</button>
                            
                        </div>
                        <ul>
                          <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
                              <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/userprofile" class="dropdown-item">Profile
                                <span className="sr-only">(current)</span>
                                </Link>
                                  <a class="dropdown-item" href="#">Another action</a>
                                  <a class="dropdown-item" href="#">Something else here</a>
                              </div>
                          </li>
                          
                        </ul>
                        <div><Link to="/" className="nav-link btn-danger text-white" onClick={this.handleSignOut.bind(this)}>Logout</Link></div>
                    </form>
                    
                </div>


            </nav>
        </div>
    )
    }
    else{
      return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light">  
            <Link to="/" class="navbar-brand" style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '25px', color:'rgb(97, 15, 15)'}}>Nice Recipe</Link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="basicExampleNav">

                
                <ul class="navbar-nav mr-auto pull-center" style={{color:'black'}}>
                    <li className="nav-item" style={{textColor:'black', visibility:'hidden'}}>
                        <Link to="/"class="nav-link">Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>

                </ul>
                

                <form class="form-inline">
                    <div>
                    <Link to="/login" className="nav-link btn-indigo text-white"><i className="fa fa-sign-in" aria-hidden="true"></i> Signin</Link>
                    </div>
                    <div><Link to="/register" className="nav-link">Signup</Link></div>
                </form>
                
            </div>


          </nav>
          

        </div>
    )
    }

  }
}
