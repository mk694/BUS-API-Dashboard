import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import DepartmentModal from "./DepartmentModal";
import DepartmentTable from "./DepartmentTable";
import axios from "../../../services/axios";
function Departments() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [departments, setDepartments] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const [visible, setVisible] = useState(false);

  const getDepartments = async () => {
    try {
      setloading(true);
      const response = await axios.get("/api/departments/all");

      const newResponse = [...response.data].map((department) => {
        const object = {
          ...department,
          key: department._id,
        };
        return object;
      });
      setDepartments(newResponse);
      console.log(response.data);
      setloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDepartment = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...departments];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const { title } = newData[index];

        const response = await axios.put(`/api/departments/${key}`, {
          title,
        });

        if (response) {
          getDepartments();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setDepartments(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error("Email already exist");
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteDepartment = async (key) => {
    try {
      const newData = [...departments];
      const index = newData.findIndex((item) => key === item.key);

      const response = await axios.delete(`/api/departments/${key}`);

      if (response) {
        getDepartments();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setDepartments(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const submitDepartment = async (values) => {
    console.log("Values", values);
    try {
      const response = await axios.post("/api/departments/add", values);

      if (response) {
        getDepartments();
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
    const confirm = async () => await getDepartments();

    confirm();
    // setDepartments([]);
  }, []);

  return (
    <div>
      <Title level={2}>Departments</Title>
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
      {/* <Table bordered columns={columns} dataSource={departments} /> */}

      <DepartmentTable
        departments={departments}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteDepartment}
        editSave={updateDepartment}
        form={form}
        setDisable={setDisable}
      />
      <DepartmentModal
        visible={visible}
        onCreate={(values) => submitDepartment(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Departments;
