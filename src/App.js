import { useUser } from './context/useUser'
import { Login } from './components/Login'
import { Todo } from './components/Todo'
import './styles/main.scss'

function App() {
  const { isAuthenticated } = useUser()
  return <main>{isAuthenticated ? <Todo /> : <Login />}</main>
}

export default App
