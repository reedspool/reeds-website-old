import { PageProps } from "../renderer/types";
import { pages } from "./getBlogPages";
export const Page: React.FC<PageProps> = () =>
    <article className="cpnt-blog-article">
        <h1>Reed's Website</h1>

        <p>My home page where I keep my web things.</p>
        <h2>Posts</h2>

        <nav aria-label="Posts" className="mt-md">
            <ul className="flex flex-col gap-0 px-lg">
                {pages.map(({ urlName, documentProps: { title, publishDate } }) =>
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
                    </li>)}
            </ul>
        </nav>

        <h2>Elsewhere</h2>
        <nav aria-label="Social media links" className="mt-md px-lg">
            <ul className="flex flex-col gap-0">
                <li className="cpnt-hover-unhide py-md">
                    <a
                        className="flex flex-row justify-between underline decoration-gray-400"
                        href="https://www.github.com/reedspool" target="_blank">
                        GitHub
                        <span className="invisible cpnt-hover-unhide__target">@reedspool</span >
                    </a>
                </li>
                <li className="cpnt-hover-unhide py-md"><a
                    className="flex flex-row justify-between underline decoration-gray-400"
                    href="mailto:reedwith2es@gmail.com" target="_blank">
                    Email
                    <span className="invisible cpnt-hover-unhide__target">reedwith2es</span>
                </a>
                </li>
                <li className="cpnt-hover-unhide py-md"><a
                    className="flex flex-row justify-between underline decoration-gray-400"
                    href="https://www.reddit.com/r/ReedsWebsite" target="_blank">
                    Reddit
                    <span className="invisible cpnt-hover-unhide__target">r/ReedsWebsite</span>
                </a>
                </li>
                <li className="cpnt-hover-unhide py-md"><a
                    className="flex flex-row justify-between underline decoration-gray-400"
                    href="https://www.reddit.com/u/ReedsWebsite" target="_blank">
                    Reddit
                    <span className="invisible cpnt-hover-unhide__target">u/ReedsWebsite</span>
                </a>
                </li>
            </ul>
        </nav>
    </article>
