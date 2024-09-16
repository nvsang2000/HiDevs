"use client";
import { DEFAULT_AVATAR, DEFAULT_PARAMS } from "@/constants";
import { numberFormat } from "@/helpers";
import { changeStatusUserApi, getUsersApi } from "@/services/apis";
import { SearchParam } from "@/types";
import dayjsInstance from "@/utils/dayjs";
import { Button, Col, Row, Space, Switch, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";

export default function UsersPage({
  searchParams,
}: {
  searchParams?: SearchParam;
}) {
  const { push, replace } = useRouter();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState<any>({});
  const pathname = usePathname();
  const parmas = useSearchParams();

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

  const fetchUsers = async () => {
    return await getUsersApi({ ...searchParams, extra: "profile" }).then(
      (res) => {
        const { data } = res || {};
        setUsers(data?.data?.docs || []);
        setMeta(data?.data?.meta);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    if (Object.keys(searchParams as any)?.length === 0) {
      replaceParams(DEFAULT_PARAMS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onActiveChange = async (active: boolean, id: any) => {
    try {
      await changeStatusUserApi(id, { active });
      fetchUsers();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const columns = [
    {
      title: "Public Profile",
      dataIndex: "profile",
      key: "profile",
      width: 350,
      render: (_: any, record: any) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => push(`/dashboard/users/${record?.id}`)}
          >
            <div>
              <Avatar
                src={record?.profile?.avatar || DEFAULT_AVATAR}
                size="lg"
              />
            </div>
            <div className="ml-[10px]">
              <div className="text-[20px] font-bold">
                {record?.profile?.nickname}
              </div>
              <div className="text-[var(--light-gray)]">
                @{record?.profile?.slug}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 250,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 150,
      render: (_: any, record: any) => {
        return (
          <div>
            <Switch
              size="small"
              checked={record?.active}
              onChange={(checked) => onActiveChange(checked, record?.id)}
            />
          </div>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 80,
      render: (_: any, record: any) => {
        return (
          <div>{dayjsInstance(record?.created_at).format("DD/MM/YYYY")}</div>
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
              Users
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => push(`/dashboard/users/create`)}
            >
              Create new
            </Button>
          </Col>
        </Row>
      </div>
      <div className="bg-white p-[40px] rounded-[6px]">
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          rowKey={(record) => record?.id + ""}
          dataSource={users}
          columns={columns}
          pagination={{
            total: meta?.total,
            pageSize: +(parmas.get("limit") || 10),
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100, 200],
            onChange: (page: number, pageSize: number) => {
              replaceParams({ page, limit: pageSize });
            },
            current: +(parmas.get("page") || 1),
          }}
        />
      </div>
    </>
  );
}
