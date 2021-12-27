export class TrackShort{
    private _name: string;
    private _id: string;

    public get id(){
      return this._id;
    }

    public get name(){
      return this._name;
    }

    public constructor(name: string, id: string) {
        this._name = name;
        this._id = id;
      }
}