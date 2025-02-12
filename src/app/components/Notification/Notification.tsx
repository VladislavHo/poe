import React from 'react'
import { Close_SVG } from '../SVG/SVG'
import "./notification.scss"

interface NotificationProps {
  open: boolean;
  message: string;
  error: boolean;
}
const Notification = ({ open, message, error }: NotificationProps) => {

  return (
    <div className='notification'>
      <div className={`notification--container ${error ? "error" : ""}`}>
        <button className='close' onClick={() => open = !open}>
          <Close_SVG />
        </button>
        <div className="notification--text">
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}
export default Notification