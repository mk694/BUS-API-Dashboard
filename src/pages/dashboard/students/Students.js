import React, { useEffect, useState } from "react";
import { Button, Table, Typography, Popconfirm, Form } from "antd";
// import axios from "axios";
// import { ApiBus } from "../../../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StudentModal from "./StudentModal";
import StudentTable from "./StudentTable";
function Students() {
  // const [form] = Form.useForm();
  const { Title } = Typography;
  const [students, setStudents] = useState([]);
  //Modal
  const [visible, setVisible] = useState(false);

  const submitHandler = (values) => {
    console.log("values created", values);

    const randomNumber = Math.floor(Math.random() * 100);
    const newStudents = [
      ...students,
      {
        ...values,
        key: randomNumber,
      },
    ];
    setStudents(newStudents);
    

    setVisible(false);
  };

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    setStudents(storedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <div>
      <Title level={2}>Students</Title>
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
      {/* <Table bordered columns={columns} dataSource={students} /> */}

      <StudentTable data={students} setData={setStudents} />
      <StudentModal
        visible={visible}
        onCreate={(e) => submitHandler(e)}
        onCancel={() => {
          setVisible(false);
          // form.resetFields();
        }}
      />
    </div>
  );
}
export default Students;
