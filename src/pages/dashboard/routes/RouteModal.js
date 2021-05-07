import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import GoogleMap from 'google-map-react';





const RouteModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const [markers, setMarkers] =useState([0])
  
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

  // const [center, setCenter]=useState(3);
  // const [zoom, setZoom]=useState(4);

   const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 20,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  const YOUR_GOOGLE_MAP_API_KEY = 'AIzaSyA7jbl5TnQofa0ALQyN6uWXoui92Kw_Otg'
  const center = [33.738045, 73.084488];
  const zoom = 7;
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
            <div style={{ height: '20vh', width: '100%' }}>
      <GoogleMap
        apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={center}
        zoom={zoom}
        >

      </GoogleMap>
      </div> 

      <div> 
        <h2> Stops </h2>

        <div> 
           {markers.map((item, index)=> 
                <Form
                form={form}
                {...layout}
                name="department_modal"
                initialValues={{
                  modifier: "public",
                }}
              >
                <Form.Item
                  name="title"
                  label={'item ' + index}
                  rules={[
                    {
                      required: true,
                      message: "Please input the title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
             
              </Form>
            
            )}
        </div>
      </div>
    </Modal>



  );
};

export default RouteModal;
