import React, { useState, useEffect, useContext, useRef } from 'react'
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
    let msgBody = msg.split('\n').filter(line => line !== '')
    return (
      <div className={`messenger__list-item${sender.id == user.id ? "--local" : ""}`}>
        {
          sender.profilePicUrl
            ?
            <img
              src={sender.profilePicUrl}
              className="messenger__list-item-pic"
            />
            :
            <div className="messenger__list-item-pic">
              <i className="fas fa-user" />
            </div>
        }
        <span className="messenger__list-item-details">
          {[sender.firstName, sender.lastName[0], "at", formattedTime].join(' ')}
        </span>
        <div
          className="messenger__list-item-bubble"
        >
          <div className="messenger__list-item-bubble-tip" />
          <p className="messenger__list-item-content">
            {msgBody.map((line, idx) => {
              return (
                <span key={`${msg}${line}${idx}`}>{line}<br /></span>
              )
            })}
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
  const messageListRef = useRef({ current: { scrollTop: 0, offsetHeight: 0, scrollHeight: 0 } })

  const [showScrollToBottom, setShowScrollToBottom] = useState(false)

  const [scrollDistFromTop, setScrollDistFromTop] = useState(0)
  const [scrollableHeight, setScrollableHeight] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)

  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState(null)

  const scrollToBottom = () => {
    let scrollableHeight = messageListRef.current.scrollHeight
    messageListRef.current.scrollTo({ top: scrollableHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    if (messageListRef.current) {
      setElementHeight(messageListRef.current.offsetHeight)
      setScrollableHeight(messageListRef.current.scrollHeight)
    }
  },
    [
      messageListRef.current.offsetHeight,
      messageListRef.current.scrollHeight
    ]
  )

  useEffect(() => {
    if (!isScrolled) {
      scrollToBottom()
    }
  }, [data, isScrolled])

  useEffect(() => {
    if (elementHeight + scrollDistFromTop < scrollableHeight) {
      setShowScrollToBottom(true)
    } else {
      setShowScrollToBottom(false)
    }

  },
    [scrollDistFromTop,
      scrollableHeight,
      elementHeight
    ]
  )

  const handleScroll = (e) => {
    setScrollDistFromTop(messageListRef.current.scrollTop)
    if (scrollTimeout) clearTimeout(scrollTimeout)
    const timeout = setTimeout(() => {
      scrollToBottom()
      setIsScrolled(false)
      setScrollTimeout(null)
    }, 15000)
    setScrollTimeout(timeout)
  }

  return (
    <div
      className="messenger__list" ref={messageListRef}
      onScroll={handleScroll}
    >
      {showScrollToBottom && (
        <div
          className="messenger__list-jump"
          onClick={(e) => { e.stopPropagation(); scrollToBottom() }}
        >
          Jump To Recent
        </div>
      )}
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


function MessageInput({ message, setMessage, sendMessage, inputRef }) {
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
          ref={inputRef}
        />
      </div>
      <i className="fas fa-paper-plane" />
    </div>
  )
}


export default function Messenger({ roomId }) {

  const socket = React.useContext(SocketContext)

  const inputRef = useRef(null)

  const [showMessenger, setShowMessenger] = useState(false)
  const [missedMessages, setMissedMessages] = useState(0)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [roomName, setRoomName] = useState('Connecting...')

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!showMessenger) {
      setMissedMessages(0)
    }
  }, [showMessenger])

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
      if (!showMessenger) {
        setMissedMessages(count => count + 1)
      }
      setMessages(prevMsg => [...prevMsg, data])
    }

    const connectHandler = (data) => {
      data.type = "connection"
      data.time = parseJSONdatetime(data.time)

      setRoomName(data.roomName)
      setMessages(prevMsg => [...prevMsg, data])
    }

    const disconnectHandler = (data) => {
      data.type = "disconnection"
      data.time = parseJSONdatetime(data.time)
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

  const openMessenger = (e) => {
    e.stopPropagation();
    if (!showMessenger) {
      setShowMessenger(prev => !prev)
      inputRef.current.focus()
    }
  }

  return (
    <div className='messenger__clipping-container'>
      <div
        className={`messenger ${showMessenger ? "" : "--hidden"}`}
        onClick={openMessenger}
      >
        <h2 className="messenger__title">
          <span>
            Chat:
          </span>
          <span>
            {roomName}
          </span>
          {
            !showMessenger && missedMessages != 0 && (
              <div className="messenger__missed-messages">
                {missedMessages}
              </div>
            )}
          <div
            className="messenger__min"
            onClick={(e) => { e.stopPropagation(); setShowMessenger(prev => { if (!prev) { inputRef.current.focus() }; return !prev }) }}
          >
            {
              showMessenger
                ?
                <i className="fas fa-window-minimize" style={{ transform: "translateY(-.55em)" }} />
                :
                <i className="far fa-window-maximize" />
            }
          </div>
        </h2>
        <MessagesList
          data={messages}
        />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          inputRef={inputRef}
        />
      </div>
    </div>
  )
}
