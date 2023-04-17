import { BlogFrontMatter } from "./BlogFrontMatter"
import { BlogArticle } from "../../renderer/components/BlogArticle"
import { CommentWidget } from "../../renderer/components/CommentWidget"
import { Addenda } from "../../renderer/components/Addenda"
import { DiscussionBox } from "../../renderer/components/DiscussionBox"

import { PageContextExportDocumentProps, PageLayout } from "../../renderer/types"
import { Case, Switch } from "./SwitchCase"
import { Show } from "../../renderer/components/Show"
import { Layout as ParentLayout } from "../_default.page"

export const Layout: PageLayout<PageContextExportDocumentProps> = ({ children, title, publishDate, addenda, discussionUrl }) => {
    const isAddenda = addenda && addenda.length > 0;
    const updateDate =
        isAddenda
            // Assume the addenda is sorted in chronological order, last is most recent
            // The update date is the date of the most recent addenda
            ? addenda[addenda.length - 1].date
            // Otherwise its publishing was its last update
            : publishDate;

    return <ParentLayout>
        <h1 className="mt-md">{title}</h1>
        <BlogFrontMatter
            publishDate={publishDate}
            updateDate={updateDate} />
        <BlogArticle>
            {children}
        </BlogArticle>
        <Show when={discussionUrl}>
            {/* @ts-ignore TS doesn't know we have already safety checked */}
            <DiscussionBox discussionUrl={discussionUrl} />
        </Show>
        <h2 className="my-md">Addenda</h2>
        <Switch on={isAddenda}>
            <Case truthy>
                {/* @ts-ignore TS doesn't know we have already safety checked */}
                <Addenda addenda={addenda} />
            </Case>
            <Case falsy>
                <p className="my-md">
                    No addenda for this post yet.
                    Send me a private note if you
                    have a thought or fix to share!.
                </p>
            </Case>
        </Switch>
        <CommentWidget />
    </ParentLayout>

}
