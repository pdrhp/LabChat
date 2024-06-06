import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


type ConversationRequestDialogProps = {
    children: React.ReactNode;
}

const emailSchema = z.string().email();

const ConversationRequestDialog: React.FC<ConversationRequestDialogProps> = ({children}) => {

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const result = emailSchema.safeParse(email);

        if (result.success){
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    }

    const sendRequest = async () => {
        if (emailError){
            return;
        }

        


    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              E-mail
            </Label>
            <Input id="email" value={email} onChange={(e) => handleEmailChange(e)} className={`col-span-3 ${emailError ? 'border-red-500' : ''}`} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => sendRequest()}>Solicitar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationRequestDialog;
