import * as React from 'react';
import Language from '../../../DataAccess/Models/Language';
import LeaderBoardRecord from '../../../DataAccess/Models/LeaderboardRecord';
import Problem from '../../../DataAccess/Models/Problem';
import Tab from '../../../DataAccess/Models/Tab';
import BasicProblemDataAccess from '../../../DataAccess/ServerCommunication/Implementations/BasicProblemDataAccess';
import MockProblemDataAccess from '../../../DataAccess/ServerCommunication/Implementations/MockProblemDataAccess';
import MockUserDataAccess from '../../../DataAccess/ServerCommunication/Implementations/MockUserDataAccess';
import IProblemDataAccess from '../../../DataAccess/ServerCommunication/Interfaces/IProblemDataAccess';
import IUserDataAccess from '../../../DataAccess/ServerCommunication/Interfaces/IUserDataAccess';
import HelperMethods from '../../../Setup/HelperMethods';
import { AttemptTab } from '../../../StatelessComponents/AttemptTab';
import { BottomBanner } from '../../../StatelessComponents/BottomBanner';
import { LeaderboardTab } from '../../../StatelessComponents/LeaderboardTab';
import { ProblemTab } from '../../../StatelessComponents/ProblemTab';
import { SolutionTab } from '../../../StatelessComponents/SolutionTab';
import { TabColumn} from '../../../StatelessComponents/TabColumn';
import { TopBanner } from '../../../StatelessComponents/TopBanner';
import { UserInputColumn } from '../../../StatelessComponents/UserInputColumn';
import { IWorkspaceProps, IWorkspaceState, IWorkspace } from '../Interface/IWorkspace';
import "./basic-workspace.css";

class BasicWorkspace extends React.Component<IWorkspaceProps, IWorkspaceState> implements IWorkspace{

    
    private _userCountUpdateHandler : (userCount : number) => void;
    private _leaderboardRecordsUpdateHandler : (records : Array<LeaderBoardRecord>) => void;
    private _userScoreUpdateHandler : (userScore : number) => void;
    private _onClickGetNewProblemButtonHandler : () => Promise<void>;
    private _onClickSubmitButtonHandler : () => void;
    private _onChangeTextInputHandler : (event : React.ChangeEvent<HTMLTextAreaElement>) => void;
    private _onClickOnTabHandler : (tab : Tab) => void;
    private _userDataAccess : IUserDataAccess;
    private _problemDataAccess : IProblemDataAccess;

    public constructor(props : IWorkspaceProps){
        super(props);
        this._userCountUpdateHandler = this.userCountUpdateHandler.bind(this);
        this._leaderboardRecordsUpdateHandler = this.leaderboardRecordsUpdateHandler.bind(this);
        this._userScoreUpdateHandler = this.userScoreUpdateHandler.bind(this);
        this._onClickGetNewProblemButtonHandler = this.onClickGetNewProblemButtonHandler.bind(this);
        this._onClickSubmitButtonHandler = this.onClickSubmitButtonHandler.bind(this);
        this._onChangeTextInputHandler = this.onChangeTextInputHandler.bind(this);
        this._onClickOnTabHandler = this.onClickOnTabHandler.bind(this);
        this._userDataAccess = new MockUserDataAccess(this._userCountUpdateHandler, this._leaderboardRecordsUpdateHandler, this._userScoreUpdateHandler);
        this._problemDataAccess = new BasicProblemDataAccess(process.env.PROBLEMS_API_ENDPOINT_URL);

        let liveUserCount : number = this._userDataAccess.getLiveUserCount();
        let leaderboardRecords : Array<LeaderBoardRecord> = this._userDataAccess.getLeaderBoardRecords();
        let userScore : number = this._userDataAccess.getScore(); // == 0
        let userID : string = this._userDataAccess.getUserID();

        this.state = {
            countLiveUsers : liveUserCount,
            leaderBoardRecords : leaderboardRecords,
            score : userScore,
            userID : userID,
            problem : new Problem("loading..","loading...","loading.."),
            userInput : "",
            selectedTab : Tab.Problem,
            isRenderedSolutionTab : false,
            isClaimedPointForThisProblem : false
        };

    }

    private userCountUpdateHandler(userCount : number) : void{
        this.setState({
        countLiveUsers : userCount
        });
    }

    private leaderboardRecordsUpdateHandler(records : Array<LeaderBoardRecord>) : void{
        this.setState({
            leaderBoardRecords : records
        });
    }

    private userScoreUpdateHandler(userScore : number) : void{
        this.setState({
            score: userScore
        })
    }

    private async onClickGetNewProblemButtonHandler(language : Language) : Promise<void>{
        let newProblem : Problem = await this._problemDataAccess.getNewProblem(language);
        this.setState({
            problem : newProblem,
            userInput : "",
            isRenderedSolutionTab : false,
            isClaimedPointForThisProblem : false,
            selectedTab : Tab.Problem
        });
    }

    private onClickSubmitButtonHandler() : void{
        let isCorrectInput : boolean = this.state.userInput == this.state.problem.getSolution();
        let isRenderedSolutionTab = this.state.isRenderedSolutionTab;
        let isAlreadyClaimedPointForThisProblem = this.state.isClaimedPointForThisProblem;
        if(isCorrectInput && !isRenderedSolutionTab && !isAlreadyClaimedPointForThisProblem){
            HelperMethods.NotifyUser("Submission accepted!!", 1);
            this._userDataAccess.incrementScore();
            this.setState({
                isClaimedPointForThisProblem : true
            });
        }
        else{
            if(isAlreadyClaimedPointForThisProblem){
                HelperMethods.NotifyUser("You've already claimed the point for this question!", 1);
            }
            else if(isRenderedSolutionTab){
                HelperMethods.NotifyUser("You've looked at the solution, so can't claim a point for this problem.", 1);
            }
            else if(!isCorrectInput){
                HelperMethods.NotifyUser("Wrong Answer", 1);
            }
        }
    }

    private onChangeTextInputHandler(event : React.ChangeEvent<HTMLTextAreaElement>) : void{
        this.setState({
            userInput : event.target.value
        })
    }

    private onClickOnTabHandler(tab : Tab) : void{
        this.setState({
            selectedTab : tab
        });
    }

    public componentWillMount() : void{

    }

    public render() : JSX.Element{

        let selectedTab : JSX.Element;
        if(this.state.selectedTab == Tab.Problem){
            selectedTab = <ProblemTab languageToTranslateFrom={this.state.problem.getLanguage()} textToTranslate={this.state.problem.getTextToTranslate()}/>
        }
        else if(this.state.selectedTab == Tab.Solution){
            if(!this.state.isRenderedSolutionTab){
                if(!this.state.isClaimedPointForThisProblem){
                    HelperMethods.NotifyUser("You will not be able to claim a point for this problem :(", 1);
                }
                this.setState({
                    isRenderedSolutionTab : true
                });
            }
            selectedTab = <SolutionTab solution={this.state.problem.getSolution()} />
        }
        else if(this.state.selectedTab == Tab.Leaderboard){
            selectedTab = <LeaderboardTab records={this.state.leaderBoardRecords} currentUserID={this.state.userID} currentUserScore={this.state.score} />
        }
        else{
            selectedTab = <AttemptTab text={this.state.userInput} methodToCallOnChangeText={this._onChangeTextInputHandler}/>
        }

        return(   
            <div id="basic-workspace">
                <TopBanner applicationName="Languator" userID={this.state.userID} score={this.state.score} countLiveUsers={this.state.countLiveUsers} />
                <div id="main-body">
                    <TabColumn selectedTab={this.state.selectedTab} methodToCallOnClickOnTab={this._onClickOnTabHandler} tabContents={selectedTab}/>
                    <UserInputColumn text={this.state.userInput} methodToCallOnChangeText={this._onChangeTextInputHandler} />
                </div>
                <BottomBanner  methodToCallOnClickGetNewProblem={this._onClickGetNewProblemButtonHandler} methodToCallOnClickSubmit={this._onClickSubmitButtonHandler}/>
            </div>
        );
    }

    public async componentDidMount() : Promise<void>{
        let problem : Problem = await this._problemDataAccess.getNewProblem(Language.French);
        this.setState({
            problem:problem
        });
    }

    public componentWillUnmount() : void{

    }

};

export default BasicWorkspace;
