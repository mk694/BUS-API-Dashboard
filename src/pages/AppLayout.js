import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import ContentDiv from "./dashboard/ContentDiv";

const { Header, Content, Sider } = Layout;
function AppLayout() {
  const history = useHistory();

  useEffect(() => {
    const loginHandler = () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token == null) return history.push("/login");
    };
    return loginHandler();
  }, []);

  return (
    <Layout>
      <Header
        style={{
          zIndex: 10,
          width: "100%",
        }}
      >
        <AppHeader />
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 599,
              align: "center",
            }}
          >
            <ContentDiv />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
