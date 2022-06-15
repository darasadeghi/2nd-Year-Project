import HelperMethods from "../../../Setup/HelperMethods";
import LeaderBoardRecord from "../../Models/LeaderboardRecord";
import IUserDataAccess from "../Interfaces/IUserDataAccess";

class MockUserDataAccess implements IUserDataAccess{

    private _methodToCallOnUserCountUpdate : (userCount : number) => void;
    private _methodToCallOnLeaderBoardUpdate : (records : Array<LeaderBoardRecord>) => void;
    private _methodToCallOnUserScoreUpdate : (userScore : number) => void;
    private _countLiveUsers : number;
    private _userID : string;
    private _leaderboardRecords : Array<LeaderBoardRecord>;


    // TODO: perhaps the function references shouldn't be passed into here, instead the client calls functions to establish the calls back
    // hmm, that would be cleaner as the interface would then specify these functions - so implementations of the interface
    // would have a better idea of what service it needs to provide to the client (establishing callbacks is important)
    public constructor(methodToCallOnUserCountUpdate : (userCount : number) => void, methodToCallOnLeaderBoardUpdate : (records : Array<LeaderBoardRecord>) => void, methodToCallOnUserScoreUpdate : (userScore : number) => void){
        this._methodToCallOnUserCountUpdate = methodToCallOnUserCountUpdate;
        this._methodToCallOnLeaderBoardUpdate = methodToCallOnLeaderBoardUpdate;
        this._methodToCallOnUserScoreUpdate = methodToCallOnUserScoreUpdate;
        this._userID = HelperMethods.GenerateRandomId(4);
        this._countLiveUsers = 4;
        this._leaderboardRecords = new Array<LeaderBoardRecord>();
        let currentUserRecord : LeaderBoardRecord = new LeaderBoardRecord(this._userID, 0);
        this._leaderboardRecords.push(currentUserRecord);
        HelperMethods.AddRecordsToLeaderBoardRecords(this._leaderboardRecords, this._countLiveUsers - 1);
        this.setupIntervals();
    }

    private setupIntervals(){
        setInterval( () => {
            this._countLiveUsers ++;
            this._methodToCallOnUserCountUpdate(this._countLiveUsers);
            HelperMethods.AddRecordsToLeaderBoardRecords(this._leaderboardRecords, 1);
            this._methodToCallOnLeaderBoardUpdate(HelperMethods.CloneLeaderBoardRecords(this._leaderboardRecords))
        }, 5000);
    }

    public getLiveUserCount() : number{
        return this._countLiveUsers;
    }
    public getUserID() : string{
        return this._userID;
    }
    public getScore() : number{
        return this._leaderboardRecords[0].getScore();
    }

    public getLeaderBoardRecords() : Array<LeaderBoardRecord>{
        return HelperMethods.CloneLeaderBoardRecords(this._leaderboardRecords);
    }

    public incrementScore() : void{
        // when the user's score updates, we need to update hte client's user score and leaderboard records
        this._methodToCallOnUserScoreUpdate(this._leaderboardRecords[0].getScore() + 1);
        this._leaderboardRecords[0].setScore(this._leaderboardRecords[0].getScore() + 1);
        this._methodToCallOnLeaderBoardUpdate(HelperMethods.CloneLeaderBoardRecords(this._leaderboardRecords));
    }
}

export default MockUserDataAccess;