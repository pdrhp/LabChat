import User from "./user";

interface ChatRequest {
    type: "request"
    id: number;
    accepted: boolean;
    rejected: boolean;
    requesterId: string;
    requester: User;
    requestedId: string;
    requested: User;
    timestamp: string;
}

export default ChatRequest;