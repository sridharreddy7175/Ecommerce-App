import React from "react";
// import { Box, Label } from "theme-ui";


export interface LabelProps {
    name: any
}

const Labelbox = (props: LabelProps) => {
    return (
        <>
            <label htmlFor={props.name} className="mt-3 mb-2" style={{ fontWeight: 600 }}>
                {props.name}
            </label>
        </>
    );
};

export default Labelbox;
