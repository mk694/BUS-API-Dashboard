import React, { useState } from "react";
import { Table, Input, Popconfirm, Form, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType && <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StudentTable = (props) => {
  const [form] = Form.useForm();
  const { data, setData } = props;
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      password: "",
      phone: "",
      systemId: "",
      gender: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleted = async (key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      newData.splice(index, 1);

      setData(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      editable: true,
    },
    {
      title: "SystemId",
      dataIndex: "systemId",
      key: "systemId",
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      editable: true,
    },
    {
      title: "actions",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <EditOutlined
              style={{
                color: "blue",
              }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </EditOutlined>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              // onConfirm={}
              cancelText="No"
              onConfirm={() => deleted(record.key)}
            >
              <DeleteOutlined
                style={{
                  color: "red",
                  marginLeft: "20px",
                }}
                disabled={editingKey !== ""}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex && "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default StudentTable;
