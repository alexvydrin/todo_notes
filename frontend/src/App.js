import React from 'react';
import './App.css';
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js';
import TodoList from "./components/TodoList";
import TodoList_graphql from "./components/TodoList_graphql";
import ProjectPage from "./components/ProjectPage";
import Footer from './components/Footer.js'
import Menu from "./components/Menu";
import LoginForm from './components/Auth.js';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import Cookies from 'universal-cookie';


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
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
            'todos_graphql': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {
                username: username,
                password: password
            })
            .then(response => {
                this.set_token(response.data['token'])
                console.log(this.state.token)
            })
            .catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios
            .get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({users: []})
            })

        axios
            .get('http://127.0.0.1:8000/api/projects', {headers})
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
            .get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/graphql/?query={allTodos {id text isActive project {name} user {username}}}', {headers})
            .then(response => {
                const todos_graphql = response.data.data.allTodos
                this.setState(
                    {
                        'todos_graphql': todos_graphql
                    }
                )
            })
            .catch(error => console.log(error))

    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (

            <div className='wrapper'>

                <BrowserRouter>

                    <Menu/>

                    {this.is_authenticated() ?
                        <button onClick={() => this.logout()}>Logout</button> :
                        <Link to='/login'>Login</Link>
                    }

                    <div className='content'>
                        <Switch>
                            <Route exact path='/' component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                            <Route exact path='/todos_graphql' component={() => <TodoList_graphql todos={this.state.todos_graphql}/>}/>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>
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
