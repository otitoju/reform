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
          <nav className="navbar navbar-expand-sm navbar-dark bg mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Classic Recipe administrative site
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
                                    <Link className="nav-link" to="/">
                                    Visit site
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                  
                                  <li className="nav-item">

                                </li>
                            </ul>
                        
                        </div>
                    </div>
              </nav>
          <h1>Admin, please click on the delete button and delete a recipe</h1>
        <div>
        {allRecipe.map(res => {
            const {_id,name, ingredients, procedure, photo, author} = res
            return <div className="card-panel" key={_id}>
                    <img src={photo}/>
                <div className="caption">
                    <h3><strong>{name}</strong></h3>
                        <ul >
                        <h4>posted by {author}</h4>
                        <p><strong>Ingredients:</strong> {ingredients}</p>
                        <p> <strong>Procedure:</strong> {procedure}</p>
                        </ul>
                <Link to={`del/${_id}`}><button className="btn-small"  >Delete</button></Link>
                </div>
            </div>
            
        })}
        </div>
      </div>
    )
  }
}
