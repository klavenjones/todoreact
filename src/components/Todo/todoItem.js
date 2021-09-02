
import { FaPen, FaTrash } from 'react-icons/fa'

export function TodoItem({ deleteTodo, toggleEdit, todo }) {
  return (
    <>
      <li>
        <div className='item__name'>
          <p>{todo.title}</p>
        </div>
        <div className='item_buttons'>
          <FaPen className='icon' onClick={() => toggleEdit(todo)} />
          <FaTrash className='icon' onClick={() => deleteTodo(todo.id)} />
        </div>
      </li>
    </>
  )
}
