import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


type ConversationRequestDialogProps = {
    children?: React.ReactNode;
    sendRequest: (username: string) => void;
    externalOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const usernameSchema = z.string().min(5);

const ConversationRequestDialog: React.FC<ConversationRequestDialogProps> = ({children, sendRequest, externalOpen, onOpenChange}) => {

  console.log("externalOpen", externalOpen);


    const {userSession} = useAuth();
    const [username, setUsername] = useState<string>("");
    const [validationError, setValidationError] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const validateEmail = (username: string) => {
        const result = usernameSchema.safeParse(username);

        if (result.success){
            setValidationError(false);
        } else {
            setValidationError(true);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        validateEmail(e.target.value);
    }

    const handleSendRequest = () => {
      if(validationError) {
        toast.error("Usuário invalido, deve ter no minimo 5 caracteres");
        return;
      }

      if(username === userSession?.username){
        toast.error("Você não pode iniciar uma conversa com você mesmo");
        return;
      }

      sendRequest(username);
    }

  return (
    <Dialog open={externalOpen ? externalOpen : open} onOpenChange={externalOpen ? onOpenChange : setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar uma conversa</DialogTitle>
          <DialogDescription>
            Insira o e-mail da pessoa que você gostaria de conversar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Username
            </Label>
            <Input id="email" value={username} onChange={(e) => handleEmailChange(e)} className={`col-span-3 ${validationError ? 'border-red-500' : ''}`} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => handleSendRequest()}>Solicitar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationRequestDialog;
