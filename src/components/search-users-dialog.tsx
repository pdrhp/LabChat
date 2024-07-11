import { useChat } from "@/context/chat-context";
import { sendRequest } from "@/services/request.service";
import { getAllUsers } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

type SearchUserDialogProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

const SearchUsersDialog: React.FC<SearchUserDialogProps> = ({
  open,
  setOpen,
}) => {
  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const {addRequest, sideBarConversationItems} = useChat();

  const [requestSendeds, setRequestSendeds] = useState<string[]>(sideBarConversationItems.map(item => item.requested.userName));

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
        setRequestSendeds([...requestSendeds, request.requested.userName]);
      }
    },
    onError: () => {
      toast.error("Erro ao enviar solicitação", {
        position: "top-right",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[75vw] px-10 h-[70vh] flex flex-col">
        <Input placeholder="Pesquisar usuários" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[10%] text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => sendRequestMutate(user.userName)}
                      variant="outline"
                      disabled={requestSendeds.includes(user.userName)}
                    >
                      {requestSendeds.includes(user.userName) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <DynamicPagination totalNumberItems={invoices.length} currentPage={actualPage} itemsPerPage={5} setCurrentPage={setActualPage} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default SearchUsersDialog;
