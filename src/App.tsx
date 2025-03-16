import { useState } from 'react'
import { ChatBotPage } from './pages/chatbot'

import './styles/App.scss'

function App() {

  return (
    <>
      <div className='chatBox'>
          <h2>Chat</h2>
          <ChatBotPage />
      </div>
    </>
  )
}

export default App
