import { Clock, FileText, Folder, Search } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import AnimatedLink from '../../common/AnimatedLink';
import HomeIcon from '../../common/Icons/HomeIcon';
import { NoteContext } from '../../contexts/NoteContext';

const SearchPage = () => {
    const { notes } = useContext(NoteContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDirectory, setSelectedDirectory] = useState('all');

    // Filter out deleted notes and get unique directories
    const activeNotes = useMemo(
        () => notes.filter((note) => !note.deleted),
        [notes]
    );

    const directories = useMemo(() => {
        const dirs = [...new Set(activeNotes.map((note) => note.directory))];
        return dirs.sort();
    }, [activeNotes]);

    // Filter notes based on search query and directory
    const filteredNotes = useMemo(() => {
        let filtered = activeNotes;

        // Filter by directory
        if (selectedDirectory !== 'all') {
            filtered = filtered.filter(
                (note) => note.directory === selectedDirectory
            );
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (note) =>
                    note.title.toLowerCase().includes(query) ||
                    note.body.toLowerCase().includes(query) ||
                    note.directory.toLowerCase().includes(query)
            );
        }

        // Sort by most recently updated
        return filtered.sort((a, b) => b.updatedAt - a.updatedAt);
    }, [activeNotes, searchQuery, selectedDirectory]);

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (Date.now() - timestamp) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else if (diffInHours < 24 * 7) {
            return `${Math.floor(diffInHours / 24)}d ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const truncateText = (text: string, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;

        const regex = new RegExp(
            `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
            'gi'
        );
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark
                    key={index}
                    className="px-1 text-blue-200 bg-blue-500 rounded bg-opacity-30"
                >
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="flex flex-col h-full max-w-4xl py-12 mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="mb-2 text-3xl font-bold text-white page-title">
                        Search Notes
                    </h1>
                    <AnimatedLink to="/">
                        <button>
                            <HomeIcon className="w-5 h-5" />
                        </button>
                    </AnimatedLink>
                </div>
                <p className="text-gray-400">
                    Find your notes quickly and efficiently
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                    type="text"
                    placeholder="Search notes by title, content, or directory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    style={{ backgroundColor: 'rgb(31, 41, 55)' }}
                />
            </div>

            {/* Directory Filter */}
            <div className="mb-6">
                <select
                    value={selectedDirectory}
                    onChange={(e) => setSelectedDirectory(e.target.value)}
                    className="px-4 py-2 text-white transition-all border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    style={{ backgroundColor: 'rgb(31, 41, 55)' }}
                >
                    <option value="all">All Directories</option>
                    {directories.map((dir) => (
                        <option key={dir} value={dir}>
                            {dir}
                        </option>
                    ))}
                </select>
            </div>

            {/* Search Results */}
            <div className="space-y-4 overflow-auto">
                {/* Results Count */}
                <div className="mb-4 text-sm text-gray-400">
                    {filteredNotes.length}{' '}
                    {filteredNotes.length === 1 ? 'note' : 'notes'} found
                </div>

                {/* Notes List */}
                {filteredNotes.length === 0 ? (
                    <div className="py-12 text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <h3 className="mb-2 text-xl font-semibold text-gray-400">
                            No notes found
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery.trim()
                                ? 'Try adjusting your search terms or check different directories'
                                : 'Start typing to search through your notes'}
                        </p>
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className="p-6 transition-all border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 group"
                            style={{ backgroundColor: 'rgb(31, 41, 55)' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-300">
                                    {highlightText(note.title, searchQuery)}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Folder className="w-4 h-4" />
                                        <span>{note.directory}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {formatDate(note.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="leading-relaxed text-gray-300">
                                {highlightText(
                                    truncateText(note.body),
                                    searchQuery
                                )}
                            </p>

                            {/* Tags or additional metadata could go here */}
                            <div className="pt-4 mt-4 border-t border-gray-700">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>ID: {note.id}</span>
                                    <span
                                        className="px-2 py-1 text-xs rounded"
                                        style={{
                                            backgroundColor: 'rgb(12, 74, 110)',
                                            color: 'rgb(147, 197, 253)'
                                        }}
                                    >
                                        {note.directory}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchPage;
