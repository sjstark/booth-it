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
        <div style={{ padding: "100px" }}>
          <HexGridLayout >
            {shows.map(show => (
              <div key={show.SID} hexColor={show.secondaryColor}>
                <img style={{ width: "100%" }} src={show.showLogoURL} alt={show.title} />
              </div>
            ))}
          </HexGridLayout>
        </div>
      )}
    </>
  )
}
