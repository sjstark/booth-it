import React from 'react'

import { useParams } from 'react-router-dom'

export default function ShowDetails() {
  let { SID } = useParams()

  return (
    <div>
      {SID}
    </div>
  )
}
