import * as React from 'react';

interface ProblemTabProps{
    languageToTranslateFrom : string;
    textToTranslate : string;
}


function ProblemTab(props : ProblemTabProps) : JSX.Element{


    return (
        <div id="problem-tab">
            <br/>
            <p id="problem-title">Translate the following {props.languageToTranslateFrom} text to English:</p>
            <p id="text-to-translate">{props.textToTranslate}</p>
        </div>
    )

}

export {ProblemTab, ProblemTabProps};
