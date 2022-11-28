import type { AddendaData } from "./types";
import { marked } from 'marked';

export const Addenda: React.FC<{ addenda: AddendaData }> = ({ addenda }) =>
    <ul className="list-none flex flex-col gap-lg my-md p-0">
        {addenda.map((props) => AddendaItem(props))}
    </ul>


export const AddendaItem: React.FC<AddendaData[0]> = ({ date, content }) => {
    // To avoid adding an extraneous div just to use
    // dangerouslySetInnerHTML as in
    // https://github.com/facebook/react/issues/12014
    // we form the html content manually
    let __html = `
        <time class="text-flashyfg text-md inline-block" datetime="${date}">
            ${new Date(date).toLocaleDateString()}
        </time>
        <div class="text-primaryfg mt-md">
            ${marked.parse(content.trim())}
        </div>
    `.trim();

    return (
        <li className="rounded-md p-md bg-flashyfg/20"
            dangerouslySetInnerHTML={{ __html }}></li>
    )
}
