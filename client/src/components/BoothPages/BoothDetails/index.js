import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import axios from 'axios'

import Messenger from '../../Messenger'
import ProfileHeader from './Sections/ProfileHeader'
import ProfileSection from './Sections/ProfileSection'
import AddSection from './Sections/AddSection'
import Loader from '../../Loader'
import Button from '../../Button'

import DeleteModal from '../../Modals/DeleteModal'

import './BoothDetails.scss'

export default function BoothDetails() {
  const history = useHistory()
  const { SID, BID } = useParams()
  const [boothInfo, setBoothInfo] = useState({})
  const [editable, setEditable] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/shows/${SID}/booths/${BID}/`)
      const resJSON = await res.json()
      setBoothInfo(resJSON)
      setEditable(Boolean(resJSON.isAdmin))
      console.log(resJSON)
      setIsLoaded(true)

    })()
  }, [])

  const deleteBooth = async (e) => {
    const res = await axios.delete(`/api/shows/${SID}/booths/${BID}/`)
    history.replace(`/shows/${SID}`)
  }

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
          {boothInfo.isAdmin && (
            <div
              className="booth-profile__delete"
            >
              <Button
                color="warning"
                onClick={() => setOpenDelete(true)}
              >
                Delete
            </Button>
            </div>
          )}
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
            adminIds={boothInfo.employees.map(employee => employee.id)}
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
      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        deleteFn={deleteBooth}
        message={`Are you sure you want to delete ${boothInfo.company}'s Booth?\nThere is no recovering this action.`}
      />
    </>
  )
}
