import Axios from 'axios';

const axFiles = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

export default axFiles;