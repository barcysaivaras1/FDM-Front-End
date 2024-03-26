import { useState, useEffect } from 'react'
import Login from './components/Login'
import axios from 'axios'


function App() {
  const fetch =  () => {
    axios.get(
      `http://127.0.0.1:5000/users/profile`, {withCredentials:true}
    )
    .then(function(response){console.log(response)})
    console.log("giigiti")
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <Login />
  )
}

export default App
