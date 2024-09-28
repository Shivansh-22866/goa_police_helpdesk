import React from "react";
import { IconLink } from "@tabler/icons-react";

interface LinkPasteProps {
    handleLinkPaste: (event: React.ChangeEvent<HTMLInputElement>) => void; // Type for the link paste handler
}

const LinkPaste: React.FC<LinkPasteProps> = ({ handleLinkPaste }) => (
    <label htmlFor="link-input" className="cursor-pointer">
        <IconLink size={21} />
        <input
            type="text"
            id="link-input"
            className="hidden"
            onChange={handleLinkPaste}
        />
    </label>
);

export default LinkPaste;
