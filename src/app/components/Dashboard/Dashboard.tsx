
import Items from '@/app/components/Items/Items'
import React from 'react'

import DashboardHeader from './DashboardHeader/DashboardHeader';

export default function DashboardCoponents() {

  return (
    <>
      <DashboardHeader />


      <div className="cards--list">
        <Items />
      </div>
    </>




  )
}
