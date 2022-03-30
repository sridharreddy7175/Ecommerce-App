import React from "react";
// import { Box, Input } from "theme-ui";

export interface InputProps {
    name: string;
    type: string;
    value: string;
    onChange: any;
    placeholder: string;
}

const InputBox = (props: InputProps) => {
    return (

        <>
            <input
                name={props.name}
                type={props.type}
                className="mb-3 w-100 p-2 mt-2"

                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            {/* <p style={{ color: "red" }}>{emailError}</p> */}
        </>
    );
};

export default InputBox;
