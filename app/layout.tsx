import "./globals.css";
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tokobaru - Simple Ecommerce Web</title>
        <meta
          name="description"
          content="Ecommerce website built with NextJS 13 for testing purpose."
        />
      </head>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
