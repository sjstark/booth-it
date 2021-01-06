import React, { useState } from 'react'

import { Modal } from '../../context/Modal'
import SignupForm from './SignupForm'

export default function SignupFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="navbar__button navbar__button--primary" onClick={() => {
        setShowModal(true)
      }}>Sign Up</div>
      {showModal && (
        <>
          <Modal onClose={() => setShowModal(false)}>
            <SignupForm />
          </Modal>
        </>
      )}
    </>
  )
}
