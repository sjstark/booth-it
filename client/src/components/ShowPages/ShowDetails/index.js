import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Loader from '../../Loader'
import HexGridLayout from '../../HexGridLayout'

import { cacheImages } from '../../../utils/cacheImages'



function BoothsList({ showInfo, SID }) {
  const history = useHistory()

  const addDefaultSrc = (e) => {
    e.target.src = "https://boothit-hosting.s3.amazonaws.com/shows/DEFAULT/logo.png"
  }

  return (
    <HexGridLayout style={{ width: "90vw" }}>
      {showInfo.booths.map(booth => {
        let childProps = {
          cardColor: booth.secondaryColor,
          buttonColor: booth.primaryColor,
          title: booth.company,
          onClick: () => history.push(`/shows/${SID}/booths/${booth.BID}`)
        }

        return (
          <div key={booth.BID}  {...childProps} >
            <img
              onDragStart={(e) => e.preventDefault()}
              style={{ width: "100%" }}
              src={booth.boothLogoURL}
              alt={booth.title}
              onError={addDefaultSrc}
            />
          </div>
        )
      })}
    </HexGridLayout>
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
    console.log('effect called');
    (async () => {
      console.log('async called');
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
      {!isLoaded && (
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
      )}
      {isLoaded && (
        <>
          <BoothsList showInfo={showInfo} SID={SID} />
        </>
      )
      }
    </div >
  )
}
