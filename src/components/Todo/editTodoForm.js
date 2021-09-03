import { useEffect } from 'react'
import { FaPen } from 'react-icons/fa'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export function EditTodoForm({ saveTodo, todo, toggleEdit, current }) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useFormContext()

  //This will set the current value of the form we would like to edit
  useEffect(() => {
    setValue('edit', todo.title)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (errors.edit?.type === 'minLength') {
      toast.error('A todo must be atleast 1 character long', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      clearErrors('edit')
    }
    if (errors.edit?.type === 'maxLength') {
      toast.error('A todo cannot exceed 25 characters', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      clearErrors('edit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.edit])

  return (
    <>
      <li>
        <div className='input-group'>
          <FaPen className='icon' />
          <input
            {...register('edit', {
              minLength: {
                value: 1
              },
              maxLength: {
                value: 25
              }
            })}
            type='text'
            placeholder={todo.title}
          />
        </div>
        <div>
          <button className='cancel' onClick={() => toggleEdit(false)}>
            Cancel
          </button>
          <button
            onClick={handleSubmit((data) => {
              saveTodo(todo.id, todo, data)
              toggleEdit(false)
            })}
          >
            Save
          </button>
        </div>
      </li>
    </>
  )
}
