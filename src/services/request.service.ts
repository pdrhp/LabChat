import ChatRequest from "@/Interfaces/ChatRequest"
import { httpPost } from "@/api/Client"

export const sendRequest = async (email: string) => {
    try {
        const response = await httpPost<ChatRequest>('/chat/sendRequest', {email})
        return response
    }
    catch (error) {
        console.error(error)
    }
}