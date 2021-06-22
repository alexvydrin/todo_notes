import React from 'react'
import {Link} from 'react-router-dom'


const TodoItem = ({todo, deleteTodo}) => {
    if (todo.is_active) {
        return (
            <tr>
                <td>
                    {todo.id}
                </td>
                <td>
                    {todo.project.name}
                </td>
                <td>
                    {todo.text}
                </td>
                <td>
                    {todo.user.username}
                </td>
                <td>
                    <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
                </td>
            </tr>
        )
    }
    return ""
}

// <td>
//     {todo.created}
// </td>
// <td>
//     {todo.updated}
// </td>
// <td>
//     {todo.is_active}
// </td>

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    id
                </th>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    User
                </th>
                <th>

                </th>
                {
                    todos.map
                    (
                        (todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>
                    )
                }

            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

// <th>
//     Created
// </th>
// <th>
//     Updated
// </th>
// <th>
//     is_active
// </th>


export default TodoList
