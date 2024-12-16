import './button.scss'
import React from 'react';
import {IButton} from "../../../../common/interfaces/IButton";


export const Button: React.FC<IButton> = ({children, onClick}) => {
    return (
        <button className="add-card-btn" onClick={onClick}>
            {children}
        </button>
    );
};