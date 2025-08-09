/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import React, { useEffect, useState } from "react";
import { Flex, Form, Input, Table, TableColumnType, Button, Modal, InputNumber } from "antd";

const axios = require("axios");

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnType<DataType>[] = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  { title: "Address", dataIndex: "address", key: "address" },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    if (searchText.trim() === "") {
      setData([]);
      setPagination((prev) => ({ ...prev, total: 0 }));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/data", {
        params: { name_like: searchText },
      });
      const filteredData = response.data.filter((item: DataType) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
      setPagination((prev) => ({ ...prev, total: filteredData.length }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchText]);

  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: pagination.total,
    });
  };

  const handleAddForm = async (values: Omit<DataType, "id">) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/data", {
        ...values,
        id: `${Date.now()}`,
      });
      setIsFormOpen(false);
      form.resetFields();
      if (searchText.trim() === "" || values.name.toLowerCase().includes(searchText.toLowerCase())) {
        fetchData();
      }
    } catch (err) {
      console.error("Error Adding user!", err);
    } finally {
      setLoading(false);
    }
  };

  const paginatedData = data.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <main className="min-h-screen w-full bg-gray-200 flex flex-col gap-8 items-center py-8">
      <h1 className="text-center text-blue-800 font-bold text-4xl">
        Welcome to our dashboard
      </h1>
      <Flex vertical gap={32}>
        <Flex gap={16}>
          <Search
            className="search-box"
            placeholder="Search"
            allowClear
            enterButton={
              <button className="bg-blue-500 h-10 text-center text-blue-100 px-4 cursor-pointer">
                Search
              </button>
            }
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add User
          </Button>
        </Flex>
        <Table
          className="dataTable"
          dataSource={paginatedData}
          columns={columns}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9"],
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </Flex>
      <Modal
        title="Add New User"
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please enter your age" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}