import { Typography } from "antd";
import AppModal from "../../../components/AppModal";

function Dashboard() {
  const { Title } = Typography;
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <AppModal />
    </div>
  );
}

export default Dashboard;
