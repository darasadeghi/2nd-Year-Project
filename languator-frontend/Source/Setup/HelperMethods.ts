import LeaderBoardRecord from "../DataAccess/Models/LeaderboardRecord";

class HelperMethods{

    public static NotifyUser(message : string, secondsToDisplay : number){
        let notificationDiv : HTMLElement = document.getElementById("notification")
        notificationDiv.innerHTML = message;
        notificationDiv.className = notificationDiv.className.replace("notify", 'hidden' )
        setTimeout(() => notificationDiv.className = "notify", secondsToDisplay * 100);  
    }


    private static Swap(indexOne : number, indexTwo : number, array : Array<Object>){
        let temp : Object = array[indexOne];
        array[indexOne] = array[indexTwo];
        array[indexTwo] = temp;
    }

    private static SortPivotAndGetPivotIndex(startIndex : number, endIndex : number, array : Array<LeaderBoardRecord>) : number{
        let valueToSort = array[endIndex].getScore();
        let firstLetterOfValueToSort = array[endIndex].getUserID()[0];
        let rightMostIndexToLeftOfPivot : number = startIndex-1;

        for(let i : number = startIndex; i < endIndex; i++){
            let isPutValueToLeftOfPivot : boolean = array[i].getScore() == valueToSort ? array[i].getUserID()[0] > firstLetterOfValueToSort : array[i].getScore() > valueToSort;
            // if same score, sort by first letter (reducing chance of state jittering (sort by more letters if you want it to be less likely))
            if(isPutValueToLeftOfPivot){
                rightMostIndexToLeftOfPivot++;
                this.Swap(i, rightMostIndexToLeftOfPivot, array);
            }
        }

        rightMostIndexToLeftOfPivot++;
        this.Swap(rightMostIndexToLeftOfPivot, endIndex, array);
        return rightMostIndexToLeftOfPivot++;
    }

    // quicksort
    public static SortLeaderboardRecordsByScore(startIndex : number, endIndex : number, records : Array<LeaderBoardRecord>) : void{
        if(startIndex >= endIndex) return;
        let sortedPivotIndex : number = this.SortPivotAndGetPivotIndex(startIndex, endIndex, records);
        this.SortLeaderboardRecordsByScore(startIndex, sortedPivotIndex-1, records)
        this.SortLeaderboardRecordsByScore(sortedPivotIndex+1, endIndex, records)
    }


    public static FilterString(unfilteredString : string) : string {

        let filteredString : string = "";
        let charactersToFilter : Array<string> = new Array<string>();
        charactersToFilter.push("/");
        charactersToFilter.push("\\");
        charactersToFilter.push("#");
        // charactersToFilter.push(" ");

        let isLastCharacterSpace : boolean = false;

        for(let i = 0; i < unfilteredString.length; i++){
            let currentCharInUnfilteredString : string = unfilteredString[i];
            if(isLastCharacterSpace && (currentCharInUnfilteredString === " ")){
                isLastCharacterSpace = true;
                continue;
            }
            currentCharInUnfilteredString === " " ? isLastCharacterSpace = true : isLastCharacterSpace = false;
            let indexInArr : number = charactersToFilter.findIndex(charToFilterFor => charToFilterFor == currentCharInUnfilteredString);
            if(indexInArr === -1){
                filteredString += currentCharInUnfilteredString;
            }
        }
        return filteredString;
    }

    public static GenerateRandomId(lengthOfIdToGenerate : number) : string{
        let generatedId : string;
        let randomCharacters : Array<string> = new Array<string>();
        for(let i = 0; i < lengthOfIdToGenerate; i++){ 
            let generatedAsciiNumber : number;
            let stringMappedFromAsciiNumber : string;
            generatedAsciiNumber = 97 + (Math.random() * 25); // so we get a number between 97-122 (a-z)
            stringMappedFromAsciiNumber = String.fromCharCode(generatedAsciiNumber);
            randomCharacters.push(stringMappedFromAsciiNumber);
        }
        generatedId = randomCharacters.join("");
        return generatedId;
    }

    public static ArrayContainsElement(array : Array<Object>, element : Object) : boolean {
        for(let i = 0; i < array.length; i++){
            if(array[i] === element){
                return true;
            }
        }
        return false;
    }

    public static AddRecordsToLeaderBoardRecords(records : Array<LeaderBoardRecord>, recordsToAdd : number) : void{
        for(let i = 0; i < recordsToAdd; i++){
            let scoreToGiveRecord = records.length > 0 ? records[records.length-1].getScore() + 1 : 5;
            let record = new LeaderBoardRecord(HelperMethods.GenerateRandomId(4), scoreToGiveRecord);
            records.push(record);
        }
    }

    // useful if you dont want to give client the reference to the underlying object
    public static CloneLeaderBoardRecords(records : Array<LeaderBoardRecord>) :  Array<LeaderBoardRecord>{
        let clonedRecords : Array<LeaderBoardRecord> = new Array<LeaderBoardRecord>();
        for(let i = 0; i < records.length; i++){
            let record : LeaderBoardRecord = new LeaderBoardRecord(records[i].getUserID(),records[i].getScore());
            clonedRecords.push(record);
        }
        return clonedRecords;
    }

}


export default HelperMethods;