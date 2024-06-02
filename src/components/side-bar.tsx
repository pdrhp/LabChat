import { Laugh, MessageSquare, ShieldEllipsis, User } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

const SideBar = () => {
  return (
    <TooltipProvider>
      <aside className="h-full border-r w-[3%] flex flex-col items-center">
        <div className="border-b p-2">
          <Button variant={"outline"} size={"icon"} aria-label="Home">
            <Laugh className="size-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2 justify-between h-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className="rounded-lg"
                size={"icon"}
                aria-label="Chat"
              >
                <MessageSquare className="size-5 fill-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Chat
            </TooltipContent>
          </Tooltip>
          <div className="flex flex-col gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-lg"
                  size={"icon"}
                  aria-label="Chat"
                >
                  <ShieldEllipsis className="size-5 fill-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Godmode
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-lg"
                  size={"icon"}
                  aria-label="Chat"
                >
                  <User className="size-5 fill-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Meu usuário
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default SideBar;
