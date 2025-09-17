import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIURLS } from "./APIURLS";
import { getTokenFromCookie } from '@/app/server/action';

const getBaseUrl = () => {
  return APIURLS.BASE_URL.endsWith('/') ? APIURLS.BASE_URL : `${APIURLS.BASE_URL}/`;
};

const createAxiosInstance = async (): Promise<AxiosInstance> => {
  const token = await getTokenFromCookie();
  const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access - token may be invalid');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const get = async (url: string) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getByParams = async (url: string, params: Record<string, any>) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.get(url, { params });
  return response.data;
};

export const post = async (url: string, body: object) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.post(url, body);
  return response.data;
};

export const postByParams = async (url: string, params: Record<string, any>) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.post(url, params, { params });
  return response.data;
};

export const update = async (url: string, body: object) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.put(url, body);
  return response.data;
};

export const updateByParams = async (
  url: string,
  params: Record<string, any>
) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.put(url, params, { params });
  return response.data;
};

export const postFormData = async (url: string, formData: FormData) => {
  const axiosInstance = await createAxiosInstance();
  
  const response = await axiosInstance.post(url, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data;
};
export const putFormData = async (url: string, formData: FormData) => {
  const axiosInstance = await createAxiosInstance();
 const response = await axiosInstance.put(url, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data;
};

export const deleteById = async (url: string, id: number) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.delete(url, {
    params: { id },
  });
  return response.data;
};

export const deleteRequest = async (url: string) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.delete(url);
  return response.data;
};