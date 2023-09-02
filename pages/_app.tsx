import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import "../app/globals.css";
import Head from 'next/head';

import { ThemeSwitcher } from '@/app/themeSwitcher';

function MyApp({ Component, pageProps }: AppProps) {


    return (<>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            <title>Tokobaru - Simple Ecommerce Web</title>
            <meta
                name="description"
                content="Ecommerce website built with NextJS 13 for testing purpose."
            />
        </Head>
        <ThemeProvider attribute="class" defaultTheme="light">
            <ThemeSwitcher />
            <Component {...pageProps} />
        </ThemeProvider>
    </>
    );
}

export default MyApp;