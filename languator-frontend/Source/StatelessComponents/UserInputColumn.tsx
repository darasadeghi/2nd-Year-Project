import * as React from 'react';

interface UserInputColumnProps{
    text : string;
    methodToCallOnChangeText : (event : React.ChangeEvent<HTMLTextAreaElement>) => void   
}


function UserInputColumn(props : UserInputColumnProps) : JSX.Element{

    return (
        <div id="user-input-column"> 
            <textarea id="user-input-text-area" autoFocus={true} autoComplete="off" value={props.text} onChange={props.methodToCallOnChangeText}></textarea>
        </div>
    )

}

export {UserInputColumn, UserInputColumnProps};
