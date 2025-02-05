import React from "react";

interface BoxProps {
    backgroundColor? : string;
    width? : string; 
    margin? : string;
    height? : string;
    padding? : string;
    children? : React.ReactNode;
}

export default function Box({ backgroundColor = "bg-white", width = "w-12", margin = "m-4", height = "h-24", padding = "p-6", children }: BoxProps) {
return (
        <div className = {`${backgroundColor} ${width} ${height} ${margin} ${padding}`} > 
        {children}
        </div>
);
}

