import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export function AddTodoForm({ addTodo, toggleNew }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useFormContext()

  useEffect(() => {
    if (errors.add?.type === 'minLength') {
      toast.error('A todo must be atleast 1 character long', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      clearErrors('add')
    }

    if (errors.add?.type === 'maxLength') {
      toast.error('A todo cannot exceed 25 characters', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      clearErrors('add')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.add])

  return (
    <>
      <div className='add'>
        <div className={`input-group ${errors.add && 'input-group--error'}`}>
          <FaPlus className='icon' />
          <input
            {...register('add', {
              required: true,
              minLength: {
                value: 1
              },
              maxLength: {
                value: 25
              }
            })}
            type='text'
            placeholder='Add New Item'
          />
        </div>
        <div>
          <button className='cancel' onClick={() => toggleNew(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit(addTodo)}>Save</button>
        </div>
      </div>
    </>
  )
}
