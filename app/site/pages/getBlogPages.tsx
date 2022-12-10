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

export const renderPostFiles: () => Promise<Array<Promise<PageBlogStuff>>> = async () => {
    // Read the real file names which include `.page.server.mdx`
    // NOTE: PWD is the Vite root, so we need to dig
    const postFiles = await Promise.all(
        [
            readdir('./pages/blog/'),
            readdir(`./pages/blog/${draftsPath}`)
        ])

    let [publishedFiles, draftFiles] = postFiles;

    draftFiles = draftFiles.map(fileName => `${draftsPath}${fileName}`)

    return publishedFiles.concat(draftFiles)
        .filter((fileName) => fileName.match(/\.mdx$/))
        .map(
            async (fileName) => {
                const urlName = fileName.substring(0, fileName.indexOf('.page.server.mdx'));
                // Even though we have the full file name, vite:dynamic-import-vars
                // requires that the dynamic import contains a static suffix which
                // is fine since we need to get this for the url anyways
                // It also requires a static prefix into the directory in question,
                // so we have to give different paths for drafts
                let imported;
                if (urlName.startsWith(draftsPath)) {
                    imported = await import(`./blog/_drafts/${urlName.substring(draftsPath.length)}.page.server.mdx`)
                }
                else {
                    imported = await import(`./blog/${urlName}.page.server.mdx`)
                }

                const { documentProps } = imported;

                return { fileName, urlName, documentProps, publishJSDate: new Date(documentProps.publishDate) } as PageBlogStuff
            })
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
