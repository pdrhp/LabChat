import { httpClient } from "@/api/Client"


export const updateProfilePicture = async ({userId, file}: {userId: string, file: File}) => {
    const formData = new FormData()

    formData.append('file', file)

    const response = await httpClient.post(`/user/${userId}/updateProfilePicture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    
    console.log(response);
    
    return response.data.data;
}

export const getProfilePictureById = async (userId: string) => {
    const response = await httpClient.get(`/user/${userId}/profilePicture`);
    return response.data.data;
}