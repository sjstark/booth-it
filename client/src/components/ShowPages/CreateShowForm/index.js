import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import axios from 'axios'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import FormInputField from '../../FormFields/FormInputField'
import FormBoolean from '../../FormFields/FormBoolean'
import FormFile from '../../FormFields/FormFile'
import ColorPickerBox from "../../Color/ColorPicker";

import { alphaToHex } from '../../../utils/color'

export default function CreateShowForm() {
  const [primaryColor, setPrimaryColor] = useState({ hex: "#d5d5d5", rgb: { r: 213, g: 213, b: 213, a: 1 } })
  const [primaryAlphaHex, setPrimaryAlphaHex] = useState("#d5d5d5ff")
  const [secondaryColor, setSecondaryColor] = useState({ hex: "#000000", rgb: { r: 0, g: 0, b: 0, a: 1 } })
  const [secondaryAlphaHex, setSecondaryAlphaHex] = useState("#000000ff")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [showDates, setShowDates] = useState([])
  const [showLogo, setShowLogo] = useState(null)

  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors([])

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('isPrivate', isPrivate)
    formData.append('primaryColor', primaryColor)
    formData.append('secondaryColor', secondaryColor)
    formData.append('showDates', showDates)
    if (showLogo) {
      formData.append('showLogo', showLogo)
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    const res = await axios.post('/shows/', formData, config)
    const resJSON = res.data

    if (resJSON.errors) {
      setErrors(resJSON.errors)
    }

    console.log(resJSON)

  }

  useEffect(() => {
    setPrimaryAlphaHex(`${primaryColor.hex}${alphaToHex(primaryColor.rgb.a)}`)
  }, [primaryColor])

  useEffect(() => {
    setSecondaryAlphaHex(`${secondaryColor.hex}${alphaToHex(primaryColor.rgb.a)}`)
  }, [secondaryColor])

  return (
    <div>
      <FormInput
        name="Show Title"
        required={true}
        type="text"
        value={title}
        error={false}
        onChange={({ target }) => setTitle(target.value)}
      />
      <FormInputField
        name="Show Description"
        required={true}
        type="text"
        value={description}
        error={false}
        onChange={({ target }) => setDescription(target.value)}
      />
      <ColorPickerBox color={primaryColor} onChangeComplete={(color) => { setPrimaryColor(color) }} />
      <ColorPickerBox color={secondaryColor} onChangeComplete={(color) => { setSecondaryColor(color) }} />
      <FormBoolean
        name="Private Show?"
        value={isPrivate}
        onChange={({ target }) => setIsPrivate(target.checked)}
      />
      <FormFile
        name="Show Logo PNG"
        value={showLogo}
        onChange={({ target }) => setShowLogo(target.value)}
      />
      <Button
        color="primary"
      >
        Create Show
      </Button>
      <div>
        <Button
          color="warning"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
