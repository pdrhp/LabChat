import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


type RequestSenderCardProps = {
    imageUrl: string | undefined;
    requestedName: string;
    requestedNameInitials: string;
    formattedDate: string;
    formattedTime: string;
}

const RequestSenderCard:React.FC<RequestSenderCardProps>  = ({imageUrl, requestedName, requestedNameInitials, formattedDate, formattedTime}) => {
  return (
    <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{requestedNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2 className="text-[0.5em] sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-lg ">
          {requestedName}
        </h2>
        <div className="w-full h-[30%]">
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
