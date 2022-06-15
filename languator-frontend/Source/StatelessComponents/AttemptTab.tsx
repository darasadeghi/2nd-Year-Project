import * as React from 'react';

interface AttemptTabProps{
    text : string;
    methodToCallOnChangeText : (event : React.ChangeEvent<HTMLTextAreaElement>) => void   
}


function AttemptTab(props : AttemptTabProps) : JSX.Element{


    return (
        <div id="attempt-tab">
            <br/>
            <textarea id="attempt-tab-text-area" autoFocus={true} autoComplete="off" value={props.text} onChange={props.methodToCallOnChangeText}></textarea>
        </div>
    )

}

export {AttemptTab, AttemptTabProps};
