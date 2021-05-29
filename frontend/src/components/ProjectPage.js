import React from 'react'
import {useParams} from 'react-router-dom'


const ProjectPage = ({projects}) => {

    let {id} = useParams();

    let project = projects.find((project) => project.id == id);

    return (
        <div>

            id = {id}

            <br/>

            name = {project.name}

            <br/>

            repository = {project.repository}

        </div>
    )
}

export default ProjectPage
