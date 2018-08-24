import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



export default class adminControlRecipe extends Component {
    constructor(){
        super()
        this.state = {
            allRecipe:[]
        }

    }
   
    componentDidMount() {
       const token = JSON.parse(localStorage.getItem('AdminToken'));
            if(!token){
                this.props.history.push('/admin')
            }
           else{
                fetch('/ctrlrecipe', {
                    
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                       'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(res =>{
                    //console.log(res)
                    this.setState({allRecipe:res.message})
                })
                .catch(err => console.log(err))
            }
    }
    
  render() {
    const {allRecipe} = this.state
    return (
      <div>
         <nav className="navbar navbar-expand-sm navbar-default bg mb-4">
                    <div className="container">
                        
                        <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">
                <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '30px'}}> Nice Recipe Admin</h1>
                        </Link>
                </div>
                    <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="index.html">Dashboard</a></li>
                        <li><Link className="nav-link" to="/">
                                                Visit site
                                                </Link></li>
                        <li><Link className="nav-link" to="/profile">
                                                    Profile
                                                </Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
            
                        <li onClick={this.logout}><Link  to="/admin">
                                                Logout
                                                </Link></li>
                    </ul>
                    </div>
                                </div>
        </nav>
          <h1>Admin, please click on the delete button and delete a recipe</h1>
          <div className="card-deck">
        <div  class="col-md-4 col-md-offset-4">
        {allRecipe.map(res => {
            const {_id,name, ingredients, procedure, photo, author, description} = res
            return <div className="card" key={_id}>
                    <img src={photo} className="card-img-top"  alt="food image"/>
                <div className="card-body">
                    <h5 className="card-title"><strong>{name}</strong></h5>
                        <ul >
                        <h4>posted by {author}</h4>
                        <p className="card-text"> <strong>Description:</strong> {description}</p>
                        <p className="card-text"><strong>Ingredients:</strong> {ingredients}</p>
                        <p className="card-text"> <strong>Procedure:</strong> {procedure}</p>
                        
                        </ul>
                <Link to={`del/${_id}`}><button className="btn btn-danger"  >Delete</button></Link>
                </div>
                <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            
        })}
            
        </div>
        </div>
        	{/* <div class="card-deck">
  <div class="card">
    <img class="card-img-top" src=".../100px180/" alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  </div> */}
      </div>
    )
  }
}
