import axios from '@/lib/axios';

export const getRequests = async () => {
    try {
      const res = await axios.get('/api/student_trainers');
      return res.data;
    } catch (error) {
      return error;
    }
  }