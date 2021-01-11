import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import axios from 'axios'

import { DatePicker, TimePicker } from '@material-ui/pickers'
import { compareAsc, format } from 'date-fns'


import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import FormInputField from '../../FormFields/FormInputField'
import FormBoolean from '../../FormFields/FormBoolean'
import FormFile from '../../FormFields/FormFile'
import ColorPickerBox from "../../Color/ColorPicker";

import { alphaToHex } from '../../../utils/color'
import { useHistory } from "react-router-dom";


function FormDates({ value, setValue }) {
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  const addDateToList = () => {
    const showDate = { date, startTime, endTime }
    setValue(prevList => {
      if (prevList.find(listDate => {
        return listDate.date == date
      })) {
        return prevList
      }
      let newList = [...prevList, showDate]
      newList.sort((a, b) => (a.date > b.date) ? 1 : -1)
      return newList
    })
  }

  const removeDate = idx => {
    setValue(prevList => {
      if (idx < 0 || idx >= prevList.length) {
        return prevList
      }
      return [...prevList.slice(0, idx), ...prevList.slice(idx + 1)]
    })
  }

  return (
    <>
      <div style={{ height: '200px', width: '400px' }}>
        {value.map((date, idx) => (
          <div key={`dates-list-${idx}`}>
            <span>{format(date.date, "LLL do yyyy")}</span>
            <span>{format(date.startTime, 'K:mm aa')}</span>
            <span>{format(date.endTime, 'K:mm aa')}</span>
            <Button
              onClick={() => removeDate(idx)}
            >
              Delete Date
            </Button>
          </div>
        ))}
      </div>
      <DatePicker
        label="Event Date"
        value={date}
        onChange={setDate}
      />
      <TimePicker
        label="Start Time"
        value={startTime}
        minutesStep={5}
        onChange={setStartTime}
      />
      <TimePicker
        label="End Time"
        value={endTime}
        minutesStep={5}
        onChange={setEndTime}
      />
      <Button
        onClick={addDateToList}
      >
        Add Date
      </Button>
    </>
  )
}


export default function CreateShowForm() {
  const history = useHistory()

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
    formData.append('primaryColor', primaryAlphaHex)
    formData.append('secondaryColor', secondaryAlphaHex)
    formData.append('showDates', showDates)
    if (showLogo) {
      formData.append('showLogo', showLogo)
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    const res = await axios.post('/api/shows/', formData, config)
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


  const goBack = () => {
    history.goBack()
  }

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
      <div style={{ margin: "50px" }}>
        <FormDates
          value={showDates}
          setValue={setShowDates}
        />
      </div>

      <div>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Create Show
        </Button>
        <Button
          color="warning"
          onClick={goBack}
        >
          Cancel
        </Button>
      </div>
    </div >
  )
}
