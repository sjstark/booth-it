import React, { useState, useEffect } from "react";
import axios from 'axios'

import { useHistory, useParams } from 'react-router-dom'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import FormInputField from '../../FormFields/FormInputField'
import FormFile from '../../FormFields/FormFile'

import ColorPickerBox from "../../Color/ColorPicker";

import HexGridLayout from "../../HexGridLayout"
import HolderSVG from '../../HolderSVG'

import './CreateBoothForm.scss'

export function BoothImagePreview({ booth }) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {
        !imageError || !booth.boothLogoURL
          ?
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            file={booth.boothLogoURL}
            alt={booth.company}
            onError={() => setImageError(true)}
          />
          :
          <HolderSVG
            style={{ width: "100%" }}
            color={booth.primaryColor}
          />
      }
    </>
  )
}


export default function CreateBoothForm() {
  const history = useHistory()
  const { SID } = useParams()

  const [booths, setBooths] = useState([{}])

  const [primaryColor, setPrimaryColor] = useState({ hex: "#31C6E8" })
  const [primaryAlphaHex, setPrimaryAlphaHex] = useState("#31C6E8")
  const [secondaryColor, setSecondaryColor] = useState({ hex: "#31E89F" })
  const [secondaryAlphaHex, setSecondaryAlphaHex] = useState("#31E89F")

  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")

  const [boothLogo, setBoothLogo] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setBooths([{
      company,
      primaryColor: primaryAlphaHex,
      secondaryColor: secondaryAlphaHex,
      boothLogoURL: boothLogo ? URL.createObjectURL(boothLogo) : null
    }])
  }, [company, primaryAlphaHex, secondaryAlphaHex, boothLogo])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors([])

    const formData = new FormData()

    formData.append('company', company)
    formData.append('description', description)
    formData.append('primaryColor', primaryAlphaHex)
    formData.append('secondaryColor', secondaryAlphaHex)
    if (boothLogo) {
      formData.append('boothLogo', boothLogo)
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    axios.post(`/api/shows/${SID}/booths/`, formData, config)
      .then(({ data }) => {
        history.push(`/shows/${data.SID}/booths/${data.BID}`)
      })
      .catch(err => {
        if (err.response) {
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
      setBoothLogo(target.files[0])
    }
  }

  return (
    <form className="create-booth-form">
      <section className="create-booth-form__details">
        <h2 className="create-booth-form__titles">Booth Details</h2>
        <div className="create-booth-form__details-title-container">
          <FormInput
            name="Booth Title/Company"
            required={true}
            type="text"
            value={company}
            error={
              errors.includes("company : This field is required.") && { msg: "This field is required." } ||
              errors.includes("company : Title must be between 4 and 150 characters in length") && { msg: "This field must be between 4 and 150 characters" }
            }
            onChange={({ target }) => setCompany(target.value)}
          />
        </div>
        <div className="create-booth-form__details-field-container">
          <FormInputField
            name="Booth Description"
            required={true}
            type="text"
            value={description}
            error={
              errors.includes("description : This field is required.") && { msg: "This field is required." } ||
              errors.includes("description : Description must be between 10 and 500 characters in length") && { msg: "This field must be between 10 and 500 characters" }
            }
            onChange={({ target }) => setDescription(target.value)}
            rows={4}
          />
        </div>
        <div className="create-booth-form__details-style">
          <div className="create-booth-form__details-style-colors">
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
            name="Booth Logo PNG"
            onChange={fileChange}
          />
        </div>
      </section>
      <section className="create-booth-form__preview">
        <h2 className="create-booth-form__titles">Booth Card Preview:</h2>
        <HexGridLayout style={{ width: "10%" }}>

          {booths.map(booth => {
            let childProps = {
              cardcolor: booth.secondaryColor,
              buttoncolor: booth.primaryColor,
              title: booth.company,
              onClick: () => null
            }
            return (
              <div key={"boothpreview" + booth.SID}  {...childProps} >
                {
                  booth.boothLogoURL
                    ?
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      style={{ width: "100%" }}
                      src={booth.boothLogoURL}
                      alt={booth.company}
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
      <section className="create-booth-form__buttons">
        <Button
          color="caution"
          onClick={goBack}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Create Booth
        </Button>
      </section>

    </form >
  )
}
