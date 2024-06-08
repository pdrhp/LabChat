import User from "./user";

interface ChatConversation {
    type: "conversation"
    requesterId: string;
    requester: User;
    requestedId: string;
    requested: User;
    timestamp: string;
}

export default ChatConversation;