import { useAuth } from "@/context/auth-context";
import { useChat } from "@/context/chat-context";
import {
  Laugh,
  LogOut,
  MessageSquare,
  ShieldEllipsis,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SideBar = () => {
  const navigate = useNavigate();
  const { logout, userSession } = useAuth();
  const { disconnectSocket } = useChat();

  const handleLogOut = () => {
    logout();
    disconnectSocket();
  };

  console.log(userSession);

  return (
    <aside className="h-full border-r w-[9%] sm:w-[8%] md:w-[6%] lg:w-[5%] xl:w-[4%] 2xl:w-[3%] transition-all  flex flex-col items-center">
      <div className="border-b p-2">
        <Button variant={"outline"} size={"icon"} aria-label="Home">
          <Laugh className="size-5" />
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2 justify-between h-full">
        <div className="flex flex-col gap-2">
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
          {userSession.role.includes("Admin") && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-lg"
                  size={"icon"}
                  aria-label="Chat"
                >
                  <ShieldEllipsis className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Godmode
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className="rounded-lg"
                size={"icon"}
                aria-label="Chat"
                onClick={() => handleLogOut()}
              >
                <LogOut className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Log out
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
