export class artistShort {
  private _name: string;
  private _id: string;
  public get name() {
    return this._name;
  }
  public get id() {
    return this._id;
  }
  public constructor(name: string, id: string) {
    this._name = name;
    this._id = id;
  }
}
