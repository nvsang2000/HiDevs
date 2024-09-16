"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export default function useAuth() {
  const context = useContext(AuthContext)
  return context
}

