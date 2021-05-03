import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import DriverModal from "./DriverModal";
import DriverTable from "./DriverTable";
import axios from "../../../services/axios";
function Drivers() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [drivers, setDrivers] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const [visible, setVisible] = useState(false);

  const getDrivers = async () => {
    try {
      setloading(true);
      const response = await axios.get("/api/drivers/all");

      const newResponse = [...response.data].map((driver) => {
        const object = {
          ...driver,
          key: driver._id,
        };
        return object;
      });
      setDrivers(newResponse);
      console.log(response.data);
      setloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDriver = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...drivers];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const { name, phone, photo } = newData[index];

        const response = await axios.put(`/api/drivers/${key}`, {
          name,
          phone,
          photo,
        });

        if (response) {
          getDrivers();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setDrivers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error("Email already exist");
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteDriver = async (key) => {
    try {
      const newData = [...drivers];
      const index = newData.findIndex((item) => key === item.key);

      const response = await axios.delete(`/api/drivers/${key}`);

      if (response) {
        getDrivers();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setDrivers(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const submitDriver = async (values) => {
    try {
      const response = await axios.post("/api/drivers/add", values);

      if (response) {
        getDrivers();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error("Email already exist");
      console.log(error.message);
    }
  };
  useEffect(() => {
    const confirm = async () => await getDrivers();

    confirm();
    // setDrivers([]);
  }, []);

  return (
    <div>
      <Title level={2}>Drivers</Title>
      <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
        disabled={disable}
        onClick={() => {
          setVisible(true);
          setDisable(true);
        }}
      >
        Add Item
      </Button>
      {/* <Table bordered columns={columns} dataSource={drivers} /> */}

      <DriverTable
        drivers={drivers}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteDriver}
        editSave={updateDriver}
        form={form}
        setDisable={setDisable}
      />
      <DriverModal
        visible={visible}
        onCreate={(values) => submitDriver(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Drivers;
