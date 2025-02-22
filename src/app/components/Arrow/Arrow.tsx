import React from 'react'
import './arrow.scss'
export default function Arrow({ section }: { section: string }) {
  return (
    <a href={`#${section}`} className="arrow--nav bounce">

    </a>
  )
}
