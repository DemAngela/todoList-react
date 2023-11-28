import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditModal from "./Components/EditModal";
const url = 'https://65642486ceac41c0761d7ee4.mockapi.io/todo'


function App() {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const [idTodo, setIdTodo]  = useState('')
    const [editModalOpen, setEditModalOpen] = useState(false)

    const handleEdit = (idTodo) =>{
        setEditModalOpen (true)
        setIdTodo(idTodo)
    }

    useEffect(() => {
        axios('https://65642486ceac41c0761d7ee4.mockapi.io/todo')
            .then(({data}) => setTodos(data))
    }, []);

    console.log(todos)

    const handleAddTod = () => {
        const newTodo = {
            title: todoTitle,
            completed: false,
            completeAt: null,
            createdAt: +new Date()
        }
        setTodoTitle('')
        axios.post(url, newTodo)
            .then(({data}) => setTodos([...todos, data]))
    }

    const handleDelete = (todo) => {
        axios.delete(`${url}/${todo.id}`, todo)
            .then(({data}) => setTodos(todos.filter(todo=>todo.id!==data.id)))
    }

    const handleSave =(todo) =>{
        axios.put(`${url}/${idTodo}`,todo)
            .then(({data})=>{
                setTodos(todos.map(el =>el.id  === data.id ? data:el))
            })
    }

    useEffect(() =>{
        axios.get(url)
            .then(({data}) =>setTodos(data))
    },[])


    return (
        <>
            <div className={'container'}>
                <h1>Todo List</h1>
                <div className={'todoMain'}>
                    <input className={'inputMain'}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        value={todoTitle}
                        type="text"/>
                    <button className={'mainBtn'} onClick={handleAddTod}>OK</button>
                </div>
                {
                    editModalOpen &&
                    <EditModal handleSave={handleSave} setOpen={setEditModalOpen} idTodo ={idTodo} url={url}/>


                }
                {
                    todos.map(todo =>
                        <div key={todo}>
                            <div className={'todoWrapper'}>
                                <input type="checkbox" checked={todo.completed}/>
                                <h3>{todo.title}</h3>
                                <span className={'dateWrapper'}>
                                    {dayjs(todo.createdAt).format('HH:mm DD.MM.YYYY')}
                                </span>
                                <button className={'editBtn'} onClick={() =>handleEdit(todo.id)}>Edit</button>
                                <button className={'deleteBtn'} onClick={() => handleDelete(todo)}>Х</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default App;
