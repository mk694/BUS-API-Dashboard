import React from "react";
import { Button, Table, Typography } from "antd";
// import axios from "axios";
// import { ApiBus } from "../../../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Departments() {
  const { Title } = Typography;

  //Add columns here
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: () => (
        <>
          <EditOutlined
            style={{
              color: "blue",
            }}
          />
          <DeleteOutlined
            style={{
              color: "red",
              marginLeft: "20px",
            }}
          />
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "Dragon center",
    },
  ];

  return (
    <div>
      <Title level={2}>Departments</Title>
      <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
      >
        Add Item
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
}

export default Departments;
