import { Form, Input, Button, message, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Admin } from "../services/api";

function Login() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
    try {
      setLoading(true);
      const response = await Admin.signIn(values);
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        message.success("Logged in!");
        setIsLoggedIn(true);
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
            Log In
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
                  Submit
                </Button>
              </Form.Item>
            </div>
            <div
              style={{
                marginLeft: "6.3rem",
              }}
            >
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default Login;
