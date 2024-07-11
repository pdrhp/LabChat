import AddChatActionDropdown from "@/components/add-chat-action-dropdown";
import ChatContainer from "@/components/chat-container";
import ConversationCard from "@/components/conversation-card";
import ConversationRequestDialog from "@/components/conversation-request-dialog";
import SearchUsersDialog from "@/components/search-users-dialog";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/chat-context";
import { sendRequest } from "@/services/request.service";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ChatPage = () => {
  const [conversationRequestDialogOpen, setConversationRequestDialogOpen] =
    useState(false);
  const [dropdownMenuContextOpen, setDropdownMenuContextOpen] = useState<boolean>(false);
  const [searchUserDialogOpen, setSearchUserDialogOpen] = useState<boolean>(false);

  const {
    connectSignalR,
    addRequest,
    sideBarConversationItems,
    actualConversation,
  } = useChat();

  const conversationsOrdered = sideBarConversationItems.sort((a, b) => {
    const timeStampA = new Date(
      a.messages && a.messages.length > 0
        ? a.messages[a.messages.length - 1].timestamp
        : a.timestamp
    ).getTime();

    const timeStampB = new Date(
      b.messages && b.messages.length > 0
        ? b.messages[b.messages.length - 1].timestamp
        : b.timestamp
    ).getTime();

    return timeStampB - timeStampA;
  });

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
          {conversationsOrdered && (
            <>
              <AddChatActionDropdown searchUserAction={() => setSearchUserDialogOpen(true)} sendRequestAction={() => setConversationRequestDialogOpen(true)} open={dropdownMenuContextOpen} setOpen={setDropdownMenuContextOpen}>
                <Button
                  variant={"outline"}
                  className="w-full rounded-none"
                  size={"icon"}
                  aria-label="Chat"
                >
                  <Plus className="size-5 fill-foreground" />
                </Button>
              </AddChatActionDropdown>
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
      <ConversationRequestDialog externalOpen={conversationRequestDialogOpen && !dropdownMenuContextOpen} onOpenChange={setConversationRequestDialogOpen} sendRequest={sendRequestMutate} />
      <SearchUsersDialog open={searchUserDialogOpen && !dropdownMenuContextOpen} setOpen={setSearchUserDialogOpen}/>
    </main>
  );
};

export default ChatPage;
