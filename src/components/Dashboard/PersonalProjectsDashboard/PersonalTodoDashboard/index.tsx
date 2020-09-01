import React, { FC } from 'react';
import { Link } from 'react-router-dom'

// work on an inteface for personalTodosArray.......

const PersonalTodoDashboard : FC<any> = (props:any) => {

    // display todo lists of projects
    // a. view of all projects
    // b. view of project
    // c. view of todo task
    
    // 2. sprint view
    // 2. todo list view
    // 3. weekly calender view
    // 4. today view
    // 5. monthly calender view
    // 7. project view
    // 8. goal view

    return (
        <div className="personalTodosCardContainer"><p>Todos</p>
        <div>{(props.personalTodosArray) ? props.personalTodosArray.map((todo:any)=>{
            return <Link to = {`/todo/${todo.id}`}><p key={todo.id}>{todo.header}</p></Link>
        }) : ""}</div>
        </div>
    )
}

export default PersonalTodoDashboard;