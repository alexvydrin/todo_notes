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
import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";
import ProjectFormFind from "./components/ProjectFormFind";
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

    deleteTodo(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    createTodo(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
                const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
                new_todo.project = project
                new_todo.user = user
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name, repository) {
        const headers = this.get_headers()
        const data = {name: name, repository: repository}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
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
                            <Route exact path='/' component={() => <ProjectList projects={this.state.projects}
                                                                                deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/projects/create' component={() => <ProjectForm
                                createProject={(name, repository) => this.createProject(name, repository)}/>}/>
                            <Route exact path='/projects/find' component={() => <ProjectFormFind/>}/>
                            <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects}
                                createTodo={(text, project, user) => this.createTodo(text, project, user)}/>}/>
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}
                                                                                  deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route exact path='/todos_graphql'
                                   component={() => <TodoList_graphql todos={this.state.todos_graphql}/>}/>
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
