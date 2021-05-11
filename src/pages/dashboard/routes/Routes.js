import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import RouteModal from "./RouteModal";
import { RouteApi } from "../../../services/api";
import RouteTable from "./RouteTable";
function Routes() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [routes, setRoutes] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);
  const [markers, setMarkers] = useState({
    stops:[],
    title:''
  });

  const getRoutes = async () => {
    try {
      setloading(true);
      const response = await RouteApi.getAll();

      console.log("response", response);

      const newResponse = [...response.data].map((route) => {
        const object = {
          ...route,
          key: route._id,
        };
        return object;
      });

      console.log("newResponse");

      setRoutes(newResponse);
      setloading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateRoute = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...routes];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const {
          name,
          stops: { title },
        } = newData[index];

        const response = await RouteApi.update(key, {
          name,
          title,
        });

        if (response) {
          getRoutes();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setRoutes(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      message.error("Email already exist");
      console.log("Validate Failed:", error);
    }
  };

  const deleteRoute = async (key) => {
    try {
      const newData = [...routes];
      const index = newData.findIndex((item) => key === item.key);

      const response = await RouteApi.delete(key);

      if (response) {
        getRoutes();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setRoutes(newData);
      setEditingKey("");
    } catch (error) {
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const submitRoute = async (values) => {
    // const newArray = {
    //   ...values,
    //   stops: [...markers],
    // };
    const newArray = values;
    console.log("newArray", newArray);
    try {
      const response = await RouteApi.create(newArray);

      if (response) {
        getRoutes();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (mounted === true) {
      getRoutes();
    }
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  const data = [];

  return (
    <div>
      <Title level={2}>Routes</Title>
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
      {/* <Table bordered columns={columns} dataSource={routes} /> */}

      <RouteTable
        routes={routes}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteRoute}
        editSave={updateRoute}
        form={form}
        setDisable={setDisable}
      />
      <RouteModal
        visible={visible}
        markers={markers}
        width={1000}
        setMarkers={setMarkers}
        onCreate={(values) => {
          console.log("Success:", values);

          return submitRoute(values);
        }}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Routes;
