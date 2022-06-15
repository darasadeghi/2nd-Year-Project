import axios from "axios";
import HelperMethods from "../../../Setup/HelperMethods";
import Language from "../../Models/Language";
import Problem from "../../Models/Problem";
import ProblemApiResponse from "../../Models/ProblemApiResponse";
import IProblemDataAccess from "../Interfaces/IProblemDataAccess";

class BasicProblemDataAccess implements IProblemDataAccess{

    private _problemApiURL : string;

    public constructor(problemApiURL : string){
        this._problemApiURL = problemApiURL;
    }

    public async getNewProblem(language : Language) : Promise<Problem> {
        let jsonResponse  = await axios.get(`${this._problemApiURL}`,{headers: {"Access-Control-Allow-Origin": "*"}});
        let englishText : string = jsonResponse.data[0].english;
        let frenchText : string = jsonResponse.data[0].french;
        let spanishText : string = jsonResponse.data[0].spanish;
        let problem : Problem;
        if(language == Language.French){
            problem = new Problem("French", frenchText, englishText);
        }
        else{
            problem = new Problem("Spanish", spanishText, englishText);
        }
        console.log(problem);
        return problem;
    }
}

export default BasicProblemDataAccess;