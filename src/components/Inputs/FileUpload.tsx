import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

interface FileUploadProps {
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Type for the file upload handler
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
    return (
        <label htmlFor="file-upload" className="cursor-pointer">
            <IconPaperclip size={21} />
            <input 
                id="file-upload" 
                type="file" 
                onChange={handleFileUpload} 
                className="hidden" 
            />
        </label>
    );
};

export default FileUpload;
