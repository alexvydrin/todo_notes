import React from 'react'
import {Link} from "react-router-dom";


const Menu = () => {
    return (
        <div className='menu'>
            <Link to='/projects'>Projects</Link>
            <Link to='/todos'>Todos</Link>
            <Link to='/todos_graphql'>Todos (graphql)</Link>
            <Link to='/users'>Users</Link>
        </div>
    )
}

export default Menu
