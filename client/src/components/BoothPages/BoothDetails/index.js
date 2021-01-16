import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Messenger from '../../Messenger'

export default function BoothDetails() {
  const { SID, BID } = useParams()
  const [boothInfo, setBoothInfo] = useState({})

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/shows/${SID}/booths/${BID}/`)
      const resJSON = await res.json()
      setBoothInfo(resJSON)
    })()
  }, [])

  return (
    <div>
      {/* <div>
        {SID}
      </div>
      <div>
        {BID}
      </div> */}
      <Messenger
        roomId={BID}
      />
    </div>
  )
}
