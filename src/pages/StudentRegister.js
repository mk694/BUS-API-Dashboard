import { Form, Input, Button, Typography,Radio, Upload,Table,Select,message, Spin, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";
import { DepartmentApi , BusApi,StudentApi,RouteApi, DriverApi} from "../services/api";
const { Option } = Select;


const propertiesUpload = {
  name: 'myFile',
  action: 'http://localhost:8080/api/auth/upload',
  headers: {
    authorization: 'authorization-text',
  }
}


function StudentRegister() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slipPhoto, SetSlipPhoto] = useState();
  const [mounted, setMounted] = useState(true);

  // const [mounted, setMounted] = useState(true);

  // const [departments, setDepartments] = useState([]);
  // const [form] = Form.useForm();


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length

    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      editable: true,
      sorter: (a, b) => a.capacity - b.capacity

    },
    {
      title: "AssignedRoute",
      dataIndex: "assignedRoute",
      key: "assignedRoute",
      editable: true,
      sorter: (a, b) => a.assignedRoute.length - b.assignedRoute.length,
      render: (_, record) => {
        return record.assignedRoute.name;
      },
    },
    {
      title: "AssignedDriver",
      dataIndex: "assignedDriver",
      key: "assignedDriver",
      editable: true,
      render: (_, record) => {
        return record.assignedDriver.name;
      },
    }
  ];

  const columnsRoute = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      editable: true,
    },
    {
      title: "Start Point",
      dataIndex: "startPoint",
      key: "startPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[0].title : ''}
        </span>
      }
    },
    {
      title: "End Point",
      dataIndex: "endPoint",
      key: "endPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[record.stops.length -1].title : ''}
        </span>
      }
    }
  ];

  const getBuses = async () => {
    try {
      setLoading(true);
      const response = await BusApi.getAll();
      const newResponse = [...response.data].map((bus) => {
        const object = {
          ...bus,
          key: bus._id,
        };
        return object;
      });

      setBuses(newResponse);
      setLoading(false);
      console.log("Response:", newResponse);
      console.log("BUSES", buses);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  };

  const getRoutes = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const handleChange = (e)=>{
    console.log('change',e);
    if(e.file.status == 'done'){
      // set the file url 
      alert('uploaded file');
      let imgUrl = e.file.response.file;
      console.log('use', imgUrl)
      if(imgUrl){
        SetSlipPhoto(imgUrl);
      }
    }

  }


  useEffect(() => {
    const response = async () => {
      try {
        const myBuses = await BusApi.getAll();
        const myRoutes = await RouteApi.getAll();
        setBuses(myBuses.data);
        setRoutes(myRoutes.data);
      } catch (error) {
        console.log(error);
      }
    }
    response();
    getBuses();

    return () => {
      setMounted(false);
    };
    
  }, [setMounted]);

    // useEffect(() => {
    // const response = async () => {
    //   try {
    //     const myDepartments = await DepartmentApi.getAll();
    //     setDepartments(myDepartments.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // if (mounted === true) {
    // }
    // response();
    // return () => {
    //   setMounted(false);
    // };
  // }, [setMounted]);


  const onFinish = async (values) => {
    if (values.password !== values.c_password) {
      message.error("passwords do not match");
    } else {
      try {
        setLoading(true);
        delete values.c_password;
        console.log('final-val',values);
        const response = await StudentApi.create(values);
        console.log("Success", response.data);
        if (response) {
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          // setIsLoggedIn(true);
          message.success("Account Created");
          message.success("Logged in!");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        message.error("Email already exists");
        setLoading(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/app" />
      ) : loading ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "47%",
            right: "50%",
            transform: "translate(0, -50%)",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4.3rem",
          }}
        >
          <Title
            style={{
              marginRight: "4.6rem",
              marginTop: "8rem",
              marginBottom: "10px",
            }}
          >
           Student Registeration Form 
          </Title>
          <Form
            style={{ margin: "85px", marginRight: "12.1rem" }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  style={{
                    marginLeft: ".15rem",
                    width: "87.9%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="System ID"
                name="systemId"
                rules={[{ required: true, message: "Please input your System ID!" }]}
              >
                <Input
                  style={{
                    marginLeft: ".15rem",
                    width: "87.9%",
                  }}
                />
              </Form.Item>
              <Form.Item
          name="sex"
          label="Gender"
          initialValue="Male"
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

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please input your Phone!" }]}
              >
                <Input
                  style={{
                    marginLeft: ".15rem",
                    width: "87.9%",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input correct email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  style={{
                    marginLeft: "2rem",
                    width: "80%",
                  }}
                />
              </Form.Item>


              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>


           


              <Form.Item
                label="Verify Password"
                name="c_password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
{/*          
        <Form.Item>
        <Upload {...propertiesUpload} onChange={(e)=> handleChange(e)}
        data={{name:'testing'}}>
    <Button icon={<UploadOutlined />}>Click to Upload Challan</Button>
  </Upload>
        </Form.Item> */}
         


             

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

            <Form.Item
              style={{
                width: "12rem",
                marginLeft: "11rem ",
                marginTop: "1rem",
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <div
              style={{
                marginLeft: "7rem",
              }}
            >
              <Link to="/login"> Already have an account? Log in</Link>
            </div>
          </Form>


<Row style={{width:'100%'}}>
<Col span={12} >

  <h2>Buses</h2>

<Table
        loading={loading}
        components={{
          body: {},
        }}
        bordered
        dataSource={buses}
        columns={columns}
        
      />
      </Col>
      <Col span={12} >
      <h2>Routes</h2>

      <Table
        loading={loading}
        components={{
          body: {},
        }}
        bordered
        dataSource={routes}
        columns={columnsRoute}
        
      />
      </Col>
</Row>

        </div>
      )}
    </>
  );
}

export default StudentRegister;
