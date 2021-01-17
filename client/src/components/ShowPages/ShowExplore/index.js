import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import HexGridLayout from "../../HexGridLayout"
import HolderSVG from '../../HolderSVG'
import Loader from '../../Loader'

import { cacheImages } from '../../../utils/cacheImages'


export function ShowImage({ show }) {
  console.log(show)
  return (
    <>
      {
        show.showLogoURL
          ?
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            src={show.showLogoURL}
            alt={show.title}
          />
          :
          <HolderSVG
            style={{ width: "100%" }}
            color={show.primaryColor}
          />
      }
    </>
  )
}


export default function ShowExplore() {
  const [shows, setShows] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [jsonLoaded, setJsonLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const history = useHistory()

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/shows/')
      const resJSON = await res.json()
      setShows(resJSON)
      cacheImages(resJSON.map(show => show.showLogoURL), setImagesLoaded)
      setJsonLoaded(true)
    })()
  }, [])

  useEffect(() => {
    setIsLoaded(jsonLoaded && imagesLoaded)
  }, [jsonLoaded, imagesLoaded])


  let loaderHeight = 200

  return (
    <>
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
      <h1 style={{ fontSize: "30px", fontFamily: "'Bungee', sans-seriff", margin: "30px", marginBottom: "0" }}>
        Public Shows
      </h1>
      {isLoaded && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <HexGridLayout style={{ width: "90vw" }}>
            {shows.map(show => {
              let childProps = {
                cardcolor: show.secondaryColor,
                buttoncolor: show.primaryColor,
                title: show.title,
                onClick: () => history.push(`/shows/${show.SID}`)
              }

              return (
                <div key={show.SID}  {...childProps} >
                  <ShowImage show={show} />
                </div>
              )
            })}
          </HexGridLayout>
        </div>
      )}
    </>
  )
}
