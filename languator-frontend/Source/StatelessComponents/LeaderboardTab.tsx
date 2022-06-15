import * as React from 'react';
import LeaderBoardRecord from '../DataAccess/Models/LeaderboardRecord';
import HelperMethods from '../Setup/HelperMethods';

interface LeaderboardTabProps{
    records : Array<LeaderBoardRecord>
    currentUserID : string; // id of user on 'this' browser
    currentUserScore : number;
}


function LeaderboardTab(props : LeaderboardTabProps) : JSX.Element{

    HelperMethods.SortLeaderboardRecordsByScore(0,props.records.length-1,props.records);

    let rows : Array<JSX.Element> = new Array<JSX.Element>();
    for(let i = 0; i < props.records.length; i++){
        let userID : string = props.records[i].getUserID();
        let score : number = props.records[i].getScore();
        let row : JSX.Element = <tr key={userID} className={userID == props.currentUserID ? "table-active" : ""} ><th scope="row">{i+1}</th><td>{userID}</td><td>{score}</td></tr>
        rows.push(row);
    }

    return (
        <div id="leaderboard-tab">
            <br/>
            <p className="text-center font-weight-bold">Your User ID: {props.currentUserID}. Your Score: {props.currentUserScore}.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )

}

export {LeaderboardTab, LeaderboardTabProps};
