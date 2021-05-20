import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import Footer from './components/Footer.js'
import axios from 'axios'
import Menu from "./components/Menu";


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))
    }

    // const users = [
    //     {
    //         'username': 'username_1',
    //         'firstname': 'firstname_1',
    //         'lastname': 'lastname_1',
    //         'email': 'email_1'
    //     },
    //     {
    //         'username': 'username_2',
    //         'firstname': 'firstname_2',
    //         'lastname': 'lastname_2',
    //         'email': 'email_2'
    //     },
    // ]
    // this.setState(
    //     {
    //         'users': users
    //     }
    // )
    //}


    render() {
        return (

            <div className='wrapper'>

                <Menu/>

                <div className='content'>
                    <UserList users={this.state.users}/>
                </div>

                <Footer/>

            </div>

        )
    }
}

export default App;
