import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import axios from 'axios'

import { DatePicker, TimePicker } from '@material-ui/pickers'
import { format } from 'date-fns'


import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import FormInputField from '../../FormFields/FormInputField'
import FormBoolean from '../../FormFields/FormBoolean'
import FormFile from '../../FormFields/FormFile'
import ColorPickerBox from "../../Color/ColorPicker";

import HexGridLayout from "../../HexGridLayout"
import HolderSVG from '../../HolderSVG'


import { alphaToHex } from '../../../utils/color'
import { useHistory } from "react-router-dom";

import './CreateShowForm.scss'


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
            <span>{format(date.date, "PPPP")}</span>
            <span>{format(date.startTime, 'K:mm aa')}</span>
            <span>{format(date.endTime, 'K:mm aa')}</span>
            <span>Times are shown in local time</span>
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

export function ShowImagePreview({ show }) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {
        !imageError || !show.showLogoURL
          ?
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            file={show.showLogoURL}
            alt={show.title}
            onError={() => setImageError(true)}
          />
          :
          <HolderSVG
            style={{ width: "100%" }}
            color={show.primaryColor}
          />
      }
    </>
  )
}


export default function CreateShowForm() {
  const history = useHistory()

  const [shows, setShows] = useState([])

  const [primaryColor, setPrimaryColor] = useState({ hex: "#d5d5d5", rgb: { r: 213, g: 213, b: 213, a: 1 } })
  const [primaryAlphaHex, setPrimaryAlphaHex] = useState("#d5d5d5ff")
  const [secondaryColor, setSecondaryColor] = useState({ hex: "#000000", rgb: { r: 0, g: 0, b: 0, a: 1 } })
  const [secondaryAlphaHex, setSecondaryAlphaHex] = useState("#000000ff")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [showDates, setShowDates] = useState([])
  const [showLogo, setShowLogo] = useState(null)

  const [imageError, setImageError] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    console.log(showLogo)
    setShows([{
      title,
      primaryColor: primaryAlphaHex,
      secondaryColor: secondaryAlphaHex,
      showLogoURL: showLogo ? URL.createObjectURL(showLogo) : null
    }])
  }, [title, primaryAlphaHex, secondaryAlphaHex, showLogo])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors([])

    let formattedDates = []
    for (let i = 0; i < showDates.length; i++) {
      let showDate = showDates[i]
      let formattedDate = {}
      formattedDate["date"] = showDate["date"].toUTCString()
      formattedDate["startTime"] = showDate["startTime"].toUTCString()
      formattedDate["endTime"] = showDate["date"].toUTCString()
      formattedDates.push(formattedDate)
    }

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('isPrivate', isPrivate)
    formData.append('primaryColor', primaryAlphaHex)
    formData.append('secondaryColor', secondaryAlphaHex)
    formData.append('showDates', JSON.stringify(formattedDates))
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

  const fileChange = ({ target }) => {
    if (target.files && target.files.length > 0) {
      setShowLogo(target.files[0])
    }
  }

  return (
    <form className="create-show-form">
      <section className="create-show-form__details">
        <h2 className="create-show-form__titles">Show Details</h2>
        <div className="create-show-form__details-title-container">
          <FormInput
            name="Show Title"
            required={true}
            type="text"
            value={title}
            error={false}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="create-show-form__details-field-container">
          <FormInputField
            name="Show Description"
            required={true}
            type="text"
            value={description}
            error={false}
            onChange={({ target }) => setDescription(target.value)}
            rows={4}
          />
        </div>
        <div className="create-show-form__details-style">
          <div className="create-show-form__details-style-colors">
            <label>Primary Color:</label>
            <ColorPickerBox color={primaryColor} onChangeComplete={(color) => { setPrimaryColor(color) }} />
            <label>Secondary Color:</label>
            <ColorPickerBox color={secondaryColor} onChangeComplete={(color) => { setSecondaryColor(color) }} />
          </div>
          <FormFile
            name="Show Logo PNG"
            onChange={fileChange}
          />
        </div>
        <FormBoolean
          name="Private Show?"
          value={isPrivate}
          onChange={({ target }) => setIsPrivate(target.checked)}
        />
      </section>
      <section className="create-show-form__preview">
        <h2 className="create-show-form__titles">Show Card Preview:</h2>
        <HexGridLayout style={{ width: "10%" }}>
          {shows.map(show => {
            let childProps = {
              cardColor: show.secondaryColor,
              buttonColor: show.primaryColor,
              title: show.title,
              onClick: () => null
            }

            return (
              <div key={show.SID}  {...childProps} >
                {
                  show.showLogoURL
                    ?
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      style={{ width: "100%" }}
                      src={show.showLogoURL}
                      alt={show.title}
                      onError={() => setImageError(true)}
                    />
                    :
                    <HolderSVG color={childProps.buttonColor} />
                }
              </div>
            )
          })}
        </HexGridLayout>
      </section>

      <section className="create-show-form__dates">
        <FormDates
          value={showDates}
          setValue={setShowDates}
        />
      </section>

      <section className="create-show-form__buttons">
        <Button
          color="warning"
          onClick={goBack}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Create Show
        </Button>
      </section>
    </form >
  )
}
