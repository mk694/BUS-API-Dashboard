import React from "react";
// import { Layout, Menu } from "antd";
// import { useHistory } from "react-router-dom";
import { CloudFilled } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

function AppHeader() {
  const { Title } = Typography;
  const styles = {
    root: {
      display: "flex",
      // justifyContent: "'space-between',",
      // flexDirection: "row",
      // float: "right",

      // font: ""

      // flexGrow: 1,
    },
    color: {
      color: "white",
      float: "right",
    },
  };

  // const history = useHistory();
  const { Link } = Typography;
  return (
    <div style={styles.root}>
      <Link href="/">
        <Title style={styles.color}>Bus Management</Title>
      </Link>
    </div>
  );
}

export default AppHeader;
