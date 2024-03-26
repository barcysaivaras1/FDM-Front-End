import { useState, useEffect } from 'react'
import Login from './components/Login'
import axios from 'axios'


function App() {
  /* IMPORTANT - this is only a basic showcase and requires you to manually insert a session cookie into your browser.
  */

  // fetches a user's profile
  const fetch =  () => {
    axios.get(
      // use localhost rather than 127.0.0.1 for consistency
      // withCredentials allows a cookie to be passed alongside the request which is important to authenticate the user
      `http://localhost:5000/users/profile`, { withCredentials:true }
    )
    .then(function(response){
      console.log(response)
    })
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    // <Login />
    <div>
      {/* the default pfp file is being hosted on the server at path {backend_folder}/static/default.png */}
      <img src="http://localhost:5000/static/default.png" width={100} />
    </div>
  )
}

export default App
