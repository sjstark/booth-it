import React from 'react'
import Button from '../../../../Button'

export default function AddSection({ add, setEditting }) {
  return (
    <div>
      <Button
        color="secondary"
        onClick={() => {
          setEditting(true)
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
