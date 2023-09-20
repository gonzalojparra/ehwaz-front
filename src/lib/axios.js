import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'User-Agent': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

export default axios;