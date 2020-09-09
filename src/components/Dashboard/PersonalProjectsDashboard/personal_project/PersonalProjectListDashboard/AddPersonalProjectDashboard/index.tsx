import React, { FC, useState, useEffect } from 'react';

interface IProps {
    addOne: (input:any)=>Promise<void>
}

 const AddPersonalProject:FC<IProps> = (props:IProps) => {
    const [state, setState] = useState({title:"", private:false})
    
    return (
        <div>
            New Personal Project
            <br/>
            title<input type="text" name="title" defaultValue={state.title} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]: value
                })}}/>
            private <input type="checkbox" name="private" id="" defaultChecked={state.private} onChange={(event)=>{
                const { name } = event.target;
                setState({
                    ...state,
                    [name]: !state.private
                })}}/>
            <br/>
            <button onClick={()=>{props.addOne(state)}}>add one</button>
        </div>
    )
}

export default AddPersonalProject;