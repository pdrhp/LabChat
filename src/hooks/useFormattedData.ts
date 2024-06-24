import ChatItem from "@/types/chat-item";
import { useEffect, useState } from "react";

type UseFormattedDataReturn = {
  requesterNameInitials: string;
  requestedNameInitials: string;
  formattedDate: string;
  formattedTime: string;
};

const useFormattedData = (cardData: ChatItem): UseFormattedDataReturn => {
  const [requesterNameInitials, setRequesterNameInitials] = useState<string>("");
  const [requestedNameInitials, setRequestedNameInitials] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const requestedInitials = cardData.requested.nome
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase();
    setRequestedNameInitials(requestedInitials);

    const requesterInitials = cardData.requester.nome
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase();
    setRequesterNameInitials(requesterInitials);

    
    const date = new Date(cardData.timestamp);
    const dateStr = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setFormattedDate(dateStr);

    const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setFormattedTime(timeStr);
  }, [cardData]);

    return { requesterNameInitials ,requestedNameInitials, formattedDate, formattedTime};
};

export default useFormattedData;
