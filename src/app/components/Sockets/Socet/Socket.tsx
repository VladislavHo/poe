import React from 'react'


import "./socket.scss"


export default function Socket({ sockets }: { sockets: string }) {

  const socketArray = sockets && sockets.split('-');

  return (
    <div className="sockets--container">
      <div className="sockets--wrapper" style={socketArray && socketArray.length === 3 ? { display: "flex", flexDirection: "column", alignItems: "center" } : {}}>
        {
          socketArray && socketArray.map((item: string, index: number) => {
            if (item === "W") {
              return <div key={index} className="white"></div>
            }
            if (item === "A") {
              return <div key={index} className="black"></div>
            }
          })
        }
      </div>

    </div>
  )

}