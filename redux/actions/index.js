import axios from "axios";
export const POST_USER = "POST_USER";
export const GET_ALL_USUARIOS = "GET_ALL_USUARIOS";
export const PUT_USUARIO = "PUT_USUARIO";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";


//const app = "https://erick-guerrero-back-production.up.railway.app";

const app = "https://back-production-3b46.up.railway.app";

//const app = "http://localhost:3001";


// const token = localStorage.getItem('token');

axios.defaults.baseURL = app;

// Interceptor para agregar el token en el encabezado de las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtén el token de tu almacenamiento (puedes ajustarlo según tu implementación)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Agrega el token en el encabezado
    }
    const userId = localStorage.getItem("userid"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    const email = localStorage.getItem("email"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    const name = localStorage.getItem("name"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    if (email) {
      config.headers["Email"] = email; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    if (name) {
      config.headers["Name"] = name; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    if (userId) {
      config.headers["userid"] = userId; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }

);

export const postUser = (values) => {
  return async function () {
    try {
      console.log(values);
      await axios.post(`${app}/user`, values);
      return { type: POST_USER, payload: { ...values } };
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsuarios = () => {
  return async function (dispatch) {
    const usuarios = await axios.get(`${app}/user`);
    return dispatch({ type: GET_ALL_USUARIOS, payload: usuarios.data });
  };
};

export const putUsuario = (id, data) => {
  return async function () {
    try {
      await axios.put(`${app}/user/${id}`, data);
      return { type: PUT_USUARIO };
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${app}/login`, {
      email,
      password,
    });
    // console.log(data.data.id);
    localStorage.setItem("userid", data.data.id);
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("name", data.data.name);
    localStorage.setItem("email", data.data.email);
    // localStorage.setItem("imgUrl", data.imgUrl);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

