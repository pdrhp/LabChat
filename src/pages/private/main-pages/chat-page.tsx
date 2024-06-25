import ChatContainer from "@/components/chat-container";
import ConversationCard from "@/components/conversation-card";
import SendRequestButton from "@/components/send-request-button";
import { useChat } from "@/context/chat-context";
import { sendRequest } from "@/services/request.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const ChatPage = () => {
  const {
    connectSignalR,
    addRequest,
    sideBarConversationItems,
    actualConversation,
  } = useChat();

  const { mutate: sendRequestMutate } = useMutation({
    mutationFn: sendRequest,
    onSuccess: (requestResponse) => {
      if (requestResponse) {
        const request = requestResponse.data;
        request.type = "request";
        addRequest(request);

        toast.success("Solicitação enviada com sucesso", {
          position: "top-right",
        });
      }
    },
    onError: () => {
      toast.error("Erro ao enviar solicitação", {
        position: "top-right",
      });
    },
  });

  useEffect(() => {
    connectSignalR();
  }, []);

  return (
    <main className="h-full w-full flex p-2">
      <aside className="w-[50%] md:w-[40%] lg:w-[26%] xl:w-[22%] 2xl:w-[20%] h-full border rounded-l-lg flex flex-col">
        <div className="w-full h-[10%] border-b flex justify-center items-center">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Chat
          </h1>
        </div>
        <div className="flex-1 w-full flex flex-col">
          {sideBarConversationItems && (
            <>
              <SendRequestButton sendRequest={sendRequestMutate} />
              {sideBarConversationItems.map((item, index) => (
                <ConversationCard cardData={item} key={index} />
              ))}
            </>
          )}
        </div>
      </aside>
      <div className="border border-l-0 w-full rounded-r-lg bg-zinc-900 flex flex-col p-1 gap-2">
        {actualConversation ? (
          <ChatContainer />
        ) : (
          <div className="h-full"></div>
        )}
      </div>
    </main>
  );
};

export default ChatPage;
