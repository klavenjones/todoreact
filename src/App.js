import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import './styles/main.scss'
import { isCompositeComponentWithType } from 'react-dom/test-utils'

function App() {
  const {
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
    handleSubmit
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (data, e) => {
    if (isSubmitting) {
      setDisabled(true)
    }
    try {
      const response = await fetch(
        'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(data)
        }
      )
      console.log(response.json())
    } catch (error) {
      console.log(error.message)
    }
  }

  //Checking if valid. If not we will disable the button.
  useEffect(() => {
    if (!isValid) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    console.log(isValid)
  }, [isValid])

  return (
    <main>
      <div className='container'>
        <h1>Rapptr Labs</h1>
        <form className='login' onSubmit={handleSubmit(onSubmit)}>
          <div className='login__input '>
            <label htmlFor='email'>Email</label>
            <div
              className={`input-group ${errors.email && 'input-group--error'}`}
            >
              <FaUserAlt className='icon' />
              <input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'This not a valid email'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Email should not exceed 50 characters'
                  }
                })}
                type='text'
                id='email'
                placeholder='user@rapptrlabs.com'
              />
            </div>
            {errors.email?.type === 'required' && (
              <span>Email is required</span>
            )}
            {errors.email?.type === 'manual' && (
              <span>{errors.email.message}</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span>{errors.email.message}</span>
            )}
            {errors.email?.type === 'maxLength' && (
              <span>{errors.email.message}</span>
            )}
          </div>
          <div className='login__input'>
            <label htmlFor='password'>Password</label>
            <div
              className={`input-group ${
                errors.password && 'input-group--error'
              }`}
            >
              <FaLock className='icon' />
              <input
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 4,
                    message: 'Password should atleast be 4 characters'
                  },
                  maxLength: {
                    value: 16,
                    message: 'Password should not exceed 16 characters'
                  }
                })}
                type='password'
                id='password'
                placeholder='Must be at least 4 characters'
              />
            </div>
            {errors.password?.type === 'required' && (
              <span>Password is required</span>
            )}
            {errors.password?.type === 'manual' && (
              <span>{errors.password.message}</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span>{errors.password.message}</span>
            )}
            {errors.password?.type === 'maxLength' && (
              <span>{errors.password.message}</span>
            )}
          </div>
          <button type='submit' disabled={disabled}>
            Login
          </button>
          {errors.server && (
            <span>
              The server could not be reached. Please try again later.
            </span>
          )}
        </form>
      </div>
    </main>
  )
}

export default App
