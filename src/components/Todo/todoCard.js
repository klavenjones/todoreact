import { useState } from 'react'
import { EditTodoForm, TodoItem } from './'

export function TodoCard({ deleteTodo, saveTodo, todo }) {
  //Need state to toggle Edit Form
  const [editTodo, setEdit] = useState(false)

  const toggleEdit = (todo) => {
    setEdit(true)
  }
  
   return (
    <>
      {editTodo ? (
        <EditTodoForm saveTodo={saveTodo} todo={todo} toggleEdit={setEdit} />
      ) : (
        <TodoItem
          deleteTodo={deleteTodo}
          toggleEdit={toggleEdit}
          todo={todo}
          editTodo={editTodo}
        />
      )}
    </>
  )
}
