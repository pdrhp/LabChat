import { httpClient } from "@/api/Client"


export const updateProfilePicture = async ({userId, file}: {userId: string, file: File}) => {
    const formData = new FormData()

    formData.append('file', file)

    const response = await httpClient.post(`/user/${userId}/updateProfilePicture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    const url = URL.createObjectURL(new Blob([response.data]))

    return url;
}

export const getProfilePictureById = async (userId: string) => {
    const response = await httpClient.get(`/user/${userId}/profilePicture`, {
        responseType: 'blob'
    })

    const url = URL.createObjectURL(new Blob([response.data]))

    return url;
}