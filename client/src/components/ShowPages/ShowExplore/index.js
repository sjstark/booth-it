import React, { useState, useEffect } from 'react'

import HexGridLayout from "../../HexGridLayout"

export default function ShowExplore() {
  const [shows, setShows] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/shows')
      const resJSON = await res.json()
      setShows(resJSON)
      setIsLoaded(true)
    })()
  }, [])

  return (
    <>
      {isLoaded && (
        <div>
          <HexGridLayout style={{ width: "50%" }}>
            {shows.map(show => {
              let childProps = {
                hexColor: show.secondaryColor,
                title: show.title,
                description: show.description
              }

              return (
                <div key={show.SID} {...childProps}>
                  <img onDragStart={(e) => e.preventDefault()} style={{ width: "100%" }} src={show.showLogoURL} alt={show.title} />
                </div>
              )
            })}
          </HexGridLayout>
        </div>
      )}
    </>
  )
}
