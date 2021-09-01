import React from 'react'
import { useUser } from '../../context/useUser'

export function Todo() {
  const { logout } = useUser()
  return (
    <div className='container'>
      <h1>Logged in</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
