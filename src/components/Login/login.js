import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../../context/useUser'
import { FaUserAlt, FaLock } from 'react-icons/fa'

export function Login() {
  //We need the login function from the user context
  const { login } = useUser()
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  const [disabled, setDisabled] = useState(false)
  const [serverError, setServerError] = useState(null)

  const onSubmit = async (data) => {
    const { email, password } = data
    if (isSubmitting) {
      setDisabled(true)
    }
    try {
      await login(email, password)
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        setServerError(
          'Unauthorized user, try another email and password combinitaion'
        )
      } else {
        setServerError(
          'The server could not be reached. Please try again later.'
        )
      }
    }
  }

  //Checking if valid. If not we will disable the button.
  useEffect(() => {
    if (!isValid) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [isValid])

  return (
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
          {errors.email?.type === 'required' && <span>Email is required</span>}
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
            className={`input-group ${errors.password && 'input-group--error'}`}
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
        {serverError && <span>{serverError}</span>}
      </form>
    </div>
  )
}
