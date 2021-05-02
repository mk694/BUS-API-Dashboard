import axios from "axios";

const URL = "http://localhost:8080/api";

/* ADMIN(user) */
export class ApiService {
  createUser = function (data) {
    return axios.post(`${URL}/auth/signup`, data);
  };
}

/* DRIVERS */

// GET ALL DRIVERS

// DEPARTMENTS

// STUDENTS

// BUSES

// ROUTES
