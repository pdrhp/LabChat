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
import { useRef, useState } from "react";
import DotBounceIcon from "./dot-bounce-icon";

type MessageInputProps = {
  sendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({sendMessage}) => {
  const [messageInput, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);


  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true}).then(stream => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = e => {
        audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav"});
        const audioURL = URL.createObjectURL(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    }).catch(err => {
      console.error("Erro acessando o microfone" ,err);
    })
  };


  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }
  
  
  const handleSendMessage = (message: string) => {
    sendMessage(message);
    setMessage("");
  }
  
  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (messageInput.trim() !== "") {
        handleSendMessage(messageInput);
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="h-full overflow-hidden rounded-lg flex flex-col border bg-background">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          value={messageInput}
          onKeyDown={handlePressEnter}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escreva sua mensagem aqui..."
          className="h-[65%] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex flex-1 items-end p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled variant="ghost" size="icon">
                <Paperclip className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Enviar arquivo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled variant="ghost" size="icon" className={`transition-all ${recording && 'bg-red-500'}`}>
                {recording ? <DotBounceIcon /> : <Mic className="size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Usar microfone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className={`ml-auto gap-1.5`}>
            Enviar mensagem
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MessageInput;
