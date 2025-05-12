import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage();

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: initialProps.styles,
            };
        } finally {
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/static/image/favicon.ico" />
                    <link
                        rel="icon"
                        sizes="192x192"
                        href="/static/image/logo-192.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        href="/static/image/apple-touch-icon.png"
                    />
                    <link
                        rel="apple-touch-icon-precomposed"
                        sizes="180x180"
                        href="/static/image/apple-touch-icon-precomposed.png"
                    />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image"
                        content="/static/image/logo.png"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Lato:400,700%7CPoppins:700&display=swap"
                        rel="stylesheet"
                    ></link>
                    {process.env.NODE_ENV === "development" ? (
                        <link
                            rel="stylesheet"
                            type="text/css"
                            href="/static/css/bs.css"
                        />
                    ) : (
                        <link
                            rel="stylesheet"
                            type="text/css"
                            href="/static/css/bsmin.css"
                        />
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
