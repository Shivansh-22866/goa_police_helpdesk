import React from "react";
import { IconLanguage } from "@tabler/icons-react";

interface LanguageSelectorProps {
    selectedLanguage: string; // Type for the currently selected language
    setSelectedLanguage: (language: string) => void; // Type for the setter function
    languages: string[]; // Type for the list of languages
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    selectedLanguage,
    setSelectedLanguage,
    languages
}) => (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
        <IconLanguage size={20} />
        <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-black flex flex-row rounded-full py-1 text-white"
        >
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    </span>
);

export default LanguageSelector;
