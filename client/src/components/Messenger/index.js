import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

// const ENDPOINT = "http://localhost:5000"

const socket = io()

export default function Messenger() {
  const [messages, setMessages] = useState(["Hello and welcome."])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')

  useEffect(() => {
    getMessages()
  }, [messages.length])

  const getMessages = () => {
    socket.on('message', (msg) => {
      console.log('received message!')
      console.log(msg)
      setMessages([...messages, msg])
      console.log(messages)
    })
  }

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onClick = e => {
    if (message !== '') {
      socket.emit('message', { room, msg: message });
      setMessage('')
    } else {
      alert('Please Add A Message')
    }
  }

  const changeRoom = e => {
    setRoom(e.target.value)
  }

  const joinRoom = e => {
    if (room !== '') {
      socket.emit('join', { room });
    } else {
      alert('Please Enter A Room')
    }
  }

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg, idx) => (
          <div key={`${msg} ${idx}`}>
            <p>{msg}</p>
            <br />
          </div>
        ))
      }
      <input value={room} name="room" onChange={changeRoom} />
      <button onClick={joinRoom}>Join Room</button>
      <input value={message} name="message" onChange={onChange} />
      <button onClick={onClick}>Send Message</button>
    </div>
  )
}
