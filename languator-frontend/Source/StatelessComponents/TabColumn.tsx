import * as React from 'react';
import Tab from '../DataAccess/Models/Tab';

interface TabColumnProps{
    selectedTab : Tab;
    methodToCallOnClickOnTab : (tab : Tab) => void; 
    tabContents : JSX.Element
}


function TabColumn(props : TabColumnProps) : JSX.Element{


    return (
        <div id="tab-column"> 
            <div id="tab-index">
                <p onClick={() => props.methodToCallOnClickOnTab(Tab.Problem)} id="problem-tab" className={props.selectedTab == Tab.Problem ? "selected-tab" : ""}>Problem</p>
                <p onClick={() => props.methodToCallOnClickOnTab(Tab.Solution)} id="solution-tab" className={props.selectedTab == Tab.Solution ? "selected-tab" : ""} style={{borderLeft: "1px solid white", borderRight: "1px solid white"}}>Solution</p>
                <p onClick={() => props.methodToCallOnClickOnTab(Tab.Leaderboard)} id="leaderboard-tab" className={props.selectedTab == Tab.Leaderboard ? "selected-tab" : ""}>Leaderboard</p>
                <p onClick={() => props.methodToCallOnClickOnTab(Tab.Attempt)} id="attempt-tab" className={props.selectedTab == Tab.Attempt ? "selected-tab" : ""} style={{borderLeft: "1px solid white"}}>Attempt</p>
            </div>
            <div id="tab-content">
                {props.tabContents}
            </div>
        </div>
    )

}

export {TabColumn, TabColumnProps};
