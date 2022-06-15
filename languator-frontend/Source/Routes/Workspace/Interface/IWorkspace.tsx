import LeaderBoardRecord from "../../../DataAccess/Models/LeaderboardRecord";
import Problem from "../../../DataAccess/Models/Problem";
import Tab from "../../../DataAccess/Models/Tab";

interface IWorkspace{
    componentWillMount : () => void;
    render : () => JSX.Element;
    componentDidMount : () => void;
    componentWillUnmount : () => void;
}

interface IWorkspaceProps{

}


interface IWorkspaceState{
    countLiveUsers : number;
    leaderBoardRecords : Array<LeaderBoardRecord>
    score : number;
    userID : string;
    problem : Problem;
    userInput : string;
    selectedTab : Tab;
    isRenderedSolutionTab : boolean;
    isClaimedPointForThisProblem : boolean;
}

export {IWorkspace, IWorkspaceState, IWorkspaceProps};