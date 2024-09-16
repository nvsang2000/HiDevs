"use client";
import { Button, Col, Form, Input, Popconfirm, Row, Space, Upload } from "antd";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MDXEditer, FormLabel, CustomUpload } from "@/components";

interface FormProps {
  initialValues: any;
  id: string | undefined;
  onSubmit: (value: any) => void;
  onRemove: () => void;
}

export default function BlogForm({
  initialValues = {},
  id = "",
  onSubmit = () => {},
  onRemove = () => {},
}: FormProps) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [content, setContent] = useState(initialValues?.content);

  const handleGoBack = () => router.back();

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
      setContent(initialValues?.content);
    }
  }, [form, initialValues]);

  const handleEditer = (value: string) => {
    setContent(value);
    form.setFieldValue("content", value);
  };

  return (
    <>
      <div
        className={
          "mb-[20px] text-[18px] font-[500] capitalize sm:text-[24px] md:text-[26px] xl:text-[26px]"
        }
      >
        {id ? "Information" : "Create new"}
      </div>
      <Form
        layout="vertical"
        initialValues={{ ...initialValues }}
        form={form}
        onFinish={onSubmit}
      >
        <Row gutter={40}>
          <Col xs={24} md={24} xl={24}>
            <Form.Item name={"id"} className="hidden" />
            <FormLabel label="Title" require />
            <Form.Item
              name={"title"}
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input placeholder="Enter title!" />
            </Form.Item>

            <FormLabel label="Meta title" require />
            <Form.Item
              name={"meta_title"}
              rules={[{ required: true, message: "Please enter meta!" }]}
            >
              <Input placeholder="Enter title!" />
            </Form.Item>

            {id && (
              <>
                <FormLabel label="Slug" require />
                <Form.Item
                  name={"slug"}
                  rules={[{ required: true, message: "Please enter slug!" }]}
                >
                  <Input placeholder="Enter title!" />
                </Form.Item>
              </>
            )}

            <FormLabel label="Thumbnail" require />
            <Form.Item
              name={"thumbnail"}
              rules={[{ required: true, message: "Please enter thumbnail!" }]}
            >
              <CustomUpload />
            </Form.Item>

            <FormLabel label="Content" require />
            <Form.Item
              name={"content"}
              rules={[
                { required: true, message: "Please enter content!" },
                {
                  min: 255,
                  message:
                    "Article content must be greater than 255 characters!",
                },
              ]}
            >
              <Suspense fallback={null}>
                <MDXEditer
                  defaultMarkdown={initialValues?.content}
                  markdown={content}
                  onChange={handleEditer}
                />
              </Suspense>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"pl-[20px] my-[20px]"}>
          <Space align="center">
            <Button type={"primary"} htmlType={"submit"}>
              {id ? "Update" : "Create"}
            </Button>
            {id && (
              <Popconfirm
                title={"Are you sure you want to delete ?"}
                onConfirm={onRemove}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            )}
          </Space>
        </Row>
      </Form>
    </>
  );
}
