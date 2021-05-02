import { Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
// ShopOutlined,
// TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to="/admin">Admin</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link to="/buses">Buses </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
          <Link to="/departments">Departments</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CloudOutlined />}>
          <Link to="/drivers">Drivers</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreOutlined />}>
          <Link to="/students">Students</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<AppstoreOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<AppstoreOutlined />}>
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      </Menu>
      {/* <Menu.Item key="7" icon={<UserOutlined />}>
        <Link to="/Login">Login</Link>
      </Menu.Item>
      <Menu.Item key="8" icon={<UserOutlined />}>
        <Link to="/Signup">Signup</Link>
      </Menu.Item> */}

      {/* <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout> */}
    </>
  );
}

export default Sidebar;
