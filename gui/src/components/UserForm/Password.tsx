"use client";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import { FormLabel } from "..";
import { useRouter } from "next/navigation";
import { updatePasswordApi } from "@/services/apis";

export default function PasswordTab({
  id,
  initialValues = {},
  onSubmit = () => {},
}: any) {
  const [form] = Form.useForm();
  const { push } = useRouter();
  const [displayPasswordForm, setDisplayPasswordForm] = useState(false);

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const handleSubmit = async(values: any) => {
    try {
      delete values.confirmPassword
      await updatePasswordApi(id, values)
      message.success("Updated successfully!")
      push(`/dashboard/users/${id}`)
    } catch (e) {
      console.log(e)
    }
  } 

  const renderPasswordForm = () => {
    return (
      <>
        <FormLabel label={`${id ? "New" : ""} Password`} require />
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Enter password!" }]}
        >
          <Input.Password
            size="large"
            placeholder={"Enter password"}
            autoComplete={undefined}
          />
        </Form.Item>

        <FormLabel label={"Confirm password"} require />
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please Enter password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Password does not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder={"Enter password"}
            autoComplete={undefined}
          />
        </Form.Item>
      </>
    );
  };

  return (
    <div>
      <Form
        layout={"vertical"}
        colon={false}
        form={form}
        initialValues={initialValues}
        onFinishFailed={(e) => console.log(e)}
        onFinish={handleSubmit}
      >
        <Row gutter={20}>
          <Col xs={24} lg={12}>
            {displayPasswordForm && renderPasswordForm()}
            <div>
              <span className={"mr-[10px] text-[16px] text-black"}>
                Change password
              </span>
              <Checkbox
                onClick={() => setDisplayPasswordForm(!displayPasswordForm)}
              />
            </div>
          </Col>
        </Row>
        {displayPasswordForm && (
          <Button className={'mt-[20px]'} type={"primary"} htmlType={"submit"}>
            {"Update password"}
          </Button>
        )}
      </Form>
    </div>
  );
}
