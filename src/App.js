import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from './context/useUser'
import { Login } from './components/Login'
import { Todo } from './components/Todo'
import './styles/main.scss'

const url = '/Tests/scripts/user-login.php'

function App() {
  const { login, authUser, isAuthenticated } = useUser()
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
      let response = await login(email, password)
      console.log(response)
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
    console.log(isValid)
  }, [isValid])

  return <main>{isAuthenticated ? <Todo /> : <Login />}</main>
}

export default App
