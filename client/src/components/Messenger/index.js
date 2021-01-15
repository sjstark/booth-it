import React, { useState, useEffect, useContext } from 'react'

import { useSelector } from 'react-redux'

import { format } from 'date-fns'

import TextareaAutosize from 'react-textarea-autosize'

import SocketContext from '../../utils/socket'

import './Messenger.scss'

// The python json-ify is adding leading and trailing quotes, just remove any for this.
function parseJSONdatetime(datetime) {
  if (typeof datetime !== "string") { return datetime }
  datetime = datetime.replace(/(^")|("$)/g, "")
  return new Date(datetime)
}


function MessageItem({ msgObj }) {
  const user = useSelector(state => state.user)

  const { user: sender, time, msg, type } = msgObj

  const formattedTime = format(time, "K:mm aa")

  if (type === 'message') {
    return (
      <div className={`messenger__list-item`}>
        <img
          src={sender.profilePicUrl}
          className="messenger__list-item-pic"
        />
        <span className="messenger__list-item-details">
          {[sender.firstName, sender.lastName[0], "at", formattedTime].join(' ')}
        </span>
        <div
          className="messenger__list-item-bubble"
        >
          <div className="messenger__list-item-bubble-tip" />
          <p className="messenger__list-item-content">
            {msg}
          </p>
        </div>
      </div>
    )
  }
  if (type === 'connection') {
    return (
      <>
        <p className="messenger__connect-status">
          {`${sender.firstName} ${sender.lastName[0]} joined the chat.`}
        </p>
      </>
    )
  }
  if (type === 'disconnection') {
    return (
      <>
        <p className="messenger__connect-status">
          {`${sender.firstName} ${sender.lastName[0]} left the chat.`}
        </p>
      </>
    )
  }
  return (
    <>
    </>
  )
}


function MessagesList({ data }) {
  //TODO: Implement some type of auto scroll function

  return (
    <div className="messenger__list">
      {data.length > 0 &&
        data.map((msgObj, idx) => (
          <MessageItem
            key={`message${msgObj.msg}${idx}`}
            msgObj={msgObj}
          />
        ))
      }
    </div>
  )
}


function MessageInput({ message, setMessage, sendMessage }) {
  const [shiftDwn, setShiftDwn] = useState(false)

  const keyUp = ({ key }) => {
    if (key === "Enter" && !shiftDwn) {
      sendMessage()
    }
    else if (key === "Shift") {
      setShiftDwn(false)
    }
  }

  const keyDwn = ({ key }) => {
    if (key === "Shift") {
      setShiftDwn(true)
    }
  }

  return (
    <div
      className="messenger__input"
      onClick={sendMessage}
    >
      <div className="messenger__input-text"
        onClick={(e) => e.stopPropagation()}
      >
        <TextareaAutosize
          className="messenger__input-text-field"
          value={message}
          maxRows={4}
          onChange={({ target }) => setMessage(target.value)}
          onKeyUp={keyUp}
          onKeyDown={keyDwn}
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
      socket.emit('left', { room: roomId })
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
