import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import BusModal from "./BusModal";
import BusTable from "./BusTable";
import axios from "../../../services/axios";

function Buses() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [buses, setBuses] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const [visible, setVisible] = useState(false);

  const getBuses = async () => {
    try {
      setloading(true);
      const response = await axios.get("/api/buses/all");

      const newResponse = [...response.data].map((bus) => {
        const object = {
          ...bus,
          key: bus._id,
        };
        return object;
      });
      setBuses(newResponse);
      console.log(response.data);
      setloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateBus = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...buses];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const { name, capacity, assignedRoute , assignedDriver } = newData[index];

        const response = await axios.put(`/api/buses/${key}`, {
          name, capacity, assignedRoute , assignedDriver ,
        });

        if (response) {
          getBuses();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setBuses(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error("Email already exist");
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteBus = async (key) => {
    try {
      const newData = [...buses];
      const index = newData.findIndex((item) => key === item.key);

      const response = await axios.delete(`/api/buses/${key}`);

      if (response) {
        getBuses();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setBuses(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const submitBus = async (values) => {
    console.log("Values", values);
    try {
      const response = await axios.post("/api/buses/add", values);

      if (response) {
        getBuses();
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
    const confirm = async () => await getBuses();

    confirm();
    // setBuses([]);
  }, []);

  return (
    <div>
      <Title level={2}>Buses</Title>
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
      {/* <Table bordered columns={columns} dataSource={buses} /> */}

      <BusTable
        buses={buses}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteBus}
        editSave={updateBus}
        form={form}
        setDisable={setDisable}
      />
      <BusModal
        visible={visible}
        onCreate={(values) => submitBus(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Buses;
