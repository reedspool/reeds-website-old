import { FC } from "react";
import { Map } from "../renderer/components/Map";
import { PageProps } from "../renderer/types";

const BlogPostListItem: FC<PageProps["blogPages"][0]> =
    ({ urlName, documentProps: { title, publishDate } }) =>
        <li className="cpnt-hover-unhide py-md">
            <a
                className="flex flex-row justify-between items-center underline decoration-gray-400"
                href={`blog/${urlName}`}>
                {title}
                <span className="ml-md  text-sm whitespace-nowrap">
                    <span className="invisible cpnt-hover-unhide__target">Published </span>
                    <i className='bx bx-edit-alt'></i>
                    <time className="text-gray-500" dateTime={publishDate}>
                        {new Date(publishDate).toLocaleDateString()}
                    </time>
                </span>
            </a>
        </li>

const socials = [
    {
        href: "https://www.github.com/reedspool",
        platform: "GitHub",
        tag: "@reedspool"
    },
    {
        href: "mailto:reedwith2es@gmail.com",
        platform: "Email",
        tag: "reedwith2es"
    },
    {
        href: "https://www.reddit.com/r/ReedsWebsite",
        platform: "Reddit",
        tag: "r/ReedsWebsite"
    },
    {
        href: "https://www.reddit.com/u/ReedsWebsite",
        platform: "Reddit",
        tag: "u/ReedsWebsite"
    }
]

const SocialListItem: FC<typeof socials[0]> =
    ({ href, platform, tag }) =>
        <li className="cpnt-hover-unhide py-md"><a
            className="flex flex-row justify-between underline decoration-gray-400"
            href={href} target="_blank">
            {platform}
            <span className="invisible cpnt-hover-unhide__target">{tag}</span >
        </a >
        </li >

export const Page: React.FC<PageProps> = ({ blogPages }) =>
    <article className="cpnt-blog-article">
        <h1>Reed's Website</h1>

        <p>My home page where I keep my web things.</p>
        <h2>Posts</h2>

        <nav aria-label="Posts" className="mt-md">
            <ul className="flex flex-col gap-0 px-lg">
                <Map From={blogPages} To={BlogPostListItem} />
            </ul>
        </nav>

        <h2>Elsewhere</h2>
        <nav aria-label="Social media links" className="mt-md px-lg">
            <ul className="flex flex-col gap-0">
                <Map From={socials} To={SocialListItem} />
            </ul>
        </nav>
    </article>
