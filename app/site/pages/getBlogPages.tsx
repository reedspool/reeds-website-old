import { readdir } from 'node:fs/promises';
import { PageBlogStuff } from "../renderer/types";

//
// In an ideal world, vite or vite-plugin-ssr would allow access to all
// pages and the frontmatter within them, but it doesn't, so we need to get
// all the blog information for ourselves using fs and vite's dynamic imports
//
// This was discussed with vite-plugin-ssr creator here:
// https://github.com/brillout/vite-plugin-ssr/issues/521
//

const draftsPath = "_drafts/";

// Even though we have the full file name, vite:dynamic-import-vars
// requires that the dynamic import contains a static suffix which
// is fine since we need to get this for the url anyways
// It also requires a static prefix into the directory in question,
// so we have to give different paths for drafts
const importDraft = (urlName: string) =>
    import(`./blog/_drafts/${urlName.substring(draftsPath.length)}.page.server.mdx`)
const importPost = (urlName: string) =>
    import(`./blog/${urlName}.page.server.mdx`)
const matchMdxFiles = (fileName: string) => fileName.match(/\.mdx$/)
const extractUrlName = (fileName: string) => fileName.substring(0, fileName.indexOf('.page.server.mdx'))

export const renderPublishedFiles: () => Promise<Array<Promise<PageBlogStuff>>> = async () => {
    return (await readdir('./pages/blog/'))
        .filter(matchMdxFiles)
        .map(
            async (fileName) => {
                const urlName = extractUrlName(fileName);
                const { documentProps } = await importPost(urlName);
                const publishJSDate = new Date(documentProps.publishDate);
                return {
                    fileName, urlName, documentProps, publishJSDate
                }
            })
}

export const renderDraftFiles: () => Promise<Array<Promise<PageBlogStuff>>> = async () => {
    return (await readdir(`./pages/blog/${draftsPath}`))
        .filter(matchMdxFiles)
        .map(fileName => `${draftsPath}${fileName}`)
        .map(
            async (fileName) => {
                const urlName = extractUrlName(fileName);
                const { documentProps } = await importDraft(urlName);
                documentProps.title = `[DRAFT] ${documentProps.title}`
                const publishJSDate = new Date(documentProps.publishDate);
                return {
                    fileName, urlName, documentProps, publishJSDate
                }
            })
}

export const renderPostFiles: () => Promise<Array<Promise<PageBlogStuff>>> = async () => {
    if (import.meta.env.PROD) {
        return renderPublishedFiles()
    }

    // Dev mode, include blog posts
    const all = await Promise.all([renderPublishedFiles(), renderDraftFiles()]);
    const [published, drafts] = all;
    return [...published, ...drafts];
}

export const reversePublishDate = (a: PageBlogStuff, b: PageBlogStuff) => {
    return +(b.publishJSDate) - +(a.publishJSDate)
}
// Load all of the pages' data at once
// Sort the pages (in place) after everything's loaded, reverse chronological
export const pages: Promise<Array<PageBlogStuff>> =
    new Promise(
        async (resolve, reject) =>
            Promise.all(await renderPostFiles())
                .then(values => values.sort(reversePublishDate))
                .then(resolve)
                .catch(reject) // If we don't catch and reject, typescript freaks out
    );
