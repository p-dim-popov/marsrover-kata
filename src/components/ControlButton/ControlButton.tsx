import React from "react";

export interface IControlButtonProps {
    children: string;
}

const ControlButton: React.FC<IControlButtonProps> = ({ children }) => (
    <button className="bg-gray-300 text-black rounded m-2">{children}</button>
);

export default ControlButton;