import MessageInput from "@/components/message-input";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ChatPage = () => {

    const { connectSignalR, socketConnection } = useAuth();


    useEffect(() => {
        connectSignalR();


    }, []);


  return (
    <main className="h-full w-full flex p-2">
        <aside className="w-[25%] h-full border rounded-l-lg flex flex-col">
            <div className="w-full h-[10%] border-b flex justify-center items-center">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Chat</h1>
            </div>
            <div className="flex-1 w-full flex flex-col">
                <div className="h-[15%] w-full flex flex-col justify-center items-center">
                    <p>Você não nenhuma conversa :(</p>
                    <p className="font-bold cursor-pointer hover:text-blue-200">+ Adicionar conversa</p>
                </div>
            </div>
        </aside>
        <div className="border border-l-0 w-full rounded-r-lg bg-zinc-900 flex flex-col p-1 gap-2">
            <div className="h-[78%]">

            </div>
            <div className=" flex-1">
                <MessageInput/>
            </div>
        </div>
    </main>
  )
}

export default ChatPage
