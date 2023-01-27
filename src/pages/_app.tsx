import { Provider } from "react-redux";
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
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </MantineProvider>
        </>
    );
}
