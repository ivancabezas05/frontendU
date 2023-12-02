import axios from 'axios';

const HOST_API = 'http://localhost:3001';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
    reserva: {
      list: () => '/reserva',
      detail: (id) => `/reserva/${id}`,
    },
    libro: {
      list: () => '/libro',
      detail: (id) => `/libro/${id}`,
    }
  };
