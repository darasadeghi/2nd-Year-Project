import Language from "../../Models/Language";
import Problem from "../../Models/Problem";

interface IProblemDataAccess{
    getNewProblem(language : Language) : Promise<Problem>;
}

export default IProblemDataAccess;