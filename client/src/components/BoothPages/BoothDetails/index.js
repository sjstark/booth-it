import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Messenger from '../../Messenger'
import ProfileHeader from './ProfileHeader'
import ProfileSection from './ProfileSection'

export default function BoothDetails() {
  const { SID, BID } = useParams()
  const [boothInfo, setBoothInfo] = useState({})
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/shows/${SID}/booths/${BID}/`)
      const resJSON = await res.json()
      setBoothInfo(resJSON)
      console.log(resJSON)
    })()
  }, [])

  return (
    <div>
      <ProfileHeader booth={boothInfo} />
      {boothInfo.profile &&
        boothInfo.profile.sections.map((section, idx) => (
          <ProfileSection
            contents={section}
            key={`section${BID}${idx}`}
          />
        ))
      }
      <Messenger
        roomId={BID}
      />
    </div>
  )
}
