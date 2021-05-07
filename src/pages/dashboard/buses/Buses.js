import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import BusModal from "./BusModal";
import BusTable from "./BusTable";
import { BusApi } from "../../../services/api";

function Buses() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [buses, setBuses] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const getBuses = async () => {
    try {
      setloading(true);
      const response = await BusApi.getAll();
      console.log("Bues,", buses);
      const newResponse = [...response.data].map((bus) => {
        const object = {
          ...bus,
          key: bus._id,
        };
        return object;
      });
      setBuses(newResponse);
      setloading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
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

        const { name, capacity, assignedRoute, assignedDriver } = newData[
          index
        ];

        const response = await BusApi.update(key, {
          name,
          capacity,
          assignedRoute,
          assignedDriver,
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
    } catch (error) {
      message.error("Email already exist");
      console.log("Validate Failed:", error);
    }
  };

  const deleteBus = async (key) => {
    try {
      const newData = [...buses];
      const index = newData.findIndex((item) => key === item.key);

      const response = await BusApi.delete(key);

      if (response) {
        getBuses();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setBuses(newData);
      setEditingKey("");
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const submitBus = async (values) => {
    console.log("Values", values);
    try {
      const response = await BusApi.create(values);

      if (response) {
        getBuses();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error("Email already exist");
      console.log(error.response.message);
    }
  };

  useEffect(() => {
    setMounted(true);

    if (mounted === true) {
      getBuses();
    }
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

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
