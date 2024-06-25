import { Plus } from "lucide-react";
import ConversationRequestDialog from "./conversation-request-dialog";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type SendRequestButtonProps = {
  sendRequest: (email: string) => void;
};

const SendRequestButton: React.FC<SendRequestButtonProps> = ({
  sendRequest,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ConversationRequestDialog sendRequest={sendRequest}>
          <Button
            variant={"outline"}
            className="w-full rounded-none"
            size={"icon"}
            aria-label="Chat"
          >
            <Plus className="size-5 fill-foreground" />
          </Button>
        </ConversationRequestDialog>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        Enviar uma solicitação
      </TooltipContent>
    </Tooltip>
  );
};

export default SendRequestButton;
