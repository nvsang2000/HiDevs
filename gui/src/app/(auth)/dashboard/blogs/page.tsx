"use client";
import { getPostsApi } from "@/services/apis";
import dayjsInstance from "@/utils/dayjs";
import { Button, Col, Row, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { numberFormat } from "@/helpers";
import { Image } from "@nextui-org/image";
import { DEFAULT_PARAMS } from "@/constants";
import { SearchParam } from "@/types";

export default function BlogsPage({
  searchParams,
}: {
  searchParams?: SearchParam;
}) {
  const { push, replace } = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>({});
  const pathname = usePathname();
  const params = useSearchParams();

  const updatedParams = (newParams: any) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key]);
    });

    return params;
  };

  const replaceParams = (newParams: any) => {
    const params = updatedParams(newParams);
    replace(`${pathname}?${params.toString()}`);
  };

  const fetchPosts = async () => {
    setLoading(true);
    return await getPostsApi(searchParams)
      .then((res) => {
        const { data } = res || {};
        setPosts(data?.data?.docs || []);
        setMeta(data?.data?.meta);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
    if (Object.keys(searchParams as any)?.length === 0) {
      replaceParams(DEFAULT_PARAMS);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (value: any, record: any) => {
        return (
          <div
            onClick={() => push(`/dashboard/blogs/${record?.id}`)}
            className={"cursor-pointer"}
          >
            <Row gutter={8}>
              <Col xs={24} lg={8} className={"self-center"}>
                <Image
                  radius={"sm"}
                  alt={"thumbnail"}
                  width={100}
                  height={100}
                  src={record?.thumbnail || "/image/logo2.jpeg"}
                  fallbackSrc={"/image/logo2.jpeg"}
                />
              </Col>
              <Col xs={24} lg={16} className={"self-center"}>
                <div className={"text-[15px] font-medium"}>{value}</div>
              </Col>
            </Row>
          </div>
        );
      },
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 350,
      render: (value: any, record: any) => {
        return <div className="line-clamp-3 break-all">{value}</div>;
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 50,
      render: (_: any, record: any) => {
        return (
          <div
            className={
              "lg-[13px]  text-[12px] font-light italic text-[color:var(--primary-color)] sm:text-[13px] md:text-[13px] xl:text-[13px]"
            }
          >
            {dayjsInstance(record?.created_at).fromNow()}
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {},
  };

  return (
    <>
      <div className="bg-white p-[40px] rounded-[6px] mb-[20px]">
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[18px] font-medium"}>
              <span className={"mr-[10px] text-[color:var(--green)]"}>
                {numberFormat(meta?.total || 0)}
              </span>
              blogs
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => push(`/dashboard/blogs/create`)}
            >
              Create new
            </Button>
          </Col>
        </Row>
      </div>
      <div className="bg-white p-[40px] rounded-[6px]">
        <Table
          rowSelection={{ ...rowSelection }}
          loading={loading}
          rowKey={(record) => record?.id + ""}
          dataSource={posts}
          columns={columns}
          pagination={{
            total: meta?.total,
            pageSize: +(params.get("limit") || 10),
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100, 200],
            onChange: (page: number, pageSize: number) => {
              replaceParams({ page, limit: pageSize });
            },
            current: +(params.get("page") || 1),
          }}
        />
      </div>
    </>
  );
}
