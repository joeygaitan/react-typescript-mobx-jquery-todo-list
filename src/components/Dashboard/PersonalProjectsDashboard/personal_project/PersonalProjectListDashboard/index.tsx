import React, { FC, useState, useEffect } from 'react';

import {RouteComponentProps, Link, withRouter} from 'react-router-dom';



interface ProjectItem {
    id:number;
    title:string;
    update_at:string;
    private:number
}

interface PersonalProjectListProps extends RouteComponentProps {
    personalProjects: ProjectItem[]
}

const PersonalProjectListDashboard : FC<PersonalProjectListProps> = (props:PersonalProjectListProps) => { 

    return (
        <div>
            {(props.personalProjects) ? props.personalProjects.map((project:ProjectItem)=>{
                return (
                    <div key={project.id}>
                        title: {project.title}
                        private: {project.private}
                        <Link to = {`/${project.id}`}><p>pick this one</p></Link>
                    </div>
                )
            }): ""}

        </div>
    )
}

export default withRouter(PersonalProjectListDashboard);