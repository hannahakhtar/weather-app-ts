import React from "react";

type Props = {
    buttonText: string,
    type?: "button" | "submit" | "reset",
    placeholder: string,
    className: string
}

const Button: React.FC<Props> = ({ className, type, placeholder, buttonText }) => {

    return <>
        <button className={className} type={type} placeholder={placeholder}>{buttonText}</button>
    </>
}

export default Button

// https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm
// https://dev.to/franciscomendes10866/passing-props-to-child-components-in-react-using-typescript-2690
// https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets
