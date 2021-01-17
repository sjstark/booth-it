import React from 'react'

import './ProfileHeader.scss'

export default function ProfileHeader({ booth, editable }) {
  console.log(booth)
  return (
    <div className="booth-section__header">
      { booth.boothLogoURL &&
        <section className="booth-section__header-left">
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            src={booth.boothLogoURL}
            alt={booth.company}
          />
        </section>
      }
      <section className="booth-section__header-right">
        <h1 className="booth-section__header-title">
          {booth.company}
        </h1>
        <p className="booth-section__header-body">
          {booth.description}
        </p>
      </section>
    </div>
  )
}
