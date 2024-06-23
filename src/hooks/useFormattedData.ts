import ChatMessage from "@/Interfaces/chat-message";
import ChatItem from "@/types/chat-item";
import { useEffect, useState } from "react";

type UseFormattedDataReturn = {
  requesterNameInitials: string;
  requestedNameInitials: string;
  formattedDate: string;
  formattedTime: string;
  lastMessage?: ChatMessage;
};

const useFormattedData = (cardData: ChatItem): UseFormattedDataReturn => {
  const [requesterNameInitials, setRequesterNameInitials] = useState<string>("");
  const [requestedNameInitials, setRequestedNameInitials] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<ChatMessage | undefined>();

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

    const lastMessage = cardData.messages && cardData.messages.length > 0 ? cardData.messages[cardData.messages.length - 1] : undefined;
    setLastMessage(lastMessage);
  }, [cardData]);

    return { requesterNameInitials ,requestedNameInitials, formattedDate, formattedTime, lastMessage};
};

export default useFormattedData;
