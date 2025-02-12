"use client";
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import "./header.scss"
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export default function Header() {
  const session = useSession();
  const [isScroll, setIsScroll] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const initialTop = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        // Сохраняем начальное положение заголовка при первой загрузке
        if (initialTop.current === null) {
          initialTop.current = ref.current.offsetTop; // offsetTop — расстояние от верха страницы до заголовка
        }

        // Применяем fixed, когда прокрутка страницы превышает начальное положение заголовка
        if (window.scrollY > initialTop.current) {
          setIsScroll(true);
        }
        // Убираем fixed, когда страница возвращается в начальное положение
        else {
          setIsScroll(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`header ${isScroll ? 'fixed' : ''}`}
    >
      <nav>
        <Link href="/"><span>League</span></Link>
        <Link href="/standart"><span>Standart</span></Link>
        <Link href="/#"><span>Discord</span></Link>
        <LanguageSelector />
        {session.status === "authenticated" && (
          <Link href='/dashboard' style={{ position: "fixed", right: "20px", top: "5px" }}><span>Dashboard</span></Link>
        )}
      </nav>
    </header>
  );
}