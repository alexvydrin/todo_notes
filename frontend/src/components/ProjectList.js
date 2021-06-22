import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <th>
                    id
                </th>
                <th>
                    Project name
                </th>
                <th>
                    Repository
                </th>
                <th>
                    Users
                </th>
                <th>

                </th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
            /
            <Link to='/projects/find'>Find</Link>
        </div>
    )
}


export default ProjectList
