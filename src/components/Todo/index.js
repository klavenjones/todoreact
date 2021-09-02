import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { useUser } from '../../context/useUser'
import { v4 } from 'uuid'
import Navigation from './navigation'
import { AddTodoForm } from './addTodoForm'
import { TodoCard } from './todoCard'

import 'react-toastify/dist/ReactToastify.min.css'

export function Todo() {
  const methods = useForm({ mode: 'all', reValidateMode: 'onChange' })
  //Need state to toggle Edit and Add Forms
  const [query, setQuery] = useState('')
  const [editTodo, setEdit] = useState(false)
  const [newTodo, setNew] = useState(false)
  //Need State to keep track of todos, using lazy initial state
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem('todos')
    if (saveTodos) {
      return JSON.parse(saveTodos)
    }
    return []
  })
  // We need to get the user to save id to the todo list, that way we can associate the list to the user.
  const { authUser } = useUser()

  //Used to filter todos
  function filter(rows) {
    if (query === '') {
      return todos
    }
    return rows.filter(
      (row) => row.title.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    )
  }

  const addTodo = ({ add }) => {
    //We don't want to submit an empty string
    if (add !== '') {
      //Adding the new todos, to current state.
      setTodos([
        //Copying existing todos.
        ...todos,
        //Saving new Todo
        {
          id: v4(),
          title: add.trim(),
          userId: authUser.userId
        }
      ])
    }
    //Resetting React Hook Form
    methods.reset({ add: '' })
  }

  const toggleEdit = ({ todo }) => {
    setEdit(true)
  }

  const handleUpdate = (id, todo, updatedTodo) => {
    if (updatedTodo.edit !== '') {
      const todoToUpdate = { ...todo, title: updatedTodo.edit }
      const updated = todos.map((todo) => {
        return todo.id === id ? todoToUpdate : todo
      })
      setTodos(updated)
    }
  }

  //This will delete the item
  const handleDelete = (id) => {
    const removedTodo = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(removedTodo)
  }

  //Everytime we edit the todos state, we will save that state localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])



  return (
    <>
      <Navigation />
      <h2>My To-Do List</h2>
      {/* Provider allows for nested components access to React Hook Form methods  */}
      <FormProvider {...methods}>
        <div className='container todo'>
          <div className='todo__list'>
            <div className='header'>
              <div className='input-group'>
                <FaSearch className='icon' />
                <input
                  type='text'
                  placeholder='Search'
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div>
                <button onClick={() => setNew(!newTodo)}>New Todo</button>
              </div>
            </div>
            {newTodo && (
              <AddTodoForm type='add' addTodo={addTodo} toggleNew={setNew} />
            )}
            <div className='items'>
              <ul>
                {filter(todos).map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    editTodo={editTodo}
                    saveTodo={handleUpdate}
                    deleteTodo={handleDelete}
                    toggleEdit={toggleEdit}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FormProvider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
