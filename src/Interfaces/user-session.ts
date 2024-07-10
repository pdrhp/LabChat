export interface UserSession {
    $id: string;
    id: string;
    username: string;
    nome: string;
    email: string;
    timeStamp: string;
    role: {$id: string, $values: string[]};
    token: string;
    profilePicture: string;
}