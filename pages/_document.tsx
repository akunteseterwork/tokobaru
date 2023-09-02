import { Html, Head, Main, NextScript } from 'next/document';
import { useTheme } from 'next-themes';

export default function Document() {
    const { theme } = useTheme();
    return (
        <Html>
            <Head />
            <body className={`font-inter ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}