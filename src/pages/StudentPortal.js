import { Form, Input, Button, message, Typography, Spin, Row, Col, Image,Tag,
  Descriptions, Badge 

} from "antd";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { StudentApi } from "../services/api";

function StudentPortal() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  
  useEffect(() => {
    setLoading(false);
  }, []);




  useEffect(() => {
    let loggedIn = true;

    const token = localStorage.getItem("token");
    if (token !== null && loggedIn === true) {
      setIsLoggedIn(true);
    }

    return () => (loggedIn = false);
  }, []);

  const onFinish = async (values) => {
    console.log('values', values)
    try {
      setLoading(true);
      const response = await StudentApi.queryStudent(values);
      console.log('res', response.data);

      if (response && response.data) {
        setStudent(response.data);
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        message.success("Profile Loaded ");
        // setIsLoggedIn(true);
        setLoading(false);
      }else{
        message.error("No Record found.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Incorrect email or password");
      setLoading(false);
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
            marginLeft: "6rem",
          }}
        >
          <Title
            style={{
              marginRight: "5.6rem",
              marginTop: "8rem",
              marginBottom: "10px",
            }}
          >
            Student Portal 
          </Title>
          <Form
            style={{ margin: "70px" }}
            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div
              style={{
                width: "20rem",
                marginTop: "5px",
                paddingTop: "10px",
              }}
            >
                 <Form.Item
                style={{
                  width: "92.45%",
                  marginLeft: "1.4rem",
                }}
                label="System ID"
                name="systemId"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  width: "92.45%",
                  marginLeft: "1.4rem",
                }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input Correct Email!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
            <div
              style={{
                width: "20rem",
                marginLeft: "10rem ",
                marginTop: "1rem",
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </div>
            <div
              style={{
                marginLeft: "6.3rem",
              }}
            >
              <Link to="/login">Administration Access? Log In</Link>
            </div>
          </Form>



          {
            student && 
            (<Row>
              <Col>
              <Descriptions title="User Info" bordered>
    <Descriptions.Item label="Full Name">{student.name}</Descriptions.Item>
    <Descriptions.Item label="Email Address">{student.email}</Descriptions.Item>
    <Descriptions.Item label="Contact Number">{student.phone}</Descriptions.Item>
    <Descriptions.Item label="Slip Verified">
    <Badge status={student.slipVerified == true ? 'success':'error'} text={student.slipVerified == true ? 'Verified':'Not Verified'} />
    </Descriptions.Item>
    <Descriptions.Item label="Updated At">{new Date(student?.updatedAt).toUTCString()}</Descriptions.Item>
    <Descriptions.Item label="System ID">
    <Tag color={'green'} key={student.systemId}>
              {student.systemId.toUpperCase()}
            </Tag></Descriptions.Item>
    {/* <Descriptions.Item label="Created At" span={2}>
    {student.createdAt ? new Date(student?.createdAt).toUTCString() : ''}
    </Descriptions.Item> */}
    <Descriptions.Item label="Account Status" span={3}>
      <Badge status={student.verified == true ? 'success':'warning'} text={student.verified == true ? 'Active':'Not Active'} />
    </Descriptions.Item>
    <Descriptions.Item label="Gender ">{student.sex}</Descriptions.Item>
    <Descriptions.Item label="Discount">
      <Image src={student.slipPhoto || 'https://www.wkbn.com/wp-content/uploads/sites/48/2020/06/missing-generic.jpg'} style={{width:'250px'}} />
    </Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
    </Descriptions.Item>
  </Descriptions>
              
              </Col>
            </Row>)
            
          }
        </div>
      )}
    </>
  );
}

export default StudentPortal;
