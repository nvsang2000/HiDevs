"use client";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FormLabel } from "..";
import { useRouter } from "next/navigation";
import { updateUserApi } from "@/services/apis";

export default function SecurityTab({
  id,
  loading,
  initialValues = {},
  onSubmit = () => {},
}: any) {
  const [form] = Form.useForm();
  const { push } = useRouter();

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const handleSubmit = async (value: any) => {
    try {
      if (id) {
        const valueUpdate = { undo: initialValues, update: value };
        await updateUserApi(initialValues?.id, valueUpdate);
        message.success("Updated successfully!");
        push(`/dashboard/users/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
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
            <FormLabel label={"Username"} require />
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter username!" }]}
            >
              <Input placeholder={"Enter username"} />
            </Form.Item>

            <FormLabel label={"Email"} require />
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter email!" }]}
            >
              <Input placeholder={"Please enter email"} />
            </Form.Item>
            <FormLabel label={"Phone"} />
            <Form.Item name="phone">
              <Input placeholder={"Please enter phone"} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"pb-[40px] pl-[20px]"}>
          <Space align="center">
            <Button loading={loading} type={"primary"} htmlType={"submit"}>
              {"Update Security"}
            </Button>
            <Popconfirm title={"Are you sure you want to delete ?"}>
              <Button loading={loading} type={"primary"} danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </Row>
      </Form>
    </div>
  );
}
