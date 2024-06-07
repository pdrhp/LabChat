import User from "@/Interfaces/User";

export default class ChatRequest {
    public accepted: boolean;
    public rejected: boolean;
    public requesterId: string;
    public requester: User;
    public requestedId: string;
    public requested: User;
    public timestamp: string;

    constructor(
        accepted: boolean,
        rejected: boolean,
        requesterId: string,
        requester: User,
        requestedId: string,
        requested: User,
        timestamp: string
    ) {
        this.accepted = accepted;
        this.rejected = rejected;
        this.requesterId = requesterId;
        this.requester = requester;
        this.requestedId = requestedId;
        this.requested = requested;
        this.timestamp = timestamp;
    }
}