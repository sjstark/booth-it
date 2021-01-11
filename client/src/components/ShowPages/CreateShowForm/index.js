import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import ImageInput from '../../FormFields/ImageCropper/ImageInput'
import ColorPickerBox from "../../Color/ColorPicker";

import { alphaToHex } from '../../../utils/color'

export default function CreateShowForm() {
  const [primaryColor, setPrimaryColor] = useState({ hex: "#d5d5d5", rgb: { r: 213, g: 213, b: 213, a: 1 } })
  const [primaryAlphaHex, setPrimaryAlphaHex] = useState("#d5d5d5ff")
  const [secondaryColor, setSecondaryColor] = useState({ hex: "#000000", rgb: { r: 0, g: 0, b: 0, a: 1 } })
  const [secondaryAlphaHex, setSecondaryAlphaHex] = useState("#000000ff")

  useEffect(() => {
    setPrimaryAlphaHex(`${primaryColor.hex}${alphaToHex(primaryColor.rgb.a)}`)
  }, [primaryColor])

  useEffect(() => {
    setSecondaryAlphaHex(`${secondaryColor.hex}${alphaToHex(primaryColor.rgb.a)}`)
  }, [secondaryColor])

  return (
    <div>
      <ColorPickerBox color={primaryColor} onChangeComplete={(color) => { setPrimaryColor(color) }} />
      <ColorPickerBox color={secondaryColor} onChangeComplete={(color) => { setSecondaryColor(color) }} />
    </div>
  )
}
