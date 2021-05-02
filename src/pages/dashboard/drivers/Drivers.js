import React, { useState } from "react";
import { Button, Table, Typography } from "antd";
// import axios from "axios";
// import { ApiBus } from "../../../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DriverModal from "./DriverModal";

function Drivers() {
  const { Title } = Typography;
  const [drivers, setDrivers] = useState([]);
  //Modal
  const [visible, setVisible] = useState(false);
  //Add columns here
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
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

  const submitHandler = (values) => {
    console.log("values created", values);
    const newDrivers = [...drivers, { ...values, key: 1 }];
    setDrivers(newDrivers);
    console.log(newDrivers);
    setVisible(false);
  };

  return (
    <div>
      <Title level={2}>Drivers</Title>
      <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
        onClick={() => setVisible(true)}
      >
        Add Item
      </Button>
      <Table bordered columns={columns} dataSource={drivers} />
      <DriverModal
        visible={visible}
        onCreate={(e) => submitHandler(e)}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default Drivers;
