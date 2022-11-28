import { PropsWithChildren } from "react";

export const BlogArticle: React.FC<PropsWithChildren> = ({ children }) =>
    <article className="cpnt-blog-article"
        data-script={`
           on selectionchange from document
             set selection to document.getSelection()
             hide $commentStart

             -- First, if the selection is changing to within the comment
             -- then cancel the event entirely
             set anchorElement to selection.anchorNode
             if anchorElement.nodeType is Node.TEXT_NODE then
               -- Text nodes don't have .closest(), so get the parent element first
               set anchorElement to anchorElement.parentElement
             end
             get the closest <.cpnt-comment /> to the anchorElement
             if the result is not null then
                   halt the event
                   exit
             end

             -- Don't do anything if the selection is empty
             if selection.isCollapsed then exit end

             -- Determine which comes later, the anchor or the focus
             -- https://stackoverflow.com/a/23512678
             set position to selection.anchorNode.compareDocumentPosition(selection.focusNode)
             set $commentTargetContainer to selection.focusNode
             set isSameNodeAndBackwards to ((position is 0) and (selection.anchorOffset > selection.focusOffset))
             if isSameNodeAndBackwards or (position is Node.DOCUMENT_POSITION_PRECEDING) then
               set $commentTargetContainer to selection.anchorNode
             end

             -- Find the container paragraph or other element (not text node)
             if $commentTargetContainer.nodeType is Node.TEXT_NODE then
               set $commentTargetContainer to $commentTargetContainer.parentElement
             end
             get the closest <p /> to $commentTargetContainer
             if the result is not null then
               set $commentTargetContainer to the result
             end


             -- Don't show the comment widget if the selection expands outside of the article
             get the closest <article /> to $commentTargetContainer
             if the result is null then exit end

             -- Align widget with the container
             measure element $commentTargetContainer's left, bottom
             set $commentStart's *left to left px
             set $commentStart's *top to (bottom + 10) px

             show $commentStart

             -- put the text into the comment's quote area AND a hidden input
             put selection.toString().trim() into $commentQuote
             put selection.toString().trim() into $commentSelectionInput's value
             -- add the greater context of the entire $commentTargetContainer's text
             put innerText of $commentTargetContainer into $commentContext's value
        `}
    >
        {children}
    </article>
