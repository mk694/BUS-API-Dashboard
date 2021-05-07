import Axios from "axios";

//config
const URL = "http://localhost:8080/";

const axios = Axios.create({
  baseURL: URL,
  timeout: 10000,
});

const getToken = localStorage.getItem("token");

const axiosAuth = Axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${getToken}` },
  timeout: 10000,
});

// Admin

export const Admin = {
  signUp: async (data) => await axios.post("/api/auth/signup", data),

  signIn: async (data) => await axios.post("/api/auth/signin", data),

  logOut: async () => await axiosAuth.get("/api/auth/logout"),
};

// DRIVERS

export const DriverApi = {
  getAll: async () => await axiosAuth.get("/api/drivers/all"),
  create: async (data) => await axiosAuth.post("/api/drivers/add", data),
  getOne: async (id) => await axiosAuth.get(`/api/drivers/${id}`),
  update: async (id, data) => await axiosAuth.put(`/api/drivers/${id}`, data),
  delete: async (id) => await axiosAuth.delete(`/api/drivers/${id}`),
};

// DEPARTMENTS
export const DepartmentApi = {
  getAll: async () => await axios.get("/api/departments/all"),
  create: async (data) => await axiosAuth.post("/api/departments/add", data),
  getOne: async (id) => await axiosAuth.get(`/api/departments/${id}`),
  update: async (id, data) =>
    await axiosAuth.put(`/api/departments/${id}`, data),
  delete: async (id) => await axiosAuth.delete(`/api/departments/${id}`),
};

// STUDENTS

export const StudentApi = {
  getAll: async () => await axiosAuth.get("/api/students/all"),
  create: async (data) => await axiosAuth.post("/api/students/add", data),
  getOne: async (id) => await axiosAuth.get(`/api/students/${id}`),
  update: async (id, data) => await axiosAuth.put(`/api/students/${id}`, data),
  delete: async (id) => await axiosAuth.delete(`/api/students/${id}`),
};

// BUSES

export const BusApi = {
  getAll: async () => axiosAuth.get("/api/buses/all"),
  create: async (data) => axiosAuth.post("/api/buses/add", data),
  getOne: async (id) => axiosAuth.get(`/api/buses/${id}`),
  update: async (id, data) => axiosAuth.put(`/api/buses/${id}`, data),
  delete: async (id) => axiosAuth.delete(`/api/buses/${id}`),
};

// ROUTES
// DEPARTMENTS
export const RouteApi = {
  getAll: async () => await axios.get("/api/departments/all"),
  create: async (data) => await axiosAuth.post("/api/departments/add", data),
  getOne: async (id) => await axiosAuth.get(`/api/departments/${id}`),
  update: async (id, data) =>
    await axiosAuth.put(`/api/departments/${id}`, data),
  delete: async (id) => await axiosAuth.delete(`/api/departments/${id}`),
};
