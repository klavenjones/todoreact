import { useUser } from '../../context/useUser'

export function Navigation() {
  const { logout, authUser } = useUser()

  return (
    <nav className='navbar'>
      <div className='navbar__nav'>
        <p>{authUser.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
