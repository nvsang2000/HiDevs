import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getToken = async () => {
  const cookieStore = cookies();
  return cookieStore.get("acc")?.value;
};

export const getCurrentUser = async () => {
  const token = await getToken();
  if (!token) return undefined;
  try {
    const { data } = await axios.get(`${baseURL}userapi/get_me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data?.data?.active) return undefined;
    return data?.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getDetailUser = async (id: string) => {
  const token = await getToken();
  if (!token) return undefined;
  try {
    const { data } = await axios.get(
      `${baseURL}userapi/get_user/${id}?extra=profile,password`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data?.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
