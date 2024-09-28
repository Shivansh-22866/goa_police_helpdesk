import React from 'react';

interface IconButtonProps {
    Icon: React.ComponentType<{ size: number }>; // Type for the Icon component
    onClick: () => void; // Type for the onClick function
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, onClick }) => (
    <span className='cursor-pointer flex items-center space-x-2' onClick={onClick}>
        <Icon size={22} />
    </span>
);

export default IconButton;
