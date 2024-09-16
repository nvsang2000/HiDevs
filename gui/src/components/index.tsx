import HeaderSection from "./Header";
import FooterSection from "./Footer";
import DashboardLayout from "./DashboardLayout";
import BlogForm from "./BlogForm";
import LoginForm from "./AuthForm/LoginForm";
import RegisterForm from "./AuthForm/RegisterForm";
import CustomUpload from "./CustomUpload";
import FormLabel from "./FormLabel";
import UserForm from "./UserForm";
import {
  Carousel,
  BannerCarousel,
  TutorialCarousel,
  BlogCarousel,
} from "./Carousel";
import ThemeSwitch from "./ThemeSwitch";
import Provider from "./Provider";
import dynamic from "next/dynamic";
import AuthForm from "./AuthForm";
import  "./Svg";
//import dynamic
const Markdown = dynamic(() => import("./Markdown"), { ssr: false });
const MDXEditer = dynamic(() => import("./MDXEditer"), { ssr: false });
export {
  DashboardLayout,
  BlogForm,
  LoginForm,
  RegisterForm,
  CustomUpload,
  FormLabel,
  UserForm,
  HeaderSection,
  FooterSection,
  Carousel,
  BannerCarousel,
  TutorialCarousel,
  BlogCarousel,
  Markdown,
  MDXEditer,
  ThemeSwitch,
  Provider,
  AuthForm,
};
