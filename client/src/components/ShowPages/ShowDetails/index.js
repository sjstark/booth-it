import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Loader from '../../Loader'
import HexGridLayout from '../../HexGridLayout'
import OwnerMenu from '../../OwnerMenu'

import { cacheImages } from '../../../utils/cacheImages'
import HolderSVG from '../../HolderSVG'



function BoothsList({ showInfo, SID }) {
  const history = useHistory()

  const addDefaultSrc = (e) => {
    e.target.src = "https://boothit-hosting.s3.amazonaws.com/shows/DEFAULT/logo.png"
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <HexGridLayout style={{ width: "90vw" }}>
        {showInfo.booths.map(booth => {
          let childProps = {
            cardcolor: booth.secondaryColor,
            buttoncolor: booth.primaryColor,
            title: booth.company,
            onClick: () => history.push(`/shows/${SID}/booths/${booth.BID}`)
          }

          return (
            <div key={booth.BID}  {...childProps} >
              {
                booth.boothLogoURL
                  ?
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%" }}
                    src={booth.boothLogoURL}
                    alt={booth.title}
                  />
                  :
                  <HolderSVG
                    style={{ width: "100%" }}
                    color={booth.primaryColor}
                  />
              }
            </div>
          )
        })}
      </HexGridLayout>
    </div>
  )
}


export default function ShowDetails() {
  const history = useHistory()
  let { SID } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jsonLoaded, setJsonLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showInfo, setShowInfo] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/shows/${SID}/`)
      const resJSON = await res.json()
      setShowInfo(resJSON)
      cacheImages(resJSON.booths.map(booth => booth.boothLogoURL), setImagesLoaded)
      setJsonLoaded(true)
    })()
  }, [])

  useEffect(() => {
    setIsLoaded(jsonLoaded && imagesLoaded)
  }, [jsonLoaded, imagesLoaded])

  let loaderHeight = 200

  return (
    <div>
      <div className="booth-profile__back"
        onClick={() => { history.push(`/shows/`) }}
      >
        <i className="fas fa-chevron-left" />
      </div>
      <h1 style={{ fontSize: "30px", fontFamily: "'Bungee', sans-seriff", margin: "15px", marginBottom: "0", marginLeft: "60px" }}>
        {isLoaded ? showInfo.title : "Loading..."}
      </h1>
      {!isLoaded && (
        <>
          <div style={{ width: "100%", height: "100%" }}>
            <Loader
              duration={2500}
              style={{
                width: `${loaderHeight * 0.86602543}px`,
                height: `${loaderHeight}px`,
                margin: "200px auto"
              }}
            />
          </div>
        </>
      )}
      {isLoaded && (
        <>
          <div>
            {showInfo.owner &&
              <OwnerMenu show={showInfo} />
            }
          </div>
          <BoothsList showInfo={showInfo} SID={SID} />
        </>
      )
      }
    </div >
  )
}
