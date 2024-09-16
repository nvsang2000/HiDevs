import { RcFile } from "antd/es/upload";
import { ImageProps } from "next/image";
import numeral from "numeral";
import CryptoJS from "crypto-js";

export const numberFormat = (value: any) => numeral(value).format("0,0[.]00");

export const getBase64 = (file: RcFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export const parseSafe = (str: any) => {
  try {
    const result = JSON.parse(str);

    return result;
  } catch (e: any) {
    return undefined;
  }
};

export const imageLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 85}`;
};

export const encrypt = (message: string) => {
  const scryptkey = process.env.NEXT_PUBLIC_ENCRYP_KEY as string
  return CryptoJS.AES.encrypt(message, scryptkey).toString();
};

export const decrypt = (token: string) => {
  const scryptkey = process.env.NEXT_PUBLIC_ENCRYP_KEY as string
  const bytes = CryptoJS.AES.decrypt(token, scryptkey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
