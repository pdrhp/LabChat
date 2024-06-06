import axios, { AxiosRequestConfig } from "axios";


interface Response<T> {
    flag: boolean;
    statusCode: number;
    message: string;
    data: T;
}


const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const httpGet = async <T>(url: string): Promise<Response<T>> => {
    return httpClient.get<Response<T>>(url).then((response) => response.data);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Response<T>> => {
    return httpClient.post<Response<T>>(url, data, config).then((response) => response.data);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Response<T>> => {
    return httpClient.put<Response<T>>(url, data, config).then((response) => response.data);
}

const httpDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> => {
    return httpClient.delete<Response<T>>(url, config).then((response) => response.data);
}

export { httpDelete, httpGet, httpPost, httpPut };

