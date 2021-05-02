import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import ContentDiv from "./dashboard/ContentDiv";

const { Header, Content, Sider } = Layout;
function AppLayout() {
  return (
    <>
      <Layout>
        <Header style={{ zIndex: 1, width: "100%" }}>
          <AppHeader />{" "}
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
    </>
  );
}

export default AppLayout;
