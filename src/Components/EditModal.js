import React, {useEffect, useState} from "react";
import axios from "axios";

const EditModal = ({handleSave,idTodo,url,setOpen}) => {
    const [todo, setTodo] = useState({})

    useEffect(() => {
        axios.put(`${url}/${idTodo}`)
            .then(({data}) => {
                setTodo(data)
            })
    }, [idTodo]);

    const  handleEdit = (e) => {
        setTodo({...todo,completed: e.target.checked,completedAt:new Date()})
    }

    return (
        <>
            <input type="text" value={todo.title} onChange={(e) => {
                setTodo({...todo,title: e.target.value})
            }}/>
            <input type="checkbox" onChange={handleEdit} checked={todo.completed}/>
            <button onClick={() => {
                handleSave(todo)
                setOpen(false)
            }}>Save</button>
            <button onClick={() => setOpen(false)}>Close</button>
        </>
    )
}

export default EditModal