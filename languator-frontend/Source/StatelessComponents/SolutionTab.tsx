import * as React from 'react';

interface SolutionTabProps{
    solution : string;
}


function SolutionTab(props : SolutionTabProps) : JSX.Element{


    return (
        <div id="solution-tab">
            <br/>
            <p id="solution">{props.solution}</p>
        </div>
    )

}

export {SolutionTab, SolutionTabProps};
