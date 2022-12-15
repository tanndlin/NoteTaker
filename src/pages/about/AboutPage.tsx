import React from 'react';
import MarkdownRenderer from '../../common/Preview/MarkdownRenderer';

const AboutPage = () => {
    const markdownContent = `
# Note Taker {#top}
## About
Note Taker is a simple note taking app that allows you to create, edit, and
delete notes. What is special about these notes is they can reference other
notes using [hyperlinks](https://en.wikipedia.org/wiki/Hyperlink) for quick
refreshers on related topics.

## Features
- File heirarchy structure for organizing notes
- Markdown support for formatting notes
- Hyperlinks for referencing other notes
- Search for note titles and note contents

## Search
Note Taker supports searching for note titles and note contents. To search for
note titles, simply type the search query in the search bar. To search for note
contents, type \`text:\` followed by the search query. For example, to search
for notes that contain the word \`hello\`, type \`text:hello\`.

## Hyperlinks
### Linking other notes
Note Taker supports hyperlinks for referencing other notes. To create a
hyperlink, type \`[link text](ref(path/to/note/note_title))\`. For example, to create a
hyperlink to a note titled \`Hello World\` in the directory \`first\`, type
\`[Text Here](ref(/first/Hello_World)\`. Note that the note title is case sensitive.
The result will look like this: [Text Here](#).  
You can also manually make a reference by copying the url of the note and
pasting it into the hyperlink.

### Linking headings
You can also give headings an id and reference them by using \`[link text](ref(#id))\`.
This will scroll your notes to the location of the heading. For example, to
reference the heading \`Hello World\` you can give it an id by typing \`## Hello
World {#hello-world}\` and then reference it by typing \`[Text Here](#hello-world)\`.
For example [this](#top) hyperlink will take you to the top heading.
`;

    return (
        <main className="flex flex-col h-full">
            <span className="mx-auto w-1/2 flex justify-between">
                <h1 className="text-3xl text-center font-bold">
                    Welcome to Note Taker!
                </h1>
                <button onClick={() => (window.location.href = '/')}>
                    Home
                </button>
            </span>

            <article className="flex h-full">
                <section className="m-auto w-1/2 bg-secondary p-8 rounded-md max-h-[90vh] overflow-auto">
                    <MarkdownRenderer markdown={markdownContent} />
                </section>
            </article>
        </main>
    );
};

export default AboutPage;
