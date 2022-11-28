export const BlogFrontMatter: React.FC<{ publishDate: string; updateDate: string; }> = ({
    publishDate, updateDate
}) =>
    < div className="mw-full flex flex-col items-end py-md" >
        {

            [
                ['Published', 'bx-edit-alt', publishDate],
                ['Last updated', 'bx-calendar-edit', updateDate]
            ].map(([text, icon, date]) =>
                <span className="cpnt-hover-unhide whitespace-nowrap">
                    <span className="invisible cpnt-hover-unhide__target align-middle">{text}</span>
                    <i className={`bx ${icon} align-middle inline-block`}></i>
                    <time className="align-middle text-gray-500" dateTime={date}>
                        {new Date(date).toLocaleDateString()}
                    </time>
                </span>
            )
        }
    </div >
