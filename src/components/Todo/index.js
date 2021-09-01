import { useState } from 'react'
import { FaSearch, FaPlus, FaPen, FaTrash } from 'react-icons/fa'
import { useUser } from '../../context/useUser'

import Navigation from './navigation'

function AddTodoForm() {
  return (
    <>
      <div className='add'>
        <div className='input-group'>
          <FaPlus className='icon' />
          <input type='text' placeholder='Add New Item' />
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    </>
  )
}
function EditTodoForm({ saveTodo }) {
  return (
    <>
      <li>
        <div className='input-group'>
          <FaPen className='icon' />
          <input type='text' placeholder='Edit Item' />
        </div>
        <div>
          <button onClick={() => saveTodo()}>Save</button>
        </div>
      </li>
    </>
  )
}

export function Todo() {
  const [editTodo, setEdit] = useState(false)
  const [newTodo, setNew] = useState(false)

  const handleSave = () => {
    setEdit(!editTodo)
  }

  return (
    <>
      <Navigation />
      <h2>My To-Do List</h2>
      <div className='container todo'>
        <div className='todo__list'>
          <div className='header'>
            <div className='input-group'>
              <FaSearch className='icon' />
              <input type='text' placeholder='Search' />
            </div>
            <div>
              <button onClick={() => setNew(!newTodo)}>New Todo</button>
            </div>
          </div>
          {newTodo && <AddTodoForm type='add' />}
          <div className='items'>
            <ul>
              {editTodo ? (
                <EditTodoForm saveTodo={handleSave} />
              ) : (
                <li>
                  <div className='item__name'>
                    <p>TODO NAME</p>
                  </div>
                  <div className='item_buttons'>
                    <FaPen
                      className='icon'
                      onClick={() => setEdit(!editTodo)}
                    />
                    <FaTrash
                      className='icon'
                      onClick={() => setEdit(!editTodo)}
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
