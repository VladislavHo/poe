// "use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import "./header.scss"
import Link from 'next/link'
export default function Header() {
  const session = useSession()




  return (
    <header>
      <div className="logo">
        <Link href="/">

          <Image src="/img/logo.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      {session.status === "authenticated" && <>
        <div>

          <a href='/dashboard'>Dashboard</a>
        </div>
      </>}
    </header>
  )
}
