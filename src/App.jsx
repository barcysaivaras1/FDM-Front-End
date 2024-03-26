import { useState } from 'react'
import './css/App.css'
import Login from './components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Login />
  )
}

export default App
