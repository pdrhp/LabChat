import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserProfileForm from "@/components/user-profile-form";
import { useAuth } from "@/context/auth-context";
import { updateProfilePicture } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageBlob, setImageBlob] = useState<File | null>(null);
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  const { userSession, setProfilePicture } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(userSession?.profilePicture);

  const { mutate: updatePhoto, isPending } = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (imageUrl: string) => {
      setImageChanged(false);
      setProfilePicture(imageUrl);
    },
  });

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImageBlob(file);
    setImageChanged(true);
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePicture = () => {
    if (!imageBlob || !userSession) {
      toast.error("Erro ao salvar imagem");
      return;
    }

    updatePhoto({ userId: userSession.id, file: imageBlob });
  };

  return (
    <div className="h-full w-full justify-center items-center flex p-2 overflow-hidden">
      <div className="h-full w-[80%] border flex flex-col rounded-lg">
        <div className="h-[40%] flex flex-col justify-center items-center gap-5">
          <Avatar
            onClick={handleProfilePictureClick}
            className="w-[13vw] h-[13vw] cursor-pointer"
          >
            <AvatarImage
              src={profilePhoto}
              alt="User profile picture"
            />
            <AvatarFallback className=" hover:bg-zinc-700 transition-all text-[5vw]">
              PH
            </AvatarFallback>
          </Avatar>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <div className="w-full h-[5rem] gap-5 flex justify-center">
            {imageChanged && (
              <>
                <Button onClick={() => handleSavePicture()} variant={"outline"}>
                  {isPending ? <Loader className=" animate-spin" /> : "Salvar"}
                </Button>
                <Button variant={"destructive"}>Cancelar</Button>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h1 className="font-bold text-3xl">Minhas informações</h1>
          <div className="w-[50%] flex-1">
            <UserProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
