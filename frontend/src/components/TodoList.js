import React from 'react'


const TodoItem = ({todo}) => {
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
        </tr>
    )
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

const TodoList = ({todos}) => {
    return (
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
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
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
