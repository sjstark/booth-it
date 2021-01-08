import React, { useState, useEffect } from 'react'

import HexGridLayout from "../../HexGridLayout"

export default function ShowExplore() {
  const [shows, setShows] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [width, setWidth] = useState(300)
  const [timeoutid, setTimeoutid] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/shows')
      const resJSON = await res.json()
      setShows(resJSON)
      setIsLoaded(true)
    })()
    let direction = 10
    let getWidth = (prevWidth) => prevWidth + direction

    let timer = setInterval(() => {
      setWidth(prevWidth => {

        let newWidth = getWidth(prevWidth)
        if (newWidth <= 300) {
          getWidth = (prevWidth) => prevWidth + direction
          newWidth = 300
        } else if (newWidth >= 2000) {
          getWidth = (prevWidth) => prevWidth - direction
          newWidth = 2000
        }
        return newWidth
      })
    }, 125)
    setTimeoutid(timer)
    return () => {
      clearInterval(timeoutid)
      setTimeoutid(null)
    }
  }, [])

  return (
    <>
      {width}
      {isLoaded && (
        <div>
          <HexGridLayout width="75vw">
            {shows.map(show => (
              <div key={show.SID} hexColor={show.secondaryColor}>
                <img onDragStart={(e) => e.preventDefault()} style={{ width: "100%" }} src={show.showLogoURL} alt={show.title} />
              </div>
            ))}
          </HexGridLayout>
        </div>
      )}
    </>
  )
}
