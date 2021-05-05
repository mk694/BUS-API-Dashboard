import { Layout } from "antd";
import { Redirect } from "react-router";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import ContentDiv from "./dashboard/ContentDiv";
import Login from "./Login";

const { Header, Content, Sider } = Layout;
function AppLayout() {
  return (
    <Layout>
      <Header
        style={{
          zIndex: 10,
          width: "100%",
          display: "flex",
          left: 2,
          align: "center",
          justifyContent: "space-between",
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
