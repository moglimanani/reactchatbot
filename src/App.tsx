import { useState } from 'react'
import { ChatBotPage } from './pages/chatbot'

import './styles/App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ChatBotPage />
    </>
  )
}

export default App
