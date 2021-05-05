import { Divider, Menu, message, Modal } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  // ShopOutlined,
  // TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  CarFilled,
  EnvironmentFilled,
  SkinFilled,
  ExclamationCircleOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const { confirm } = Modal;

  console.log(location.pathname);
  function showConfirm() {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      centered: "true",
      okText: "Log out",
      content: "You will be redirected to Login Page",
      onOk() {
        try {
          localStorage.removeItem("Token");
          localStorage.removeItem("user");
          history.push("/login");
          message.warning("Logged out");
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        history.push(`${location.pathname}`);
      },
    });
  }

  return (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={location.pathname}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item
          key="/app"
          icon={
            <>
              <BarChartOutlined />
            </>
          }
        >
          <Link to="/app">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/app/admin" icon={<VideoCameraOutlined />}>
          <Link to="/app/admin">Admin</Link>
        </Menu.Item>
        <Menu.Item key="/app/buses" icon={<CarFilled />}>
          <Link to="/app/buses">Buses </Link>
        </Menu.Item>
        <Menu.Item key="/app/departments" icon={<AppstoreOutlined />}>
          <Link to="/app/departments">Departments</Link>
        </Menu.Item>
        <Menu.Item key="/app/drivers" icon={<SkinFilled />}>
          <Link to="/app/drivers">Drivers</Link>
        </Menu.Item>
        <Menu.Item key="/app/students" icon={<TeamOutlined />}>
          <Link to="/app/students">Students</Link>
        </Menu.Item>
        <Menu.Item key="/app/routes" icon={<EnvironmentFilled />}>
          <Link to="/app/routes">Routes</Link>
        </Menu.Item>

        <Menu.Item
          key="/app/logout"
          danger
          onClick={() => showConfirm()}
          defaultActiveFirst
          className
          style={{
            marginTop: '"15px"',

            fontSize: "1.2rem",
          }}
          icon={<LogoutOutlined />}
        >
          <Link to="/app/logout">LogOut</Link>
        </Menu.Item>
      </Menu>
      {/* <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout> */}
    </>
  );
}

export default Sidebar;
