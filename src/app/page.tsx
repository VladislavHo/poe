import React from 'react'
import Items from './components/Items/Items'
import Intro from './components/Intro/Intro'
import Header from './components/Header/Header'



export default function Main() {
  return (
    <>
      <Header />
      <Intro />

      <Items />

      {/* <Cells/> */}
    </>
  )
}
