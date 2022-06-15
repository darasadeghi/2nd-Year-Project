import HelperMethods from "../../../Setup/HelperMethods";
import Language from "../../Models/Language";
import Problem from "../../Models/Problem";
import IProblemDataAccess from "../Interfaces/IProblemDataAccess";

class MockProblemDataAccess implements IProblemDataAccess{

    private _countGetNewProblemRequests : number;
    private _problemOne : Problem;
    private _problemTwo : Problem;

    public constructor(){
        this._countGetNewProblemRequests = 0;
        this._problemOne = new Problem("french", "bonjour je suis james", "hello i am james");;
        this._problemTwo = new Problem("french", "je ne sais pas", "i do not know");
    }

    public async getNewProblem(language : Language) : Promise<Problem>{
        let chosenProblem : Problem = this._countGetNewProblemRequests % 2 ? this._problemOne : this._problemTwo;
        if(language == Language.English){
            chosenProblem.setLanguage("English");
        }
        else if(language == Language.French){
            chosenProblem.setLanguage("French");
        }
        else{
            chosenProblem.setLanguage("Spanish");
        }
        this._countGetNewProblemRequests++;
        return chosenProblem;
    }
}

export default MockProblemDataAccess;