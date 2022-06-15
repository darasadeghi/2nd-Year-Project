class LeaderBoardRecord{
    private _userID : string;
    private _score : number;

    public constructor(userID : string, score : number){
        this._userID = userID;
        this._score = score;
    }

    public getUserID() : string{
        return this._userID
    }

    public getScore() : number{
        return this._score;
    }

    public setScore(score : number) : void{
        this._score = score;
    }
}

export default LeaderBoardRecord;