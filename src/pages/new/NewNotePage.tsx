import React from 'react';
import { Edit } from './Edit';
import './NewNote.scss';
import { Preview } from './Preview';

const NewNote = () => {
    const [markdown, setMarkdown] = React.useState(
        `# Hello World  
This is a [test](https://google.com)  
How about now a list view  
1. Gello  
2. Hello`
    );

    const [tags, _setTags] = React.useState([
        'Tag 1',
        'Tag 2',
        'Tag 3',
        'Tag 4',
        'Tag 5'
    ]);

    return (
        <div className="px-4 h-full w-screen flex flex-col flex-grow">
            <h1 className="text-3xl mb-8 ">Title</h1>
            <div className="flex flex-1 w-full">
                <section className="w-1/2 mx-4 h-full flex flex-col flex-grow">
                    <Edit {...{ markdown, setMarkdown, tags }} />
                </section>
                <section className="w-1/2 mr-4 pl-4 border-l-2 border-tertiary flex flex-col flex-grow">
                    <Preview {...{ markdown, tags }} />
                </section>
            </div>
        </div>
    );
};

export default NewNote;
