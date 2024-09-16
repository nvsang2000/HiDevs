"use client";
import { loginApi, registerApi } from "@/services/apis";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Context {
  loading?: boolean;
  currentUser?: any;
  setCurrentUser: (currentUser: any) => void
  login?: (payload: any) => void
  register?: (payload: any) => void
  logout?: () => void
}

interface AuthProviderProps {
  initCurrentUser?: any
  children?: React.ReactNode;
}

const defaultContext: Context = {
  loading: false,
  currentUser: undefined,
  setCurrentUser: (currentUser: any) => currentUser,
  login: (payload: any) => payload,
  register: (payload: any) => payload,
  logout: () => {},
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ initCurrentUser, children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(initCurrentUser)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProfile = async () => {
    const accessToken = Cookies.get('acc')
    try {
      const { data } = await axios.get(`${baseURL}userapi/get_me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(data) {
          setCurrentUser(data?.data)
      }
    } catch (e: any) {
      console.log(e.message)
      setLoading(false)
    }
  }

  const login = async (payload: any) => {
    setLoading(true)
    try {
      const { data } = await loginApi(payload)
      const token = data?.data;
      if(token) {
        Cookies.set('acc', token, { expires: 30 })
        await fetchProfile()
        router.refresh();
      } 
    } catch (e: any) {
      console.log(e.message)
      setLoading(false)
    }
  }

  const register = async (payload: any) => {
    setLoading(true);
    try {
      const { data } = await registerApi(payload);
      if (data?.data) {
        const token = data?.data;
        Cookies.set("acc", token, { expires: 30 });
        router.refresh();
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove("acc");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser: (data: any) => {
          setCurrentUser(data)
        },
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
