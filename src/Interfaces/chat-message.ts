
interface ChatMessage {
    id: number;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: string;
}

export default ChatMessage;