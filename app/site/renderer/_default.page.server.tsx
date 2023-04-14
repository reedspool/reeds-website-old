import ReactDOMServer from 'react-dom/server'
import { PageShell } from './components/PageShell'
import { DefaultLayout } from './components/DefaultLayout'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { pages } from "./../pages/getBlogPages";
/* import { pages } from "./../pages/manualBlogPages"; */
// @ts-ignore
import logoUrl from '../public/logo.svg'
// @ts-ignore
import cssContent from './style.css'
import type { PageContextServer, PageLayout } from './types'

// Simply reference CSS to prevent tree-shaking. As long as this isn't removed
// via tree shaking, vite will see it and include a link to it in the HTML
cssContent

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

export async function render(pageContext: PageContextServer) {
    const { Page, pageProps, exports } = pageContext
    const { documentProps, Layout } = exports
    const ActualLayout: PageLayout = Layout ?? DefaultLayout;
    const blogPages = await pages
    const pageHtml = ReactDOMServer.renderToString(
        <PageShell>
            <ActualLayout {...documentProps}>
                <Page {...pageProps} {...{ blogPages }} />
            </ActualLayout>
        </PageShell>
    )

    // See https://vite-plugin-ssr.com/head
    let pageTitle = "Reed's Website";
    let pageDescription = "Reed Spool's Personal Website"

    if (documentProps) {
        const { title, description } = documentProps

        pageTitle = title ?? pageTitle
        pageDescription = description ?? pageDescription
    }

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${pageDescription}" />
        <title>${pageTitle}</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
      </head>
      <body class="cpnt-bleed-layout">
            ${dangerouslySkipEscape(pageHtml)}
        <script src="https://unpkg.com/hyperscript.org@0.9.7"></script>
      </body>
    </html>`

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        }
    }
}
