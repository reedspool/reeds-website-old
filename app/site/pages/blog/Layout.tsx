import { BlogFrontMatter } from "./BlogFrontMatter"
import { BlogArticle } from "../../renderer/components/BlogArticle"
import { CommentWidget } from "../../renderer/components/CommentWidget"
import { Addenda } from "../../renderer/components/Addenda"
import { DiscussionBox } from "../../renderer/components/DiscussionBox"

import { PageContextExportDocumentProps, PageLayout } from "../../renderer/types"
import { Case, Switch } from "./SwitchCase"
import { Show } from "../../renderer/components/Show"
import { ReactElement } from "react"
import { Layout as ParentLayout } from "../_default.page"

export const RenderAll: React.FC<{ all: Array<ReactElement> }> = ({ all }) => <>{all}</>

const bindProps:
    <K>(fn: React.FC<K>, boundProps: Partial<K>) => React.FC<Partial<K>>
    =
    // This `as K` means that there is no type checking that you've got ALL
    // the correct props, however there is type checking on the types of
    // each prop, so that's a trade-off.
    //
    // One way to get around this challenge would be a
    // third parameter for "defaults" which is NOT Partial<K> but just K,
    // to guarantee that each prop is set to a correct value
    <K,>(fn: React.FC<K>, boundProps: Partial<K>) => (props) => fn({ ...boundProps, ...props } as K);

//@ts-ignore -- unused
const bindPropsPermanent =
    (fn: React.FC, boundProps: {}) =>
        (props: {}, ...rest: Array<any>) =>
            // The only difference is the order in which the props are spread
            // All other errors are lack of updating this because I don't use it
            fn({ ...props, ...boundProps, }, ...rest);

/* Can we add this as a prototype to Function so that it can chain abritrarily? */
declare global { interface Function { bindProps<K>(boundProps: K): ReturnType<typeof bindProps<K>> } }
Function.prototype.bindProps = function <K>(boundProps: K) {
    return bindProps(this as React.FC<K>, boundProps)
}

// This all allows:
const BoundBlogFrontMatter = bindProps(BlogFrontMatter, { publishDate: "", updateDate: " " })
const stuff: Array<ReactElement> = [];
stuff.push(
    <h1 className="mt-md">A little experiment</h1>,
    <BoundBlogFrontMatter />,
    <>{BlogFrontMatter.bindProps({ publishDate: "", updateDate: " " })}</>,
    < BlogFrontMatter
        publishDate={""}
        updateDate={""} />);
// Then return <RenderAll {...{ all: stuff }} />;

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
