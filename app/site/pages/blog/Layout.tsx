import { BlogFrontMatter } from "./BlogFrontMatter"
import { BlogArticle } from "../../renderer/BlogArticle"
import { CommentWidget } from "../../renderer/CommentWidget"
import { Addenda } from "../../renderer/Addenda"
import { DiscussionBox } from "../../renderer/DiscussionBox"

import { PageContextExportDocumentProps, PageLayout } from "../../renderer/types"
import { Show } from "../../renderer/Show"

export const Layout: PageLayout<PageContextExportDocumentProps> = ({ children, title, publishDate, addenda, discussionUrl }) => {
    // Assume the addenda is sorted in chronological order, last is most recent
    // The update date is the date of the most recent addenda
    const updateDate = addenda[addenda.length - 1].date;
    return <>
        <h1 className="mt-md">{title}</h1>
        <BlogFrontMatter
            publishDate={publishDate}
            updateDate={updateDate} />
        <BlogArticle>
            {children}
        </BlogArticle>
        <DiscussionBox discussionUrl={discussionUrl} />
        <h2 className="my-md">Addenda</h2>
        <Show when={addenda}>
            <Addenda addenda={addenda} />
        </Show>
        <Show when={!addenda}>
            <p className="my-md">
                No addenda for this post yet.
                Send me a private note if you have a thought or fix to share!.
            </p>
        </Show>
        <CommentWidget />
    </>

}
