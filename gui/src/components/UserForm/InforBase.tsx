"use client";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
} from "antd";
import React, { useEffect } from "react";
import { CustomUpload, FormLabel } from "..";
import { useRouter } from "next/navigation";
import { updateProfileApi } from "@/services/apis";
const { TextArea } = Input;

export default function InforBaseTab({
  id,
  loading = false,
  initialValues = {},
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
        await updateProfileApi(initialValues?.id, valueUpdate);
        message.success("Updated successfully!")
        push(`/dashboard/users/${id}`)
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
        onFinish={handleSubmit}
      >
        <Row gutter={20}>
          <Col xs={24} lg={12}>
            <FormLabel label={"Display name"} require />
            <Form.Item
              name="nickname"
              rules={[
                { required: true, message: "Please enter display name!" },
              ]}
            >
              <Input placeholder={"Enter display name"} />
            </Form.Item>

            <FormLabel label={"Slug"} require />
            <Form.Item
              name="slug"
              rules={[{ required: true, message: "Please enter slug!" }]}
            >
              <Input placeholder={"Enter slug"} />
            </Form.Item>
            <FormLabel label={"Bio"} />
            <Form.Item name="bio">
              <TextArea size="large" rows={4} placeholder="Enter bio!" />
            </Form.Item>

            <FormLabel label={"Avatar"} />
            <Form.Item name="avatar">
              <CustomUpload />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"pb-[40px] pl-[20px]"}>
          <Button loading={loading} type={"primary"} htmlType={"submit"}>
            Update profile
          </Button>
        </Row>
      </Form>
    </div>
  );
}
