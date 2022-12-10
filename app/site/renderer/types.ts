export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }

import { PropsWithChildren } from 'react'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing

type Page = (pageProps: PageProps) => React.ReactElement
export type PageProps = {
    blogPages: Array<PageBlogStuff>
}

export type PageBlogStuff = {
    fileName: string;
    urlName: string;
    documentProps: PageContextExportDocumentProps
    publishJSDate: Date
}

export type AddendaData = Array<{
    title: string,
    date: string,
    content: string
}>


export type PageContextExportDocumentProps = {
    type?: 'post'
    title: string
    description?: string
    publishDate: string
    addenda?: AddendaData
    discussionUrl?: string
}
export type ClassNameProps = { className?: string; }
export type PageLayout<T extends {} = {}> =
    React.FC<PropsWithChildren<T & ClassNameProps>>
export type PageContextCustom = {
    Page: Page
    pageProps?: PageProps
    urlPathname: string
    exports: {
        documentProps?: PageContextExportDocumentProps
        Layout: PageLayout
    }
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer
