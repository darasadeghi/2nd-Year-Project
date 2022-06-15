class Queue<T>{

    private _array : Array<T>;

    public constructor(){
        this._array = new Array<T>();
    }

    public Enqueue(item : T) : void{
        this._array.push(item);
    }

    public Dequeue() : T{
        return this._array.shift();
    }

    public IsEmpty() : boolean{
        return this._array.length === 0;
    }

}

export default Queue;