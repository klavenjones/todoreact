import { useState } from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import './styles/main.scss'

function App() {
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let error = {}
    if (!email || !emailIsValid(email)) {
      error.email = 'Email is not valid'
    }

    if (!password || password.length < 4) {
      error.password = 'Password is not valid'
    }
    setErrors({ ...error, ...errors })
  }

  return (
    <main>
      <div className='container'>
        <h1>Rapptr Labs</h1>
        <form className='login' onSubmit={handleSubmit}>
          <div className='login__input'>
            <label htmlFor='email'>Email</label>
            <div className='input-group'>
              <FaUserAlt className='icon' />
              <input
                type='text'
                name='email'
                id='email'
                placeholder='user@rapptrlabs.com'
                value={email}
                onFocus={() => setErrors({})}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className='login__input'>
            <label htmlFor='password'>Password</label>
            <div className='input-group'>
              <FaLock className='icon' />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Must be at least 4 characters'
                onFocus={() => setErrors({})}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type='submit'>Login</button>
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
