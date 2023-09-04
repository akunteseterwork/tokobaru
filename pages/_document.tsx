import { Html, Head, Main, NextScript } from 'next/document'
import { useTheme } from "next-themes";
import React, { useEffect } from 'react';

export default function Document() {

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
        <Html>
            <Head />
            <body className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100'}`}>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}