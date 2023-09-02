"use client"
import "./globals.css";
import React , { useEffect } from 'react';
import { ThemeProvider } from "@/app/themeProvider";
import { ThemeSwitcher } from "@/app/themeSwitcher";
import { useTheme } from "next-themes";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('dark', 'bg-zinc-800', 'font-inter');
    } else {
      document.body.classList.remove('dark', 'bg-zinc-800', 'font-inter');
      document.body.classList.add('bg-gray-100');
    }
  }, [theme]);
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
      <body className="font-inter">
        <ThemeProvider attribute="class" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}