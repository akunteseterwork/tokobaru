import { Html, Head, Main, NextScript } from 'next/document';
import { useTheme } from 'next-themes';

export default function Document() {
    const { theme } = useTheme();
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}