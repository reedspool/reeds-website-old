import { readdir } from 'node:fs/promises';
import { PageContextExportDocumentProps } from "../renderer/types";

//
// In an ideal world, vite or vite-plugin-ssr would allow access to all
// pages and the frontmatter within them, but it doesn't, so we need to get
// all the blog information for ourselves using fs and vite's dynamic imports
//
// This was discussed with vite-plugin-ssr creator here:
// https://github.com/brillout/vite-plugin-ssr/issues/521
//

// Read the real file names which include `.page.server.mdx`
// NOTE: PWD is the Vite root, so we need to dig
const postFiles = await readdir('./pages/blog');

export type Page = {
    fileName: string;
    urlName: string;
    documentProps: PageContextExportDocumentProps
    publishJSDate: Date
}
const pageData = postFiles
    .filter((fileName) => fileName.match(/\.mdx$/))
    .map(
        async (fileName) => {
            const urlName = fileName.substring(0, fileName.indexOf('.page.server.mdx'));
            // Even though we have the full file name, vite:dynamic-import-vars
            // requires that the dynamic import contains a static suffix which
            // is fine since we need to get this for the url anyways
            const { documentProps } = await import(`./blog/${urlName}.page.server.mdx`)
            return { fileName, urlName, documentProps, publishJSDate: new Date(documentProps.publishDate) } as Page
        })
// Load all of the pages' data at once
export const pages = await Promise.all(pageData);

// Sort the pages (in place) after everything's loaded, reverse chronological
pages.sort((a, b) => {
    return +(b.publishJSDate) - +(a.publishJSDate)
})
