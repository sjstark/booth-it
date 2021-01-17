import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Messenger from '../../Messenger'
import ProfileHeader from './Sections/ProfileHeader'
import ProfileSection from './Sections/ProfileSection'
import AddSection from './Sections/AddSection'
import Loader from '../../Loader'

import './BoothDetails.scss'

export default function BoothDetails() {
  const history = useHistory()
  const { SID, BID } = useParams()
  const [boothInfo, setBoothInfo] = useState({})
  const [editable, setEditable] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/shows/${SID}/booths/${BID}/`)
      const resJSON = await res.json()
      setBoothInfo(resJSON)
      setEditable(Boolean(resJSON.isAdmin))
      setIsLoaded(true)

    })()
  }, [])

  return (
    <>
      <div className="booth-profile__back"
        onClick={() => { history.goBack() }}
      >
        <i className="fas fa-chevron-left" />
      </div>
      {isLoaded
        ?
        <>
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
                <AddSection
                  BID={BID}
                />
              </>
            )}
          </div>

          <Messenger
            roomId={BID}
          />
        </>
        :
        <div style={{ width: "100%", height: "100%" }}>
          <Loader
            duration={2500}
            style={{
              width: `${300 * 0.86602543}px`,
              height: `${300}px`,
              margin: "200px auto"
            }}
          />
        </div>
      }
    </>
  )
}
