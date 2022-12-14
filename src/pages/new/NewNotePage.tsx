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

    return (
        <div className="px-8 h-full w-screen flex flex-col flex-grow">
            <h1 className="text-3xl mb-8">Title</h1>
            <div className="flex flex-1 w-full">
                <section className="w-1/2 mr-4 h-full flex flex-col flex-grow">
                    <h2 className="text-2xl text-center w-full mb-8">Edit</h2>
                    <Edit {...{ markdown, setMarkdown }} />
                </section>
                <section className="w-1/2 pl-4 border-l-2 border-tertiary flex flex-col flex-grow">
                    <h2 className="text-2xl text-center w-full mb-8">
                        Preview
                    </h2>
                    <Preview {...{ markdown }} />
                </section>
            </div>
        </div>
    );
};

export default NewNote;
