import { CornerDownLeft, Mic, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const MessageInput = () => {
  return (
    <TooltipProvider>
      <div className="h-full overflow-hidden rounded-lg flex flex-col border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Escreva sua mensagem aqui..."
          className="h-[65%] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex flex-1 items-end p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Enviar arquivo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Enviar arquivo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Enviar arquivo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Usar microfone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Enviar mensagem
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MessageInput;
