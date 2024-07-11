import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type AddChatActionDropdownProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  sendRequestAction: () => void;
  searchUserAction: () => void;
};

const AddChatActionDropdown: React.FC<AddChatActionDropdownProps> = ({
  children,
  open,
  setOpen,
  sendRequestAction,
  searchUserAction,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              sendRequestAction();
            }}
          >
            Adicionar alguem pelo nome de usuário
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              searchUserAction();
            }}
          >
            Buscar na lista publica
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddChatActionDropdown;
