import React, { useState } from 'react'

import { Modal } from '../../context/Modal'
import LoginForm from './LoginForm'

export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="navbar__button" onClick={() => {
        setShowModal(true)
      }}>Log In</div>
      {showModal && (
        <>
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        </>
      )}
    </>
  )
}
