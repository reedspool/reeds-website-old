import { Link } from "./Link"

export const CommentWidget: React.FC = () =>
    <>
        <button
            className="cpnt-comment-start"
            style={{ display: "none" }}
            data-script={`
                   init
                     set $commentStart to me
                   end

                   on click
                     put $comment after $commentTargetContainer
                     trigger showWithSelection on $comment
                     hide me
            `}
        >Leave a Private Note</button>
        <div className="cpnt-comment cpnt-blog-article bg-flashybg px-lg py-sm flex flex-col gap-md rounded-2xl my-md " style={{ display: "none" }}
            data-script={`
                    init
                       set $comment to me
                       set $commentQuote to first <blockquote /> in me
                       set $commentSelectionInput to #comment-selection in me
                       set $commentContext to #comment-context in me
                       set $commentTargetContainer to null
                    end

                    on showWithSelection
                      -- For some reason this errors with 'Illegal invocation'
                      -- I can set a variable to this and it works, but decided against it anyways
                      -- call focus() of #comment-content
                      show <[data-hs='showWithSelection'] />
                      hide <[data-hs='showWithoutSelection'] />
                      show me
                      trigger resetResults on me
                    end

                    on showWithoutSelection
                      hide <[data-hs='showWithSelection'] />
                      show <[data-hs='showWithoutSelection'] />
                      put 'No selection' into $commentSelectionInput
                      show me
                      trigger resetResults on me
                    end
            `}
        >
            <h3
                className="flex justify-between justify-self-start"
            >
                Private Note
                <button className="close-button"
                    data-script={`on click
                               tell closest <.cpnt-comment />
                                 hide yourself
                                 trigger resetResults
                               end
                    `}
                >X</button>
            </h3>
            <form
                method="POST"
                name="article-comment"
                hx-post="/"
                hx-swap="none"
                data-netlify="true"
                className="table"
                netlify-honeypot="bot-field"
                data-script={`
                        on htmx:beforeRequest
                          trigger resetResults on closest <.cpnt-comment />
                `}
            >
                <p>
                    Send me a private note. <span data-hs="showWithSelection">
                        Your selection will be included:
                    </span> <span data-hs="showWithoutSelection">
                        You can also select text within the article and hit the
                        "Leave a Private Note" button which appears to include a
                        selection with your comment.
                    </span>
                </p>
                <blockquote data-hs="showWithSelection" className="whitespace-pre-wrap bg-primarybg text-sm mx-0">
                    Your selection
                </blockquote>
                <p style={{ display: "none" }}>
                    <label htmlFor="comment-selection">Selection:</label>
                    <textarea
                        name="selection"
                        id="comment-selection"
                        className="w-full"
                    ></textarea>
                </p>
                <p>
                    <label htmlFor="comment-content">Note:</label>
                    <textarea
                        name="content"
                        id="comment-content"
                        className="w-full"
                        data-script={`on resetCommentInput from closest <.cpnt-comment />
                             set my value to ''
                        `}
                    ></textarea>
                </p>
                <div className="box warn" style={{ display: "none" }}
                    data-script={`
                            on resetResults from closest <.cpnt-comment /> hide me
                            on htmx:responseError from closest <form /> hide me
                            on htmx:afterSettle from closest <form /> hide me
                    `}
                >
                    <p><strong>Write a note</strong> about your selection.</p>
                    <p></p>
                </div>
                <p>
                    Please share your name, email, or other identifier to let me know who you are.
                    This will be saved in your browser and sent to me. I will never share it.
                </p>
                <p>
                    <label htmlFor="comment-contact">Contact info (optional):</label>
                    <input type="text" name="contact" value="" id="comment-contact"
                        className="w-full"
                        data-script={`
                                init
                                  set contact to localStorage.getItem('my-comment-contact')
                                  if contact then set my value to contact end
                                end
                                on input
                                 localStorage.setItem('my-comment-contact', my value)
                        `}
                    />
                </p>
                <p style={{ display: "none" }}>
                    <label htmlFor="comment-context">Selection Context:</label>
                    <textarea
                        name="context"
                        id="comment-context"
                    ></textarea>
                </p>
                <p style={{ display: "none" }}>
                    <label htmlFor="comment-url">Page Title:</label>
                    <input type="text" name="title" value=""
                        data-script={`init put document.title into my value`}
                    />
                </p>
                <p style={{ display: "none" }}>
                    <label htmlFor="comment-url">URL:</label>
                    <input type="text" name="url" value=""
                        data-script={`init put document.location.toString() into my value`}
                    />
                </p>
                <p style={{ display: "none" }}>
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                </p>
                <p className="flex flex-row justify-between gap-md items-center !mt-lg">
                    <input type="submit" value="Send" id="comment-submit" className="cpnt-button" />
                    <button className="close-button cpnt-button !bg-gray-700 !text-primarybg"
                        data-script={`
                                   on click
                                     send resetResults to closest <.cpnt-comment />
                                     hide closest <.cpnt-comment />
                                     -- Prevent form submission
                                     halt`}
                    >Cancel</button>
                </p>
                <div className="" style={{ display: "none" }}
                    data-script={`
                            on resetResults from closest <.cpnt-comment /> hide me
                            on htmx:afterRequest from closest <form /> hide me
                            on htmx:afterSettle from closest <form /> show me
                    `}
                >
                    <p className="flex flex-row justify-start gap-md items-center">
                        <strong>Received. Thank you!</strong>
                        <button className="cpnt-button"
                            data-script={`
                               on click
                                 halt the event
                                 tell closest <.cpnt-comment />
                                   trigger resetResults
                                   trigger resetCommentInput
                                   hide me
                                 end
                            `}
                        >Clear and close note box</button>
                    </p>
                </div>
                <div className="" style={{ display: "none" }}
                    data-script={
                        `                            on resetResults from closest <.cpnt-comment /> hide me
                            on htmx:responseError from closest <form /> show me
                            on htmx:sendError from closest <form /> show me
                            on htmx:afterRequest from closest <form /> hide me
                            on htmx:afterSettle from closest <form /> hide me
`                            }
                >
                    <p><strong>Something went wrong :-/</strong></p>
                    <p>
                        I'm sorry, I don't know what happened.
                        Please email me your note at <Link href="mailto:reedwith2es@gmail.com">
                            reedwith2es@gmail.com</Link> instead. I really want to read it!
                    </p>
                </div>
            </form>
        </div>
    </>
