import ChatRequest from "@/Interfaces/chat-request"
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


export const manageRequest = async ({requestId, accepted} : {requestId: number, accepted: boolean}) => {
    try{
        const response = await httpPost<ChatRequest>(`/chat/manageRequest/${requestId}`, {requestClientResponse: accepted})
        return response;
    }catch(error){
        console.error(error)
    }
}
