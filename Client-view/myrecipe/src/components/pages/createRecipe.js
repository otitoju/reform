import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/bootstrap.min.css'
import '../css/recipe.css'


export default class createRecipe extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            ingredients:[],
            procedure:[]
        }
        this.handleCreate = this.handleCreate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleProcedure = this.handleProcedure.bind(this)
        this.handleIngredients = this.handleIngredients.bind(this)
    }
    handleCreate(e){
        const token = JSON.parse(localStorage.getItem('AdminToken'))
        e.preventDefault()
        fetch('/recipe', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                name:this.state.name,
                ingredients:this.state.ingredients,
                procedure:this.state.procedure
            })
        })
        .then(res => res.json())
        .then(res => {
            //alert(res.message)

            if(res.message === 'Recipe created'){
                const id = res.id
                localStorage.setItem('recipeId', JSON.stringify(res.id))
                this.props.history.push(`/photo/${id}`)
            }
            else if (res.message === 'Please create recipes'){
                alert('Please create a valid recipe')
            }
        })
        .catch(err => console.log(err))
    }
    handleName(e){
        this.setState({name:e.target.value})
    }
    handleIngredients(e){
        this.setState({ingredients:e.target.value})
    }
    handleProcedure(e){
        this.setState({procedure:e.target.value})
    }
    componentDidMount = () => {
      const token = JSON.parse(localStorage.getItem('AdminToken'))
      if (!token){
          this.props.history.push('/')
      }
    }
    

  render() {
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
                            Classic Recipe administrative site
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
          {/* <div className="card" id="head">
                        <div className="card-action red lighten-1 white-text">
                            <h3>Create Recipe here</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="name">Food name</label>
                                <i className="mdi mdi-email"><input type="text" placeholder="Enter food name" value={this.state.name} onChange={this.handleName}  required/></i>
                            </div>
                            <div className="form-field">
                                <label for="ingredients">Ingredients</label>
                                <i className="mdi mdi-lock"><textarea id="textarea1" className="materialize-textarea" value={this.state.ingredients} onChange={this.handleIngredients} placeholder="Enter food ingredients"  required/></i>
                            </div>
                            <div className="form-field">
                                <label for="procedure">Procedure</label>
                                <i className="mdi mdi-lock"><textarea id="textarea1" className="materialize-textarea" value={this.state.procedure} onChange={this.handleProcedure} placeholder="Enter food procedure"  required/></i>
                            </div>
                            <input type="date"/>
                            <div className="form-field">
                                <input type="submit" className="btn-small red" value="Create" onClick={this.handleCreate}/>
                            </div>
                        </div>
                    </div> */}
                              <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
              <div class="panel-heading main-color-bg">
                <h3 class="panel-title">Create Recipe Here</h3>
              </div>
              <div class="panel-body">
                <form>
                  <div class="form-group">
                    <label>Food Name</label>
                    <input type="text" class="form-control" placeholder="Food name"  value={this.state.name} onChange={this.handleName}  required/>
                  </div>
                  <div class="form-group">
                    <label>Food Ingredients</label>
                    <textarea name="editor1" class="form-control" value={this.state.ingredients} onChange={this.handleIngredients} placeholder="Enter food ingredients"  required/>    
                  </div>
                  <div class="form-group">
                    <label>Food Procedure</label>
                    <textarea name="editor1" class="form-control" value={this.state.procedure} onChange={this.handleProcedure} placeholder="Enter food procedure"  required/>    
                  </div>
                  <div class="form-group">
                    <label>Food Description</label>
                    <input type="text" class="form-control" placeholder="Add some Description..."/>
                  </div>
                  <input type="submit" class="btn btn-danger" value="Create" onClick={this.handleCreate}/>
                </form>
              </div>
              </div>

          </div>

      </div>
    )
  }
}
