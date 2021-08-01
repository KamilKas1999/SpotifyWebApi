export class User {
  constructor(
    private _access_token: string,
    public token_type: string,
    public scope: string,
    public expires_in: number,
    public refresh_token: string
  ) {}
  public get token() {
    return this._access_token;
  }
}
