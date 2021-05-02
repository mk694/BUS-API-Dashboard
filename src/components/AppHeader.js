import React from "react";
// import { Layout, Menu } from "antd";
// import { useHistory } from "react-router-dom";
import { CloudFilled } from "@ant-design/icons";

function AppHeader() {
  // const history = useHistory();

  return (
    <div>
      <a href="/">
        <CloudFilled
          style={{
            color: "white",
            fontSize: 50,
          }}
          // onClick={() => history.push("/")}
        />
      </a>
      {/* <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item> */}
      {/* </Menu> */}
    </div>
  );
}

export default AppHeader;
