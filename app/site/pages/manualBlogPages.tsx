import { PageContextExportDocumentProps } from "../renderer/types";

export type Page = {
    urlName: string;
    documentProps: PageContextExportDocumentProps
    publishJSDate: Date
}

export const pages: Page[] = [
    {
        urlName: '20220923-my-fresh-website',
        publishJSDate: new Date('2022-09-23T12:00:00.000Z'),
        documentProps: {
            type: 'post',
            title: 'My Fresh Website',
            discussionUrl: 'https://www.reddit.com/r/reedswebsite/comments/xmnrq4/my_fresh_website/',
            description: '',
            publishDate: '2022-09-23T12:00:00.000Z',
            addenda:
                [
                    {
                        title: 'Errata 1',
                        date: '2022-10-18T12:00:00.000Z',
                        content:
                            `
I erroneously had missing.css's version listed as \`v1.0.0\`. Deniz, its creator, let me know that it was actually just \`v0.1.0\`. I was too excited.
`
                    },
                    {
                        title: 'Rewrite',
                        date: '2022-11-25T12:00:00.000Z',
                        content:
                            `
Updated to reflect site rewrite from Eleventy to \`vite-plugin-ssr\`.
`
                    }
                ]
        }
    },
    {
        urlName: '20220924-two-paragraphs',
        publishJSDate: new Date('2022-09-24T12:00:00.000Z'),
        documentProps:
        {
            type: 'post',
            title: 'These Two Paragraphs Will Save Your Job',
            discussionUrl: 'https://www.reddit.com/r/reedswebsite/comments/xmns77/these_two_paragraphs_will_save_your_job/',
            description: '',
            publishDate: '2022-09-24T12:00:00.000Z',
            addenda: [
                {
                    title: 'Edits',
                    date: '2022-10-14T12:00:00.000Z',
                    content: 'A secret friend helped me make some grammar edits. Thanks secret friend.'
                },
                {
                    title: 'Rubber Ducky',
                    date: '2022-10-09T15:35:00.000Z',
                    content: `
Derrell says,

> This is essentially [Rubber Ducky debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging), which works extremely well in my experience.

`
                },
            ]
        }
    },
    {
        urlName: '_drafts/20221201-advent-of-code-hyperscript-day-1-2022',
        publishJSDate: new Date('2022-12-02T12:00:00.000Z'),
        documentProps: {
            type: 'post',
            title: 'Advent of Code in Hyperscript 2022 Day 1',
            publishDate: '2022-12-02T12:00:00.000Z',
            addenda: undefined
        }
    },
    {
        urlName: '_drafts/20221204-advent-of-code-hyperscript-day-2-2022',
        publishJSDate: new Date('2022-12-04T12:00:00.000Z'),
        documentProps: {
            type: 'post',
            title: 'Advent of Code in Hyperscript 2022 Day 2',
            publishDate: '2022-12-04T12:00:00.000Z',
            addenda: undefined
        }
    },
    {
        urlName: '_drafts/20221206-codenames-clues',
        publishJSDate: new Date('2022-12-06T12:00:00.000Z'),
        documentProps: {
            type: 'post',
            title: 'Codenames Clues',
            publishDate: '2022-12-06T12:00:00.000Z',
            addenda: undefined
        }
    },
]
