export interface UserSession {
    id: string;
    username: string;
    nome: string;
    email: string;
    timeStamp: string;
    role: string[];
    token: string;
    profilePicture: string;
}