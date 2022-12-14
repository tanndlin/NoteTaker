import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

const AboutPage = () => {
    return (
        <main className="flex flex-col h-full">
            <h1 className="text-3xl text-center font-bold">
                Welcome to Note Taker!
            </h1>

            <article className="flex h-full">
                <section className="m-auto w-1/2 bg-secondary p-8 rounded-md">
                    <ReactMarkdown className="markdown-body">
                        # About
                    </ReactMarkdown>
                </section>
            </article>
        </main>
    );
};

export default AboutPage;
