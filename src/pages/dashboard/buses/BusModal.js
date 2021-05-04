import React from "react";
import { Modal, Form, Input } from "antd";

const BusModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Add Item"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
    >
      <Form
        form={form}
        {...layout}
        name="bus_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[
            {
              required: true,
              message: "Please input the capacity!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="assignedRoute"
          label="AssignedRoute"
          rules={[
            {
              required: true,
              message: "Please input the assignedRoute!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="assignedDriver"
          label="AssignedDriver"
          rules={[
            {
              required: true,
              message: "Please input the assignedDriver!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BusModal;
