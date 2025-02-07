
import React from 'react'
import DashboardCoponents from '../components/Dashboard/Dashboard'
import { getSession, useSession } from 'next-auth/react'
import ModalCreateItem from '../components/Dashboard/CreateItem/CreateItem'
import Items from '../components/Dashboard/Items/Items'




export default async function Dashboard() {

  return (
    <>
      <DashboardCoponents />


    </>
  )
}
