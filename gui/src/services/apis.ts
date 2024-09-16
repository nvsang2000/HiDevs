import axiosInstance from "@/utils/axios";
import queryString from "query-string";

//API AUTH
export const loginApi = (params: any) =>
  axiosInstance.post("/authapi/signin", params);
export const registerApi = (params: any) =>
  axiosInstance.post("/authapi/signup", params);

//API USER
export const getUsersApi = (payload?: any) =>
  axiosInstance.get(`/userapi/get_users?${queryString.stringify(payload)}`);
export const getMeApi = () => axiosInstance.get("/userapi/get_me");
export const getUserApi = (id: string, payload: any) =>
  axiosInstance.get(
    `/userapi/get_user/${id}?${queryString.stringify(payload)}`
  );
export const updateUserApi = (id: string, params: any) =>
  axiosInstance.put(`/userapi/update_user/${id}`, params);
export const changeStatusUserApi = (id: string, params?: any) =>
  axiosInstance.put(`/userapi/change_status_user/${id}`, params);

//API PROFILE
export const getProfilesApi = (payload?: any) =>
  axiosInstance.get(
    `/profileapi/get_profiles?${queryString.stringify(payload)}`
  );
export const updateProfileApi = (id: string, params?: any) =>
  axiosInstance.put(`/profileapi/update_profile/${id}`, params);

//API PASSWORD
export const updatePasswordApi = (id: string, params: any) =>
  axiosInstance.put(`/passwordapi/update_password/${id}`, params);

//API POST
export const getPostsApi = (payload?: any) =>
  axiosInstance.get(`/postapi/get_posts?${queryString.stringify(payload)}`);
export const getPostSlugApi = (slug: string) =>
  axiosInstance.get(`/postapi/get_post_sl/${slug}`);
export const getPostIDApi = (id: string) =>
  axiosInstance.get(`/postapi/get_post_id/${id}`);
export const createPostApi = (params: any) =>
  axiosInstance.post("/postapi/create_post", params);
export const updatePostApi = (id: string, payload: any) =>
  axiosInstance.put(`/postapi/update_post/${id}`, payload);
export const daletePostApi = (id: string) =>
  axiosInstance.delete(`/postapi/delete_post/${id}`);

interface UploadProps {
  url: string;
  id: string;
}
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance
    .post("/uploadfsapi/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }): UploadProps => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}${data?.data?.destination}/${data?.data?.filename}`;
      return { url, id: data?.id };
    })
    .catch((err) => {
      console.log("hmm ", err);
    });
};
