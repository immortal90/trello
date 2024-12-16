import React from "react";

interface IButton {
    children: React.ReactNode,
    onClick: () => void,
    className?: string
}