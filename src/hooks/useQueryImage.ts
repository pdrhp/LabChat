import { getProfilePictureById } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";


function useQueryImage(id: string) {
    const query = useQuery({
        queryKey: ["image", id],
        queryFn: () => getProfilePictureById(id)
    })

    return query;
}

export default useQueryImage;