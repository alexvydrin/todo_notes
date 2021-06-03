import React from 'react';
import './App.css';
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js';
import TodoList from "./components/TodoList";
import ProjectPage from "./components/ProjectPage";
import Footer from './components/Footer.js'
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({location}) => {
    return (
        <div>
            Not found: {location.pathname}
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))
    }


    render() {
        return (

            <div className='wrapper'>

                <BrowserRouter>

                    <Menu/>

                    <div className='content'>
                        <Switch>
                            <Route exact path='/' component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route path="/project/:id">
                                <ProjectPage projects={this.state.projects}/>
                            </Route>
                            <Redirect from='/projects' to='/'/>
                            <Route component={NotFound404}/>
                        </Switch>
                    </div>

                    <Footer/>

                </BrowserRouter>

            </div>

        )
    }
}

export default App;
