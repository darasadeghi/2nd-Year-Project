class Stack<T>{

    private _array : Array<T>;

    public constructor(){
        this._array = new Array<T>();
    }

    public Push(item : T) : void{
        this._array.push(item);
    }

    public Pop() : T{
        return this._array.pop();
    }

    public IsEmpty() : boolean{
        return this._array.length === 0;
    }

}

export default Stack;