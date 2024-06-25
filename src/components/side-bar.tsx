import { Laugh, MessageSquare, ShieldEllipsis, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "./ui/tooltip";

const SideBar = () => {

  const navigate = useNavigate();
  
  return (
      <aside className="h-full border-r w-[9%] sm:w-[8%] md:w-[6%] lg:w-[5%] xl:w-[4%] 2xl:w-[3%] transition-all  flex flex-col items-center">
        <div className="border-b p-2">
          <Button variant={"outline"} size={"icon"} aria-label="Home">
            <Laugh className="size-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2 justify-between h-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigate("/chat")}
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
                  onClick={() => navigate("/profile")}
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
  );
};

export default SideBar;
