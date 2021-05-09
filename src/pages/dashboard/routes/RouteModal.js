import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import GoogleMaps from "./GoogleMaps";

const { Option } = Select;

const RouteModal = ({ visible, onCreate, onCancel, markers, setMarkers }) => {
  const [form] = Form.useForm();

  const [mark, setMark] = useState({});
  const [mount, setMount] = useState(false);

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

  useEffect(() => {
    setMount(true);

    if (mount == true && mark !== null) {
      setMarkers([...markers, mark]);
    }
    console.log("markers", markers);
  }, [mark]);

  const updateField = (e, i, fieldName) => {
    console.log("e", e.target.value);
    markers[i][fieldName] = "aaa";
  };
  return (
    <Modal
      visible={visible}
      title="Create Route"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
    >
      <GoogleMaps
        markers={markers}
        setMark={setMark}
        mark={mark}
        setMarkers={setMarkers}
      />
      <h2>Title</h2>
      <Form
        form={form}
        name="driver_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
      </Form>
      <h2> Stops </h2>
      <Form.Item label="Stops">
        {markers.map((item, index) => (
          <div key={index}>
            <div>Stop {index + 1}</div>
            <Input.Group>
              <Row gutter={20}>
                <Col span={8}>
                  <Form.Item name={item.title}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input value={item.lat} disabled />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Input value={item.long} />
                </Col>

                <Col span={3}>
                  <Form.Item>
                    <Input.Group compact>
                      <Select defaultValue="true">
                        <Option value="false">False</Option>
                        <Option value="true">True</Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>

            <br />
          </div>
        ))}
      </Form.Item>
    </Modal>
  );
};

export default RouteModal;
