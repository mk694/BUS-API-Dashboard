import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import StudentModal from "./StudentModal";
import StudentTable from "./StudentTable";
import { StudentApi } from "../../../services/api";

function Students() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [students, setStudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const [visible, setVisible] = useState(false);

  const getStudents = async () => {
    try {
      setloading(true);
      const response = await StudentApi.getAll();

      const newResponse = [...response.data].map((student) => {
        const object = {
          ...student,
          key: student._id,
        };
        return object;
      });
      setStudents(newResponse);
      console.log(response.data);
      setloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStudent = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...students];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const { name, email, password, phone, systemId, sex } = newData[index];

        const response = await StudentApi.update(key, {
          name,
          email,
          password,
          phone,
          systemId,
          sex,
        });

        if (response) {
          getStudents();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setStudents(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error("Email already exist");
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteStudent = async (key) => {
    try {
      const newData = [...students];
      const index = newData.findIndex((item) => key === item.key);

      const response = await StudentApi.delete(key);

      if (response) {
        getStudents();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setStudents(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const submitStudent = async (values) => {
    try {
      const response = await StudentApi.create(values);

      if (response) {
        getStudents();
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
    const confirm = async () => await getStudents();

    confirm();
    // setStudents([]);
  }, []);

  return (
    <div>
      <Title level={2}>Students</Title>
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
      {/* <Table bordered columns={columns} dataSource={students} /> */}

      <StudentTable
        students={students}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteStudent}
        editSave={updateStudent}
        form={form}
        setDisable={setDisable}
      />
      <StudentModal
        visible={visible}
        onCreate={(values) => submitStudent(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Students;
