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

import { useHistory } from "react-router-dom";

import './CreateShowForm.scss'


function FormDates({ value, setValue, error }) {
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date().setHours(9, 0))
  const [endTime, setEndTime] = useState(new Date().setHours(18, 0))

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

  let errorStyle = Boolean(error) ? { color: "var(--red)" } : {}

  return (
    <div className="create-show-form__dates-widget">
      <div className="create-show-form__dates-form">

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
      </div>
      <table className={`create-show-form__dates-list ${error && "create-show-form__dates-list--error"}`}>
        <thead className="create-show-form__dates-list-item-head">
          <tr>
            <th>Show Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="create-show-form__dates-list-body">
          {
            value.length == 0
              ?
              (<tr style={errorStyle}>
                <td>No Dates Entered</td>
                <td aria-hidden style={{ visibility: "hidden" }}>No Dates Entered</td>
                <td aria-hidden style={{ visibility: "hidden" }}>No Dates Entered</td>
                <td aria-hidden style={{ visibility: "hidden" }}>No Dates Entered</td>
              </tr>)
              :
              value.map((date, idx) => (
                <tr key={`dates-list-${idx}`} className="create-show-form__dates-list-item">
                  <td>{format(date.date, "PPPP")}</td>
                  <td>{format(date.startTime, 'K:mm aa O')}</td>
                  <td>{format(date.endTime, 'K:mm aa O')}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => removeDate(idx)}
                    >
                      Delete
                  </Button>
                  </td>
                </tr>
              ))

          }
        </tbody>
      </table>
    </div>
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

  const [primaryColor, setPrimaryColor] = useState({ hex: "#31C6E8" })
  const [primaryAlphaHex, setPrimaryAlphaHex] = useState("#31C6E8")
  const [secondaryColor, setSecondaryColor] = useState({ hex: "#31E89F" })
  const [secondaryAlphaHex, setSecondaryAlphaHex] = useState("#31E89F")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [showDates, setShowDates] = useState([])
  const [showLogo, setShowLogo] = useState(null)

  const [imageError, setImageError] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
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
      formattedDate["endTime"] = showDate["endTime"].toUTCString()
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

    axios.post('/api/shows/', formData, config)
      .then(({ data }) => {
        console.log(data)
        history.push(`/shows/${data.SID}`)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data)
          setErrors(err.response.data.errors)
        }
      })


  }

  useEffect(() => {
    setPrimaryAlphaHex(`${primaryColor.hex}`)
  }, [primaryColor])

  useEffect(() => {
    setSecondaryAlphaHex(`${secondaryColor.hex}`)
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
            error={errors.includes("title : This field is required.") && { msg: "This field is required." }}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="create-show-form__details-field-container">
          <FormInputField
            name="Show Description"
            required={true}
            type="text"
            value={description}
            error={errors.includes("description : This field is required.") && { msg: "This field is required." }}
            onChange={({ target }) => setDescription(target.value)}
            rows={4}
          />
        </div>
        <div className="create-show-form__details-style">
          <div className="create-show-form__details-style-colors">
            <section>
              <label>Logo Color:</label>
              <ColorPickerBox color={primaryColor} onChangeComplete={(color) => { setPrimaryColor(color) }} />
            </section>
            <section>
              <label>Background Color:</label>
              <ColorPickerBox color={secondaryColor} onChangeComplete={(color) => { setSecondaryColor(color) }} />
            </section>
          </div>
          <FormFile
            name="Show Logo PNG"
            onChange={fileChange}
          />
          <FormBoolean
            name="Private Show?"
            value={isPrivate}
            onChange={setIsPrivate}
          />
        </div>
      </section>
      <section className="create-show-form__preview">
        <h2 className="create-show-form__titles">Show Card Preview:</h2>
        <HexGridLayout style={{ width: "10%" }}>
          {shows.map(show => {
            let childProps = {
              cardcolor: show.secondaryColor,
              buttoncolor: show.primaryColor,
              title: show.title,
              onClick: () => null
            }

            return (
              <div key={"showpreview" + show.SID}  {...childProps} >
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
                    <HolderSVG color={childProps.buttoncolor} />
                }
              </div>
            )
          })}
        </HexGridLayout>
      </section>

      <section className="create-show-form__dates">
        <h2 className="create-show-form__titles">Show Dates:</h2>
        <FormDates
          value={showDates}
          setValue={setShowDates}
          error={errors.includes("dates: No dates provided for show") && { msg: "Show must have at least one date" }}
        />
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
      </section>

    </form >
  )
}
