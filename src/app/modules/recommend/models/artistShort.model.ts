export class ArtistShort {
  private _name: string;
  private _id: string;
  private type = "ARTIST";
  public get name() {
    return this._name;
  }
  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this._name = name;
  }
  public set id(id: string) {
    this._id = id;
  }
  public constructor(name: string, id: string) {
    this._name = name;
    this._id = id;
  }
}
