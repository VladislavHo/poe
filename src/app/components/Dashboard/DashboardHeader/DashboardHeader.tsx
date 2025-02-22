"use client";
import React, { useState } from 'react'
import ModalSetting from '../ModalSetting/ModalSetting'
import { signOut } from 'next-auth/react';
import "./header.scss"
import Link from 'next/link';
export default function DashboardHeader() {
  const [stateModalChangePassword, setStateModalChangePassword] = useState(false);



  return (
    <div className="dashboard--header">
      <div className="l-dashboard--header">
        <Link href="/"><span>Home page</span></Link>
        <div className="btn--container">
          {/* <button className='added--card--btn' onClick={() => redirect("dashboard/create-item")}><span>added new Card</span></button> */}
          <Link href="/dashboard/create-item"><button className='added--card--btn'><span>added new Card</span></button></Link>
          <button className='change-password--btn' onClick={() => setStateModalChangePassword(true)}><span>Change password</span></button>
          <button className='logout--btn' onClick={() => {
            signOut()
          }}><span>Logout</span></button>

        </div>

        {
          stateModalChangePassword && <ModalSetting stateModalChangePassword={stateModalChangePassword} setStateModalChangePassword={setStateModalChangePassword} />
        }
      </div>

    </div>
  )
}
