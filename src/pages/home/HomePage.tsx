import AnimatedLink from '../../common/AnimatedLink';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';
import { Configs, Note } from '../../common/types';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
    configs: Configs;
};

export const HomePage = (props: HomePageProps) => {
    const { notes, createNote } = props;

    const onClick = (note: Note) => {
        window.location.href = `/${note.id}`;
    };

    return (
        <main className="container flex flex-col h-full p-8 mx-auto">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold">Home</h1>
                <span className="flex flex-col">
                    <AnimatedLink className="text-xl" to={'/about'}>
                        About
                    </AnimatedLink>
                    <AnimatedLink className="text-xl" to={'/graph'}>
                        Graph
                    </AnimatedLink>
                    <AnimatedLink className="text-xl" to={'/Settings'}>
                        Settings
                    </AnimatedLink>
                </span>
            </header>
            <article className="container p-4 mt-16 overflow-auto rounded-md bg-secondary min-h-1/2">
                <FolderViewWrapper {...{ notes, createNote, onClick }} />
            </article>
        </main>
    );
};
