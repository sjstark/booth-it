import React from 'react'
import Button from '../../../../Button'

export default function AddSection({ add }) {
  return (
    <div>
      <Button
        color="secondary"
        onClick={() => {
          add(prev => {
            return [...prev, { type: 'new' }]
          })
        }}
      >
        Add Section
      </Button>

    </div>
  )
}
