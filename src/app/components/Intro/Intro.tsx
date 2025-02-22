import React from 'react'
import "./intro.scss"
import Arrow from '../Arrow/Arrow'
export default function Intro({ title, section }: { title: string, section: string }) {
  return (
    <>
      <div className="title--intro--container">
        <h2 className='title--intro'>{title} items</h2>

      </div>
      <section className='intro'>

        <h3>Welcome to the Settlers Shop
          Free/Low-Fee Mirror Service Items By Spicysushi and Friends</h3>
        <Arrow section={section} />
      </section>
    </>

  )
}
