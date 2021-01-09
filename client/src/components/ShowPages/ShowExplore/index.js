import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import HexGridLayout from "../../HexGridLayout"
import Loader from '../../Loader'

export default function ShowExplore() {
  const [shows, setShows] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const history = useHistory()

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/shows')
      const resJSON = await res.json()
      setShows(resJSON)
      setIsLoaded(true)
    })()
  }, [])

  let loaderHeight = 200

  return (
    <>
      {!isLoaded && (
        <div style={{ width: "100%", height: "100%" }}>
          <Loader duration={2500} style={{ width: `${loaderHeight * 0.86602543}px`, height: `${loaderHeight}px`, margin: "200px auto" }} />
        </div>
      )}
      {isLoaded && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <HexGridLayout style={{ width: "90vw" }}>
            {shows.map(show => {
              let childProps = {
                hexColor: show.secondaryColor,
                title: show.title,
                onClick: () => history.push(`/shows/${show.SID}`)
              }

              return (
                <div key={show.SID}  {...childProps} >
                  <img onDragStart={(e) => e.preventDefault()} style={{ width: "100%" }} src={show.showLogoURL} alt={show.title} />
                </div>
              )
            })}
          </HexGridLayout>
        </div>
      )
      }
    </>
  )
}
