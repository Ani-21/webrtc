export interface IMessage {
  id: string;
  name: string;
  userId: string;
  timestamp: string;
  message: string;
}
export interface IUser {
  name: string;
  userId: string;
  token: string;
}
export interface IData {
  messages: IMessage[];
  userData: IUser;
  token: string;
  error?: string;
}
