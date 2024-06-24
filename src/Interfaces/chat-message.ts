
interface ChatMessage {
    id: number;
    senderId: string;
    receiverId: string;
    message: string;
    chatRequestId: number;
    timestamp: string;
    confirmation: boolean;
}

export default ChatMessage;