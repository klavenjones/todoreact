import { useState, useEffect } from 'react'
import api from '../lib/axios'

//This is just formatting the user object. This will be the shape of the user we will use in this app
const formatUser = (user) => ({
  userId: user.user_id,
  email: user.user_email,
  image: user.user_profile_image,
  username: user.user_username
})

export function useAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [isAuthenticated, setAuthenticated] = useState(false)

  const setUser = async (user) => {
    //Format User
    let formattedUser = formatUser(user)
    //Set Auth user
    setAuthUser(formattedUser)
    //Save user in local storage
    localStorage.setItem('user', JSON.stringify(formattedUser))
    setAuthenticated(true)
  }

  const logout = async () => {
    setAuthUser(null)
    setAuthenticated(false)
    localStorage.removeItem('user')
  }

  const login = async (email, password) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    const response = await api({
      method: 'POST',
      url: '/Tests/scripts/user-login.php',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    setUser(response.data)
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem('user')
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn)
      setAuthUser(foundUser)
      setAuthenticated(true)
    }
  }, [])

  return {
    login,
    logout,
    authUser,
    isAuthenticated
  }
}
