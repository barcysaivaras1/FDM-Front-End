import { useState, useEffect } from 'react'
import Login from './components/Login'
import axios from 'axios'


function App() {
  const fetch =  () => {
    axios.get(
      `http://localhost:5000/users/profile`, {withCredentials:true}
    )
    .then(function(response){console.log(response)})
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <img src="http://localhost:5000/static/default.png" width={100} />
    </div>
  )
}

export default App
