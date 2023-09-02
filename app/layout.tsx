import "./globals.css";
import React from 'react';
import { ThemeProvider } from "@/app/themeProvider";
import { ThemeSwitcher } from "@/app/themeSwitcher";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className="bg-gray-100 dark:bg-zinc-800 font-inter">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
