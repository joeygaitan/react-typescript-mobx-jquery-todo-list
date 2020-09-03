import React, { FC, useState, useEffect } from 'react';

import {RouteComponentProps, Link} from 'react-router-dom';

interface ProjectItem {
    id:number;
    title:string;
    update_at:string;
    private:number
}

interface ProjectObject {
    personalProjects: ProjectItem[]
}

const PersonalProjectListDashboard : FC<ProjectObject> = (props:ProjectObject) => {
    return (
        <div>
            {props.personalProjects.map((project:ProjectItem)=>{
                return (
                    <div key={project.id}>
                        title: {project.title}
                        private: {project.private}
                        <Link to = {`/${project.id}`}><p>pick this one</p></Link>
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalProjectListDashboard;