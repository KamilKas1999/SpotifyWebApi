export class User {
  constructor(
    private _access_token: string,
    public _token_type: string,
    public _scope: string,
    public _expires_in: number,
    public _refresh_token: string
  ) {}
  public get access_token() {
    return this._access_token;
  }
  public get token_type() {
    return this._token_type;
  }
  public get scope() {
    return this._scope;
  }
  public get expires_in() {
    return this._expires_in;
  }
  public get refresh_token() {
    return this._refresh_token;
  }
}
