type EditProps = {
    body: string;
    edit: (body: string) => void;
};

export const Edit = ({ body, edit }: EditProps) => {
    return (
        <div className="flex-1 w-full">
            <textarea
                className="w-full h-full p-2 text-black rounded-md"
                name="editInput"
                id="editInput"
                value={body}
                onChange={(e) => {
                    edit(e.target.value);
                }}
            />
        </div>
    );
};
