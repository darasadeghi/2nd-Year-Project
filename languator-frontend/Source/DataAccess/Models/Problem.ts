class Problem{
    private _language : string;
    private _textToTranslate : string;
    private _solution : string;

    public constructor(language : string, textToTranslate : string, solution : string){
        this._language = language;
        this._textToTranslate = textToTranslate;
        this._solution = solution;
    }

    public getLanguage() : string{
        return this._language;
    }

    public setLanguage(language : string) : void{
        this._language = language;
    }

    public getTextToTranslate() : string{
        return this._textToTranslate;
    }

    public setTextToTranslate(textToTranslate : string) : void{
        this._textToTranslate = textToTranslate;
    }

    public getSolution() : string{
        return this._solution;
    }

    public setSolution(solution : string) : void{
        this._solution = solution;
    }

}


export default Problem;