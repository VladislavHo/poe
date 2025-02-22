"use client";
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import "./header.scss"
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Image from 'next/image';
export default function Header() {
  const session = useSession();

  const ref = useRef<HTMLElement>(null);


  return (
    <header
      ref={ref}
      className={`header`}
    >
      <div className="l-header">
        <div className="logo">
          <Link href="/">

            <Image src={`/img/logo.png`} width={50} height={50} alt="logo" />
          </Link>
        </div>
        <nav>
          <Link href="/"><span>League</span></Link>
          <Link href="/standart"><span>Standart</span></Link>
          <Link href="/#"><span>Discord</span></Link>
          <LanguageSelector />
          {session.status === "authenticated" && (
            <Link href='/dashboard' style={{ position: "fixed", right: "0", bottom: "60px" }}><span>Dashboard</span></Link>
          )}
        </nav>
      </div>

    </header>
  );
}