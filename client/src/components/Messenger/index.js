import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000"

const socket = io.connect(ENDPOINT)

export default function Messenger() {
  const [messages, setMessages] = useState(["Hello and welcome."])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages()
  }, [messages.length])

  const getMessages = () => {
    socket.on('message', msg => {
      setMessages([...messages, msg])
    })
  }

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onClick = e => {
    if (message !== '') {
      socket.emit('message', message);
      setMessage('')
    } else {
      alert('Please Add A Message')
    }
  }

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg, idx) => (
          <div key={msg + idx}>
            <p>{msg}</p>
            <br />
          </div>
        ))
      }
      <input value={message} name="message" onChange={onChange} />
      <button onClick={onClick}>Send Message</button>
    </div>
  )
}
