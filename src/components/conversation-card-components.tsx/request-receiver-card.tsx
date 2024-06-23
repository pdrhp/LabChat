import useQueryImage from "@/hooks/useQueryImage";
import { manageRequest } from "@/services/request.service";
import { useMutation } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type RequestReceiverCardProps = {
  requesterName: string;
  requesterNameInitials: string;
  formattedDate: string;
  formattedTime: string;
  requestId: number;
  requesterId: string;
};

const RequestReceiverCard: React.FC<RequestReceiverCardProps> = ({
  requesterName,
  requesterNameInitials,
  formattedDate,
  formattedTime,
  requestId,
  requesterId,
}) => {

    const {data} = useQueryImage(requesterId);
        

    const {mutate: manage} = useMutation({
      mutationFn: manageRequest,
      onSuccess: () => {
        console.log("Request managed successfully");
      },
      onError: () => {
        console.log("Error managing request");
      },
    })


  return (
    <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={data} />
          <AvatarFallback>{requesterNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2>{requesterName}</h2>
        <div className="w-full h-[50%]">
          <div className="w-full h-full flex gap-3">
            <Button onClick={() => manage({requestId: requestId, accepted: true})} variant="outline" className="h-full w-[40%]">
              <Check className="h-4 w-4" color="green" />
            </Button>
            <Button onClick={() => manage({requestId: requestId, accepted: false})} variant="outline" className="h-full w-[40%]">
              <X className="h-4 w-4" color="red" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs">{formattedDate}</p>
        <p className="text-xs">{formattedTime}</p>
      </div>
    </div>
  );
};

export default RequestReceiverCard;
