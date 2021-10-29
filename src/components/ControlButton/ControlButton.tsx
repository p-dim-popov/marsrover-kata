import React from "react";

export interface IControlButtonProps {
    children: string;
    onClick?: Function;
}

const ControlButton: React.FC<IControlButtonProps> = ({ children, onClick }) => (
    <button className="bg-gray-300 text-black rounded m-2" onClick={(_) => onClick?.()}>{children}</button>
);

export default ControlButton;