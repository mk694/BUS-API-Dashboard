import React from "react";
import { Modal, Form, Input, Radio } from "antd";

const DriverModal = ({ visible, onCreate, onCancel }) => {
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
        name="form_in_modal"
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
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input tcorrect email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input correct password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input correct Phone Number",
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="systemId"
          label="SystemID"
          rules={[
            {
              required: true,
              message: "Please input correct SystemID",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select your Gender",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DriverModal;
