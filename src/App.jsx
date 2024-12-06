import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BillSplitApp from './Components/BillSplitApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BillSplitApp />
    </>
  )
}

export default App
