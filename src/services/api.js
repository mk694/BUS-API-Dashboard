import Axios from "axios";

//config
const URL = "http://localhost:8080/";

const axios = Axios.create({
  baseURL: URL,
  timeout: 10000,
});

const axiosAuth = Axios.create({
  baseURL: URL,
  headers: { Authorization: "token" },
  timeout: 10000,
});

// Admin

export const Admin = {
  signUp: (data) => axios.post("/api/auth/signup", data),

  signIn: (data) => axios.post("/api/auth/signin", data),

  logOut: () => axios.get("/api/auth/logout"),
};

// DRIVERS

export const Drivers = {
  getAll: () => axiosAuth.get("/api/drivers/all"),
  post: (data) => axiosAuth.post("/api/drivers/add", data),
  getOne: (id) => axiosAuth.get(`/api/drivers/${id}`),
  update: (data, id) => axiosAuth.put(`/api/drivers/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/drivers/${id}`),
};

// DEPARTMENTS
export const Departments = {
  getAll: () => axiosAuth.get("/api/departments/all"),
  post: (data) => axiosAuth.post("/api/departments/add", data),
  getOne: (id) => axiosAuth.get(`/api/departments/${id}`),
  update: (data, id) => axiosAuth.put(`/api/departments/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/departments/${id}`),
};

// STUDENTS

export const Students = {
  getAll: () => axiosAuth.get("/api/students/all"),
  post: (data) => axiosAuth.post("/api/students/add", data),
  getOne: (id) => axiosAuth.get(`/api/students/${id}`),
  update: (data, id) => axiosAuth.put(`/api/students/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/students/${id}`),
};

// BUSES

export const Buses = {
  getAll: () => axiosAuth.get("/api/buses/all"),
  post: (data) => axiosAuth.post("/api/buses/add", data),
  getOne: (id) => axiosAuth.get(`/api/buses/${id}`),
  update: (data, id) => axiosAuth.put(`/api/buses/${id}`, data),
  delete: (id) => axiosAuth.delete(`/api/buses/${id}`),
};

// ROUTES
