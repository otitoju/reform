import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Rcard from './recipe.jpg'


export default class fetchsingledata extends Component {
    constructor() {
        super();
        this.state = {
            recipe:null,
            photo:'',
            ingredients:'',
            procedure:'',
            author:'',
            id:''
        }
        this.getSingleRecipe = this.getSingleRecipe.bind(this)
    }
    getSingleRecipe(id){
         axios.get(`/recipe/get/${id}`)
        .then(res =>{
            console.log(res)
            this.setState({recipe:res.data.recipe.name,
            photo:res.data.recipe.photo,
            ingredients:res.data.recipe.ingredients,
            procedure:res.data.recipe.procedure,
            author:res.data.recipe.author,
            id:res.data.recipe._id
            })
        } )
        .catch(err => console.log(err))
    }
    componentDidMount = () => {
      const recipe = this.getSingleRecipe(this.props.match.params.id)
      this.setState({recipe})
    }
    
    
  render() {
      const {recipe, photo, ingredients, procedure, author, id} = this.state
    return (
        <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Online Recipe
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
                                    <Link to="/"><button className="btn btn-default red" onClick={this.logout} id="logout">Logout</button></Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
            <div  className="col-md-6 col-md-offset-2" id="row">
                <div className="card">
                    <div className="card-image">
                        <img src={photo} className="card-img-top"/>
                        <span className="card-title"><strong>{recipe}</strong></span>
                    </div>
                        <div className="card-content">
                            <span><strong>Ingredients:</strong></span>
                            <p className="card-text">{ingredients}</p>
                            <span><strong>Procedure:</strong></span>
                            <p className="card-text">{procedure}</p>
                        </div>
                        <div class="card-footer">
                                    <small class="text-muted">Created by {author}</small>
                                    </div>
                </div>
                <div className="jumbotron">
                <Link to={`/comment/${id}`}><button>Add comment</button></Link>
            </div>
            </div>
            
  </div>

    )
  }
}
