import ConversationRequestDialog from "./conversation-request-dialog";
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
          
        </ConversationRequestDialog>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        Enviar uma solicitação
      </TooltipContent>
    </Tooltip>
  );
};

export default SendRequestButton;
