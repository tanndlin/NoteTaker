import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../../contexts/NoteContext';
import FolderMinusIcon from '../Icons/FolderMinusIcon';
import FolderOpenIcon from '../Icons/FolderOpenIcon';
import HomeIcon from '../Icons/HomeIcon';
import { Note } from '../types';
import { smoothTransition } from '../utils';
import { FolderView } from './FolderView';

type Props = {
    onClick?: (note: Note) => void;
    filter?: (note: Note) => boolean;
};

const FolderViewMinWrapper = (props: Props) => {
    const { filter } = props;
    const { notes } = useContext(NoteContext);
    const navigate = useNavigate();

    const [openStates, setOpenStates] = React.useState(
        JSON.parse(localStorage.getItem('openStates') || '{}')
    );

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const expandAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = true;
        });
        setOpenStates(newOpenStates);
    };

    const foldAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = false;
        });
        setOpenStates(newOpenStates);
    };

    const onClick = (note: Note) => {
        window.location.href = `/${note.id}`;
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <section className="overflow-auto overflow-x-hidden">
                <div className="mb-4 mr-4 w-max">
                    <FolderView
                        {...{
                            notes,
                            filter: filter || (() => true),
                            openStates,
                            setOpenStates,
                            onClick: props.onClick || onClick
                        }}
                    />
                </div>
            </section>
            <footer className="flex flex-col gap-8">
                <span className="flex justify-center gap-8">
                    <button onClick={expandAll}>
                        <FolderOpenIcon className="mx-auto" />
                    </button>
                    <button onClick={foldAll}>
                        <FolderMinusIcon className="mx-auto" />
                    </button>
                </span>
                <button onClick={() => smoothTransition(() => navigate('/'))}>
                    <HomeIcon className="mx-auto" />
                </button>
            </footer>
        </div>
    );
};

export default FolderViewMinWrapper;
