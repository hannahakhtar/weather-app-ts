import React from "react";

type Props = {
    buttonText: string
    type?: "button" | "submit" | "reset",
    className: string,
    onClick?: React.MouseEventHandler
}

const Button: React.FC<Props> = ({ className, type, buttonText, onClick }) => {

    return <>
        <button className={className} type={type} onClick={onClick}>{buttonText}</button>
    </>
}

export default Button