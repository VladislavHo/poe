"use client";

import { SessionProvider } from "next-auth/react";

import Background from "../Background/Background";


export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Background />

      <main>

        {children}
      </main>
    </SessionProvider>
  )
}