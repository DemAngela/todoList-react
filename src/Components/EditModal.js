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
            <div className={'editWrapper'}>
                <input className={'editText'} type="text" value={todo.title} onChange={(e) => {
                    setTodo({...todo,title: e.target.value})
                }}/>
                <div className={'editInner'}>
                    <button className={'save'} onClick={() => {
                        handleSave(todo)
                        setOpen(false)
                    }}>Save</button>
                    <input  type="checkbox" onChange={handleEdit} checked={todo.completed}/>
                    <button className={'close'} onClick={() => setOpen(false)}>Close</button>
                </div>
            </div>
        </>
    )
}

export default EditModal