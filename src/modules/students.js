import axios from '@/lib/axios';

export const getRequests = async () => {
  try {
    const res = await axios.get('/api/student_trainers');
    return res.data;
  } catch (error) {
    return error;
  }
}

export const assignTrainer = async (trainerId) => {
  try {
    const res = axios.post('/api/asign_trainer', {
      trainer_id: trainerId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const isConnectedTrainer = async (trainerId) => {
  try {
    const res = axios.post('/api/is_connected_trainer', {
      trainer_id: trainerId,
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}