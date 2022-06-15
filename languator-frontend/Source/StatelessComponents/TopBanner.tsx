import * as React from 'react';

interface TopBannerProps{
    applicationName : string;
    userID : string;
    score : number;
    countLiveUsers : number;
}


function TopBanner(props : TopBannerProps) : JSX.Element{

    let applicationName : string = props.applicationName;

    return (
        <div id="top-banner"> 
            <p id="application-name">{applicationName}</p>
            <p id="live-info">
                <p id="user-id">User ID: {props.userID}</p>
                <p id="score">Score: {props.score}</p>
                <p id="count-live-users">Live Users: {props.countLiveUsers}</p>
            </p>
        </div>
    )

}

export {TopBanner, TopBannerProps};
