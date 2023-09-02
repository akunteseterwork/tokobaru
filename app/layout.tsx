import "./globals.css";
import React from 'react';
import { ThemeProvider } from "@/app/themeProvider";
import { ThemeSwitcher } from "@/app/themeSwitcher";
import { useTheme } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <title>Tokobaru - Simple Ecommerce Web</title>
        <meta
          name="description"
          content="Ecommerce website built with NextJS 13 for testing purpose."
        />
      </head>
      <body className={`font-inter ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
