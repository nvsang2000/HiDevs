"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Divider } from "antd";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa6";
import { Logo } from "../Svg";
import NextLink from "next/link";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "@/hooks";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { DEFAULT_AVATAR } from "@/constants";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const { push } = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, logout, currentUser } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {currentUser ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={currentUser?.profile?.avatar || DEFAULT_AVATAR}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" onClick={() => push(`/me/${currentUser?.profile?.slug}`)}>
              <div className="text-[18px] font-bold">{currentUser?.profile?.nickname}</div>
              <div className="text-[var(--light-gray)]">
                @{currentUser?.profile?.slug}
              </div>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          <Button
            variant="light"
            onPress={() => {
              onOpen();
              setIsLogin(true);
            }}
          >
            Sign in
          </Button>
          <Button
            color="primary"
            className="ml-[10px]"
            variant="ghost"
            onPress={() => {
              onOpen();
              setIsLogin(false);
            }}
          >
            Sign up
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <div className="mt-[40px]">
                      <NextLink
                        className="flex justify-center items-center gap-1 text-[20px] mb-[10px]"
                        href="/"
                      >
                        <Logo />
                        <p className="font-bold text-inherit">HI DEV</p>
                      </NextLink>
                      {isLogin ? (
                        <LoginForm onSubmit={login} />
                      ) : (
                        <RegisterForm onSubmit={register} />
                      )}
                      <div className="flex justify-between">
                        <div className="cursor-pointer text-[#006fee] text-[16px]">
                          Forgot password?
                        </div>
                        <div
                          className="cursor-pointer text-[#006fee] text-[16px]"
                          onClick={() => setIsLogin(!isLogin)}
                        >
                          {isLogin ? "Sign up" : "Sign in"}
                        </div>
                      </div>
                      <Divider orientation="center" plain>
                        <div className="text-[18px]"> Login with</div>
                      </Divider>
                    </div>
                    <div className="flex justify-between pb-[20px]">
                      <Button
                        className="rounded-[6px] border-[#ececec] border-[1px]"
                        variant="bordered"
                        startContent={
                          <FaFacebookF className={"text-[#128ce9] "} />
                        }
                      >
                        Facebook
                      </Button>
                      <Button
                        className="rounded-[6px] border-[#ececec] border-[1px]"
                        variant="bordered"
                        startContent={<FaGoogle className={"text-[#e84720]"} />}
                      >
                        Google
                      </Button>
                      <Button
                        className="rounded-[6px] border-[#ececec] border-[1px]"
                        variant="bordered"
                        startContent={<FaGithub />}
                      >
                        Github
                      </Button>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
