"use client";

import { SessionProvider } from "next-auth/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Background from "../Background/Background";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Background />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </SessionProvider>
  )
}