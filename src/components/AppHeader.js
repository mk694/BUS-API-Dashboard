import React from "react";
// import { Layout, Menu } from "antd";
// import { useHistory } from "react-router-dom";
import { Typography } from "antd";

function AppHeader() {
  const { Title } = Typography;
  const { Link } = Typography;
  const styles = {
    color: {
      color: "white",
    },
  };

  return (
    <div>
      <div>
        <Link href="/">
          <Title style={styles.color}>Bus Management</Title>
        </Link>
      </div>
    </div>
  );
}

export default AppHeader;
