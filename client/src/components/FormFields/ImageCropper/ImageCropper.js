import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './cropImage'

const ImageCropper = ({ getBlob, inputImg, aspect = 1, width = 250, height = 250 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(
      inputImg,
      croppedAreaPixels,
      width,
      height
    )
    getBlob(croppedImage)
  }

  return (
    <div className='cropper'>
      <Cropper
        image={inputImg}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  )
}

export default ImageCropper
