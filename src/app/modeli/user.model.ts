import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class User {
  constructor(
    private _userId: string,
    private _token: string,
    private expdate: Date,
    private refreshToken: string,
    private email: string,
    private registered?: string
  ) {}
  get token() {
    if (!this.expdate || new Date() > this.expdate) {
      return null;
    }

    console.log('RETURNIG TOKEN FROM USER MDOEL');
    return this._token;
  }
  get userId() {
    return this._userId;
  }
}
