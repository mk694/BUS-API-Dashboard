import { Form, Input, Button, message, Typography, Spin, Row, Col, Image,Tag,
  Descriptions, Badge 

} from "antd";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { StudentApi } from "../services/api";
import {SupportApi } from '../services/api';
const { TextArea } = Input;

let mock ={
  "verified": false,
  "slipVerified": false,
  "_id": "60a689d6049eb73a10badeac",
  "name": "Muhammad Abrar",
  "email": "abrar@gmail.com",
  "password": "12345",
  "phone": "0312312312312312",
  "systemId": "numl-f19-28876",
  "department": "60a678d223c07001c42e2828",
  "sex": "Male",
  "createdAt": "2021-05-20T16:09:58.369Z",
  "updatedAt": "2021-05-20T16:09:58.369Z",
  "__v": 0
}

function StudentPortal() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');



  
 



const onSubmit = () =>{
  console.log('student', student);
  setLoading(true);
  let data = {
    title,
    message:msg,
    studentId: student._id,
    status: 'active'
  }
  console.log('data', data);
  SupportApi.create(data).then(res=>{
message.success('Support Ticket Created');
setTitle('');
setMsg('');

    setLoading(false);
  })
}



  useEffect(() => {
    setLoading(false);
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
      if (response && response.data && response.data.systemId) {
        setStudent(response.data);
        message.success("Profile Loaded ",response.data);
        setLoading(false);
      }else{
        message.error("No Record found.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
              {/* <Form.Item
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
              </Form.Item> */}

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
              {student.systemId?.toUpperCase() || ''}
            </Tag></Descriptions.Item>
    {/* <Descriptions.Item label="Created At" span={2}>
    {student.createdAt ? new Date(student?.createdAt).toUTCString() : ''}
    </Descriptions.Item> */}
    <Descriptions.Item label="Account Status" span={3}>
      <Badge status={student.verified == true ? 'success':'warning'} text={student.verified == true ? 'Active':'Not Active'} />
    </Descriptions.Item>
    <Descriptions.Item label="Gender ">{student.sex}</Descriptions.Item>
    <Descriptions.Item label="Slip Photo">
      <Image src={student.slipPhoto ||'https://www.wkbn.com/wp-content/uploads/sites/48/2020/06/missing-generic.jpg'} style={{width:'250px'}} />
    </Descriptions.Item>
    {/* <Descriptions.Item label="Config Info">
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
    </Descriptions.Item> */}
  </Descriptions>

              
              </Col>
              <Col style={{margin:'10px'}}>
              <h2>Send Message To Support</h2>

              <Input  value={title} placeholder="title"  style={{marginBottom:'10px'}} onChange={(e)=> setTitle(e.target.value)} />
              <TextArea  value={msg} rows={3} placeholder="Write your Message!" onChange={(e)=> setMsg(e.target.value)}  />
              <Button style={{marginTop:'5px'}} onClick={onSubmit}>Send Message</Button>
              </Col>
            </Row>)
           
            
          }
        </div>
      )}
    </>
  );
}

export default StudentPortal;
