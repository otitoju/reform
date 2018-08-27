import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../layout/adminboard.css'


export default class admindashboard extends Component {
  constructor(){
    super()
    this.state = {
      username:'',
      totalRecipe:'',
      totalUsers:'',
      latestUsers:[]
    }
    this.viewUser = this.viewUser.bind(this)
    this.createRecipe = this.createRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }
    componentDidMount = () => {
      const admin = JSON.parse(localStorage.getItem('AdminToken'))
      if(!admin){
          this.props.history.push('/')
      }
      else{
        fetch('/adminusername', {
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${admin}`
          }
        })
        .then(res => res.json())
        .then(result => {
          //console.log(result.username)
          this.setState({
            username:result.username
          })
        })
        .catch(err => console.log(err))
      }

      fetch('/ctrlrecipe', {
                    
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
           
        }
    })
    .then(res => res.json())
    .then(res =>{
     // console.log(res)
        this.setState({totalRecipe:res.total})
        this.setState({totalUsers:res.users})
        this.setState({latestUsers:res.limit})
    })
    .catch(err => console.log(err))


    }


    logout(){
      localStorage.removeItem('AdminToken')
      localStorage.removeItem('recipeId')
    }
    togglesidebar(){
      document.getElementById('side').classList.toggle('active')
    }
    viewUser(){
      this.props.history.push('/users')
    }
    createRecipe(){
      this.props.history.push('/create')
    }
    deleteRecipe(){
      this.props.history.push('/ctrlrecipe')
    }
    
  render() {
    const { username, totalRecipe, totalUsers, latestUsers } = this.state
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
        
        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item" >
                                    <Link className="nav-link" to="/profile">
                                    Welcome, {username}
                                    </Link>
                                </li>
                                <li className="nav-item"  onClick={this.logout}>
                                    <Link className="nav-link" to="/admin">
                                    Logout
                                    </Link>
                                </li>
                                {/* <li onClick={this.logout} className="nav-item"><Link  to="/admin">
                                        Logout
                                </Link></li> */}
                            </ul>
                        
                        </div>

                    </div>
        </nav>

       
    <header id="header">
      <div class="container">
        <div class="row">
          <div class="col-md-10">
            <h1><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard <small>Explore Site</small></h1>
          </div>
          <div class="col-md-2">
            <div class="dropdown create">
              <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Create Content
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a type="button" data-toggle="modal" data-target="#addPage">Add Page</a></li>
                <li><a href="#">Add Post</a></li>
                <li><a href="#">Add User</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="breadcrumb">
      <div class="container">
        <ol class="breadcrumb">
          <li class="active">Dashboard</li>
        </ol>
      </div>
    </section>

    <section id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="list-group">
              <a href="index.html" class="list-group-item active main-color-bg">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
              </a>
              
              <h5 className="list-group-item" onClick={this.viewUser}><span class="glyphicon glyphicon-user" aria-hidden="true"></span> users</h5>
              <h5 className="list-group-item" onClick={this.createRecipe}><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>new recipe</h5>
              <h5 className="list-group-item" onClick={this.deleteRecipe}>}><span class="glyphicon glyphicon-delete" aria-hidden="true"></span>Delete recipe</h5>
            </div>

          </div>
          <div class="col-md-9">
            
            <div class="panel panel-default">
              <div class="panel-heading main-color-bg">
                <h3 class="panel-title">Website Overview</h3>
              </div>
              <div className="panel-body">
                <div className="col-md-6">
                  <div className="well dash-box">
                    <h2><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {totalUsers}</h2>
                    <h4>Users</h4>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="well dash-box">
                    <h2><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> {totalRecipe}</h2>
                    <h4>Recipes</h4>
                  </div>
                </div>
              </div>
              </div>

              
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Latest Users</h3>
                </div>
                <div class="panel-body">
                  <table class="table table-striped table-hover">
                  <thead>
                                <th>
                                    NAME
                                </th>
                                <th>
                                    EMAIL
                                </th>
                                
                                
                            </thead>
                            
                            <tbody>
                              {latestUsers.map(res => {
                                const {_id, name,email, gender, phone} = res
                                return <tr key={_id}>
                                  <td><b>{name}</b></td>
                                    <td><b>{email}</b></td>
                                </tr>
                              })}
                            </tbody>
                    </table>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>

    <footer id="footer">
      <p>Copyright Nice Recipe, &copy; 2018 and forever</p>
    </footer>

   

   
    <div class="modal fade" id="addPage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add Page</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Page Title</label>
          <input type="text" class="form-control" placeholder="Page Title"/>
        </div>
        <div class="form-group">
          <label>Page Body</label>
          <textarea id="editor1" class="ckeditor" placeholder="Page Body"></textarea>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox"/> Published
          </label>
        </div>
        <div class="form-group">
          <label>Meta Tags</label>
          <input type="text" class="form-control" placeholder="Add Some Tags..."/>
        </div>
        <div class="form-group">
          <label>Meta Description</label>
          <input type="text" class="form-control" placeholder="Add Meta Description..."/>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>
      </div>
    )
  }
}
