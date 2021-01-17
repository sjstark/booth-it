import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../Button'
import Messenger from '../../Messenger'
import ProfileHeader from './Sections/ProfileHeader'
import ProfileSection from './ProfileSection'

import './BoothDetails.scss'

export default function BoothDetails() {
  const history = useHistory()
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
    <>
      <div className="booth-profile__back"
        onClick={() => { history.goBack() }}
      >
        <i className="fas fa-chevron-left" />
      </div>
      <div className="booth-profile">
        <ProfileHeader
          booth={boothInfo}
          editable={editable}
        />
        {boothInfo.profile &&
          boothInfo.profile.sections.map((section, idx) => (
            <ProfileSection
              contents={section}
              editable={editable}
              key={`section${BID}${idx}`}
            />
          ))
        }
        {editable && (
          <>
            {/* <AddSection
            BID={BID}
          /> */}
          </>
        )}
      </div>

      <Messenger
        roomId={BID}
      />
    </>
  )
}
