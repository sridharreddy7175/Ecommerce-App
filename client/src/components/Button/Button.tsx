import React, { FC, ReactNode, MouseEvent } from "react";

// import { Box, Button as ThemeUibutton } from 'theme-ui';

export interface ButtonProps {
    onClick?: (e: MouseEvent<ReactNode>) => void;
    buttonName: any;
    buttonStyles: any;
    // disabled?: boolean;
    sx?: any;
}

const Button = (props: ButtonProps) => {
    return (
        <>
            <button
                style={props.buttonStyles}
                onClick={props.onClick}

                className="w-100 p-2 text-white"
            >
                {props.buttonName}
            </button>
        </>
    );
};

export default Button;
