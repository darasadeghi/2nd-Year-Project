import LeaderBoardRecord from "../../Models/LeaderboardRecord";

interface IUserDataAccess{
    // way for the client to tell the server to increment its score (so it can then be broadcasted to all other clients)
    incrementScore() : void;
    // these methods are useful incase the clients wants a simple way of getting a 'snapshot' of the current state on the serverside
    getLiveUserCount() : number;
    getUserID() : string;
    getScore() : number;
    getLeaderBoardRecords() : Array<LeaderBoardRecord>
}

export default IUserDataAccess;