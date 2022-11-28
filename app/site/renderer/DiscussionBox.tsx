import { Show } from "./Show"
import { Link } from "./Link"
export const DiscussionBox: React.FC<{ discussionUrl: string }> = ({ discussionUrl }) =>
    <div className="cpnt-discussion-box layout-popout bg-flashybg px-lg py-lg flex flex-col gap-md rounded-2xl my-md"
        data-script="init set $discussionBox to me"
    >
        <h2>Discuss</h2>

        <p>
            To send me a private note click this
            button and fill out the form below:
        </p>
        <p className="flex justify-center items-center">
            <button
                className="cpnt-button"
                data-script={`on click
                               put $comment after $discussionBox
                               trigger showWithoutSelection on $comment
                    `}>
                Leave a Private Note
            </button>
        </p>
        <p>
            To include a text selection in your private note, select some text from the article above and click the new "Leave a
            Private Note" button that appears.
        </p>
        <Show when={discussionUrl}>
            <p>
                You can also discuss this post in <Link href={discussionUrl} className="underline decoration-gray-500">
                    the official thread
                </Link> in the subreddit.
            </p>
        </Show>
    </div>
