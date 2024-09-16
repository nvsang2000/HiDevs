"use client";
import { Form, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import InforBaseTab from "./InforBase";
import SecurityTab from "./Security";
import { getUserApi } from "@/services/apis";
import { FaShield, FaUserLarge, FaWhmcs } from "react-icons/fa6";
import PasswordTab from "./Password";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";

const { TabPane } = Tabs;

const DEFAULT_STEPS: any = {
  basic: {
    icon: <FaUserLarge />,
    tab: <div className="text-[16px] font-medium">Public Profile</div>,
    component: InforBaseTab,
  },
  security: {
    icon: <FaWhmcs />,
    tab: <div className="text-[16px] font-medium">Security</div>,
    component: SecurityTab,
  },
  password: {
    icon: <FaShield />,
    tab: <div className="text-[16px] font-medium">Password & Auth</div>,
    component: PasswordTab,
  },
};

export default function UserForm({ id }: any) {
  const [initialValues, setInitialValues] = useState<any>({});
  const stepKeys = Object.keys(DEFAULT_STEPS);
  const [currentStep, setCurrentStep] = useState(stepKeys[0]);

  useEffect(() => {
    if (id && id !== "create") {
      getUserApi(id, { extra: "profile,password" }).then(({ data }) => {
        const user = data?.data;
        if (user) setInitialValues({ ...user });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTabs = () => (
    <Tabs
      tabPosition={"left"}
      activeKey={currentStep}
      onChange={setCurrentStep}
      className={"!text-[color:var(--light-gray)]"}
    >
      <TabPane tab={DEFAULT_STEPS["basic"].tab} key={"basic"}>
        <InforBaseTab
          id={id}
          initialValues={initialValues?.profile}
        />
      </TabPane>
      <TabPane tab={DEFAULT_STEPS["security"].tab} key={"security"}>
        <SecurityTab id={id} initialValues={initialValues} />
      </TabPane>
      <TabPane tab={DEFAULT_STEPS["password"].tab} key={"password"}>
        <PasswordTab id={id} initialValues={initialValues?.password} />
      </TabPane>
    </Tabs>
  );

  return (
    <div className="">
      <div className="flex items-center p-[20px]">
        <div>
          <Avatar
            src={
              initialValues?.profile?.avatar ||
              "https://i.pravatar.cc/150?u=a04258114e29026708c"
            }
            size="lg"
          />
        </div>
        <div className="ml-[10px]">
          <div className="text-[20px] font-bold">
            {initialValues?.profile?.nickname}
            <span className="text-[var(--light-gray)]">{`(${initialValues?.profile?.slug})`}</span>
          </div>
          <div>Personal account!</div>
        </div>
      </div>
      {renderTabs()}
    </div>
  );
}
