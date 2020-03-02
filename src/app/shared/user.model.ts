export class User {
  constructor(
    public email: string,
    public password: string,
    private _token: string,
    private _tokenExpDate: Date
  ) {}

  get token() {
      if (!this._tokenExpDate || new Date()> this._tokenExpDate) {
        return null;
    } else {
        return this._token;
    }
  }
}
