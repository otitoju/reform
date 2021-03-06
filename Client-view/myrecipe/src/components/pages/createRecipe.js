import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/bootstrap.min.css'
//import '../css/recipe.css'


export default class createRecipe extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            ingredients:'',
            procedure:'',
            description:''
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
                procedure:this.state.procedure,
                description:this.state.description
            })
        })
        .then(res => res.json())
        .then(res => {
            //alert(res.message)
            console.log(res)
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
    componentDidMount = (e) => {
        //e.preventDefault()
      const token = JSON.parse(localStorage.getItem('AdminToken'))
      if (!token){
          this.props.history.push('/')
      }
    }
    handleCheck(e){
        const pro = document.getElementById('editor1')
        alert(pro)
    }
    handleDescription(e){
        this.setState({description:e.target.value})
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
          
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
              <div class="panel-heading main-color-bg">
                <h3 class="panel-title"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>Create Recipe Here</h3>
              </div>
              <div class="panel-body">
                <form>
                  <div class="form-group">
                    <label>Food Name</label>
                    <input type="text" className="form-control" placeholder="Food name"  value={this.state.name} onChange={this.handleName}  required/>
                  </div>
                  <div class="form-group">
                    <label>Food Ingredients</label>
                    <textarea id="editor1"  value={this.state.ingredients} onChange={this.handleIngredients} placeholder="Enter food ingredients"  className="form-control"/>    
                  </div>
                  <div class="form-group">
                    <label>Food Procedure</label>
                    <textarea id="editor1"  value={this.state.procedure} onChange={this.handleProcedure} placeholder="Enter food procedure"  className="form-control"/>    
                  </div>
                  <div class="form-group">
                    <label>Food Description</label>
                    <input type="text" class="form-control" placeholder="Add some Description..." value={this.state.description} onChange={this.handleDescription.bind(this)}/>
                  </div>
                  <input type="submit" class="btn btn-danger btn-block" value="Create" onClick={this.handleCreate}/>
                  <input type="submit" class="btn btn-danger btn-block" value="Check" onClick={this.handleCheck.bind(this)} />
                </form>
              </div>
              </div>

          </div>

      </div>
    )
  }
}
