import React, { useState, useEffect, useContext } from 'react'

import { useSelector } from 'react-redux'

import { format } from 'date-fns'

import SocketContext from '../../utils/socket'


// The python json-ify is adding leading and trailing quotes, just remove any for this.
function parseJSONdatetime(datetime) {
  datetime = datetime.replace(/(^")|("$)/g, "")
  return new Date(datetime)
}


export default function Messenger({ roomId }) {

  const socket = React.useContext(SocketContext)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(roomId)

  const user = useSelector(state => state.user)

  useEffect(() => {

    // Connect the user to the passed in room id
    socket.emit('join', {
      room,
      user
    })

    // Store message data into array with type tag (for rendering)
    const messageHandler = (data) => {
      data.type = "message"
      data.time = parseJSONdatetime(data.time)
      console.log(data)
      setMessages(prevMsg => [...prevMsg, data])
    }

    const connectHandler = (data) => {
      data.type = "connection"
      data.time = parseJSONdatetime(data.time)
      console.log(data)
      setMessages(prevMsg => [...prevMsg, data])
    }

    const disconnectHandler = (data) => {
      data.type = "disconnection"
      data.time = parseJSONdatetime(data.time)
      console.log(data)
      setMessages(prevMsg => [...prevMsg, data])
    }

    // Initiate all relevant chat listeners on component mount
    socket.on('message', messageHandler)
    socket.on('user disconnected', disconnectHandler)
    socket.on('user connected', connectHandler)

    // On component unmount, leave chat room and remove all relevant listeners
    return (() => {
      socket.emit('leave', { room })
      socket.off('message', messageHandler)
      socket.on('user disconnected', disconnectHandler)
      socket.on('user connected', connectHandler)
    })
  }, [room])

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onClick = e => {
    if (message !== '') {
      socket.emit('message', {
        room,
        msg: message,
        user
      });
      setMessage('')
    } else {
      alert('Please Add A Message')
    }
  }

  return (
    <div>
      {messages.length > 0 &&
        messages.map((data, idx) => (
          <div key={`${data.username} ${idx}`}>
            <p>
              <span>{data.user.firstName} {data.user.lastName[0]}</span>
              <span>@ {format(data.time, "K:mm aa")} :</span>
              <span>{data.msg}</span>
            </p>
            <br />
          </div>
        ))
      }
      <input value={message} name="message" onChange={onChange} />
      <button onClick={onClick}>Send Message</button>
    </div>
  )
}
