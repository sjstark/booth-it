import React, { useState, useEffect, useContext } from 'react'

import { useSelector } from 'react-redux'

import { format } from 'date-fns'

import SocketContext from '../../utils/socket'

import './Messenger.scss'

// The python json-ify is adding leading and trailing quotes, just remove any for this.
function parseJSONdatetime(datetime) {
  datetime = datetime.replace(/(^")|("$)/g, "")
  return new Date(datetime)
}



function MessagesList({ data }) {
  return (
    <div className="messenger__list">
      {data.length > 0 &&
        data.map((msgObj, idx) => (
          <div key={`${msgObj.username} ${idx}`}>
            <p>
              <span>{msgObj.user.firstName} {msgObj.user.lastName[0]}</span>
              <span>@ {format(msgObj.time, "K:mm aa")} :</span>
              <span>{msgObj.msg}</span>
            </p>
            <br />
          </div>
        ))
      }
    </div>
  )
}


function MessageInput({ message, setMessage, sendMessage }) {

  const keyUp = ({ key }) => {
    if (key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div
      className="messenger__input"
      onClick={sendMessage}
      onKeyUp={keyUp}
    >
      <div className="messenger__input-text"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="messenger__input-text-field"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </div>
      <i className="fas fa-paper-plane" />
    </div>
  )
}



export default function Messenger({ roomId }) {

  const socket = React.useContext(SocketContext)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [roomName, setRoomName] = useState('Connecting...')

  const user = useSelector(state => state.user)

  useEffect(() => {

    // Connect the user to the passed in room id
    socket.emit('join', {
      room: roomId,
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

      setRoomName(data.roomName)
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
      socket.emit('leave', { room: roomId })
      socket.off('message', messageHandler)
      socket.on('user disconnected', disconnectHandler)
      socket.on('user connected', connectHandler)
    })
  }, [roomId])

  const sendMessage = e => {
    if (message !== '') {
      socket.emit('message', {
        room: roomId,
        msg: message,
        user
      });
      setMessage('')
    }
  }

  return (
    <div className="messenger">
      <h2 className="messenger__title">
        <span>
          Chat:
        </span>
        <span>
          {roomName}
        </span>
      </h2>
      <MessagesList
        data={messages}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}
