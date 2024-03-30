export interface ISession {
  username: string;
  token: string;
  tokenType: string;
  expiration: string;
  role: string;
  ext: boolean;
}
