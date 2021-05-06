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
  headers: { Authorization: `Bearer  ${getToken}` },
  timeout: 10000,
});

// Admin

export const Admin = {
  signUp: (data) => axios.post("/api/auth/signup", data),

  signIn: (data) => axios.post("/api/auth/signin", data),

  logOut: () => axiosAuth.get("/api/auth/logout"),
};

// DRIVERS

export const DriverApi = {
  getAll: () => axiosAuth.get("/api/drivers/all"),
  create: (data) => axiosAuth.post("/api/drivers/add", data),
  getOne: (id) => axiosAuth.get(`/api/drivers/${id}`),
  update: (id, data) => axiosAuth.put(`/api/drivers/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/drivers/${id}`),
};

// DEPARTMENTS
export const DepartmentApi = {
  getAll: () => axios.get("/api/departments/all"),
  create: (data) => axiosAuth.post("/api/departments/add", data),
  getOne: (id) => axiosAuth.get(`/api/departments/${id}`),
  update: (id, data) => axiosAuth.put(`/api/departments/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/departments/${id}`),
};

// STUDENTS

export const StudentApi = {
  getAll: () => axiosAuth.get("/api/students/all"),
  create: (data) => axiosAuth.post("/api/students/add", data),
  getOne: (id) => axiosAuth.get(`/api/students/${id}`),
  update: (id, data) => axiosAuth.put(`/api/students/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/students/${id}`),
};

// BUSES

export const BusApi = {
  getAll: () => axiosAuth.get("/api/buses/all"),
  create: (data) => axiosAuth.post("/api/buses/add", data),
  getOne: (id) => axiosAuth.get(`/api/buses/${id}`),
  update: (id, data) => axiosAuth.put(`/api/buses/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/buses/${id}`),
};

// ROUTES
