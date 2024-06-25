import useQueryImage from "@/hooks/useQueryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


type RequestSenderCardProps = {
    requestedName: string;
    requestedNameInitials: string;
    formattedDate: string;
    formattedTime: string;
    requestedId: string;
    online?: boolean;
}

const RequestSenderCard:React.FC<RequestSenderCardProps>  = ({requestedName, requestedNameInitials, formattedDate, formattedTime, requestedId, online}) => {

  const {data} = useQueryImage(requestedId)

  return (
    <div className="p-1 w-full border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar className={`border ${online ? 'border-green-500' : 'border-red-500'}`}>
          <AvatarImage src={data} />
          <AvatarFallback>{requestedNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] p-1 flex flex-col justify-center">
        <h2 className="text-[0.5em] sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-lg ">
          {requestedName}
        </h2>
        <div className="w-full h-[100%]">
          <p className=" text-[0.5em] sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm   h-full w-full max-w-[14rem] font-bold text-orange-500">
            Aguardando resposta
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs">{formattedDate}</p>
        <p className="text-xs">{formattedTime}</p>
      </div>
    </div>
  );
};

export default RequestSenderCard;
