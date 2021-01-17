import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import FormFile from '../../../../FormFields/FormFile'
import Loader from '../../../../Loader'

export default function ImageSection({ content, setContent, editting }) {
  const { SID, BID } = useParams()
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(content.imageURL || "")

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setContent(prev => ({ ...prev, imageURL }))
  }, [imageURL])

  const postImageToBooth = async (image) => {
    let body = new FormData()

    body.append('content', image)

    const config = {
      'Content-Type': 'multipart/form-data'
    }

    const res = await axios.post(`/api/shows/${SID}/booths/${BID}/content/`, body, config)

    const result = res.data

    if (res.statusText == "OK") {
      return result
    }

    console.log(res)

  }

  const fileChange = async ({ target }) => {
    if (target.files && target.files.length > 0) {
      setImage(target.files[0])
      // setImageURL(URL.createObjectURL(target.files[0]))
      setUploading(true)
      let uploadedURL = await postImageToBooth(target.files[0])
      if (uploadedURL) {
        setImageURL(uploadedURL)
      }
      setUploading(false)
    }
  }

  return (
    <>
      { editting && (
        <div className="section-video__input">
          <div className="section-video__instructions">
            <p>
              {"Please select a file to upload."}
            </p>
          </div>
          <FormFile
            name="Image to Upload"
            onChange={fileChange}
          />
          {uploading && (
            <div style={{ width: "100px", height: "100px" }}>
              <Loader
                duration={2500}
                style={{
                  width: `${50 * 0.86602543}px`,
                  height: `${50}px`,
                  margin: "50px auto"
                }}
              />
            </div>
          )}
        </div>
      )}
      { imageURL && (
        <img
          onDragStart={(e) => e.preventDefault()}
          style={{ width: "100%" }}
          src={imageURL}
        />
      )}
    </>
  )
}
