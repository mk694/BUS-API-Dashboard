import React from "react";
import { Table, Input, Popconfirm, Form, Typography, Image, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;

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
  const inputNode = inputType;
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

const StudentTable = ({
  students,
  loading,
  deleted,
  editingKey,
  setEditingKey,
  editSave,
  form,
  setDisable,
}) => {
  const { Link } = Typography;

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      password: "",
      phone: "",
      systemId: "",
      sex: "",
      slipPhoto:"",
      slipVerified:null,
      // assignedBus,
      ...record,
    });
    setEditingKey(record.key);
    setDisable(true);
  };

  const cancel = () => {
    setEditingKey("");
    setDisable(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true
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
    },
    {
      title: "Slip Photo",
      dataIndex: "slipPhoto",
      key: "slipPhoto",
      render: (_,record) =>{
        return  <Image
        width={200}
        src={record.slipPhoto || "https://www.wkbn.com/wp-content/uploads/sites/48/2020/06/missing-generic.jpg"}
      />
      },

    },
    {
      title: "slipVerified",
      dataIndex: "slipVerified",
      key: "slipVerified",
      editable: true,
      render: (_,record) =>{
        return <span>{String(record.slipVerified)} </span>
      }
    },
    // {
    //   title: "AssignedBus",
    //   dataIndex: "assignedBus",
    //   key: "assignedBus",
    // },

    {
      title: "Actions",
      align: "center",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Link
              onClick={() => editSave(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Link>Cancel</Link>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <EditOutlined
              style={
                editingKey !== ""
                  ? {
                      display: "none",
                    }
                  : {
                      color: "blue",
                    }
              }
              // editingKey !== ""
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
                style={
                  editingKey !== ""
                    ? {
                        display: "none",
                      }
                    : {
                        color: "red",
                        marginLeft: "20px",
                      }
                }
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
        inputType:
            col.dataIndex == "slipVerified" ? (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Driver"
              >
                    <Option key={'as'} value={true}>
                      true
                    </Option>
                    <Option key={'a3'} value={false}>
                      false
                    </Option>
              </Select>
            )  : (
              <span>yoyoyo</span>
            ),
            dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={students}
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
