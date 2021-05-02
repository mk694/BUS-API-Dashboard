import React from "react";
import { Button, Table, Typography } from "antd";
// import axios from "axios";
// import { ApiBus } from "../../../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Buses() {
  // const [totalBuses, setTotalBuses] = useState([]);

  const { Title } = Typography;
  //Add columns here
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "AssignedRoute",
      dataIndex: "assignedRoute",
      key: "assignedRoute",
    },
    {
      title: "AssignedDriver",
      dataIndex: "assignedDriver",
      key: "assignedDriver",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: () => (
        <>
          <EditOutlined
            style={{
              color: "blue",
            }}
          />
          <DeleteOutlined
            style={{
              color: "red",
              marginLeft: "20px",
            }}
          />
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Muhammd Moin",
      capacity: "capacity",
      assignedRoute: "Islamabad",
      assignedDriver: "Sohail",
    },
  ];

  return (
    <div>
      <Title level={2}>Buses</Title>
      <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
      >
        Add Item
      </Button>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
}

export default Buses;

// const data =[ totalBuses.map((bus) => {
//   return {
//     key: bus._id,
//     name: bus.name,
//     capacity: bus.capacity,
//   };
// });]

// useEffect(() => {
//   const getAllBuses = async () => {
//     const res = await axios.get(`http://localhost:8080/api/buses/all`);
//     console.log(res);

//     return res;
//   };
//   return getAllBuses;
// }, []);
