export interface UserSession {
    id: string;
    username: string;
    timeStamp: string;
    role: string[];
    token: string;
}