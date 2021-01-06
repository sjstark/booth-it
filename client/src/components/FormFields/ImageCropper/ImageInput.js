import React, { useState, useEffect } from 'react';
import ImageCropper from './ImageCropper'

import Button from '../../Button'

import './cropper.css'

const ImageInput = ({ aspect, value, onChange, width, height }) => {
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')
  const [blobURL, setBlobURL] = useState(null)
  const [fileName, setFileName] = useState('No File Selected')

  const getBlob = (blob) => {
    //function to pass the blob from inner components up to this component
    setBlob(blob)
    onChange(blob)
  }

  useEffect(() => {
    if (value) {
      if (value.startsWith('http')) {
        setBlobURL(value)
        setFileName('Previous Upload')

        return
      }
      let urlCreator = window.URL || window.webkitURL;
      setBlobURL(urlCreator.createObjectURL(value))
      setFileName('Previous Upload')
    }
  }, [])

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0]
    setFileName(file.name)
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setInputImg(reader.result)
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-input__container">
      <label className="image-input__selector-container">
        <Button color="primary">Select File</Button>
        <div className="image-input__filename">{fileName}</div>
        <input
          type="file"
          accept='image/*'
          onChange={onInputChange}
          style={{ display: 'none' }}
        />
      </label>
      <div className="image-cropper__container">
        {(!blobURL || inputImg) &&
          (
            <ImageCropper
              getBlob={getBlob}
              inputImg={inputImg}
              aspect={aspect}
              width={width}
              height={height}
            />
          )
        }
        {!inputImg && blobURL && (
          <img className="image-cropper__previous-upload" alt="Preview Unavailable" src={blobURL} />
        )}
      </div>
    </div>
  )
}

export default ImageInput
