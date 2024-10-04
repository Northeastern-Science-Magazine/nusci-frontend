import React from 'react';

export default function Text({ 
  text = "",
  italic = false, 
  bold = false, 
  underline = false, 
  size = 'text-base', // uses tailwind utility class to set 1rem
  color = 'text-black', 
}) { 
    const classNames = 
    (italic? 'italic ' : '') + 
    (bold? 'font-bold ' : '') + 
    (underline? 'underline ' : '') + 
    size + ' ' + 
    color;

  return <p className={classNames}>{text}</p>;
}
