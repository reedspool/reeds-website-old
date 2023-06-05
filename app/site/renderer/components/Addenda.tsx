import type { AddendaData } from "./types";
import { marked } from 'marked';
import { Map } from "./Map";

export const Addenda: React.FC<{ addenda: AddendaData }> = ({ addenda }) =>
    <ul className="list-none flex flex-col gap-md my-sm p-0">
        <Map From={addenda} To={AddendaItem} />
    </ul>


export const AddendaItem: React.FC<AddendaData[0]> = ({ date, content }) => {
    // To avoid adding an extraneous div just to use
    // dangerouslySetInnerHTML as in
    // https://github.com/facebook/react/issues/12014
    // we form the html content manually
    let __html = `
        <time class="text-md inline-block" datetime="${date}">
            ${new Date(date).toLocaleDateString()}
        </time>
        <div class="mt-sm">
            ${marked.parse(content.trim())}
        </div>
    `.trim();

    return (
        <li className="px-md"
            dangerouslySetInnerHTML={{ __html }}></li>
    )
}
