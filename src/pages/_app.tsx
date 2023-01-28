import { Provider as StoreProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/app/store";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Todo List</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: "dark" }}
            >
                <SessionProvider session={pageProps.session}>
                    <StoreProvider store={store}>
                        <Component {...pageProps} />
                    </StoreProvider>
                </SessionProvider>
            </MantineProvider>
        </>
    );
}
