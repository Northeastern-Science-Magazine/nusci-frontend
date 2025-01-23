import React from "react";

interface BoxProps {
    name? : string;
    backgroundColor? : string;
    width? : number
    margin? : number
    height? : number
    padding? : number
    children : React.ReactNode;
}

export default function Box({ name, backgroundColor, width, margin, height, padding, children }: BoxProps) {
return (
        <div className = {name || "box"}
        style = {{
            backgroundColor : backgroundColor || 'white',
            width : width || 50,
            margin : margin || 10,
            height : height || 100,
            padding : padding || 12

        }}
        > {children}
        </div>
);
}

