import React, { useState } from "react";
import { IconLink } from "@tabler/icons-react";

interface LinkPasteProps {
    handleLinkPaste: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkPaste: React.FC<LinkPasteProps> = ({ handleLinkPaste }) => {
    const [link, setLink] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
        handleLinkPaste(e); // Call the function to fetch content
    };

    return (
        <div className="flex items-center">
            <IconLink size={21} />
            <input
                type="text"
                placeholder="Paste your link here"
                className="ml-2 p-1 rounded border"
                value={link}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default LinkPaste;
