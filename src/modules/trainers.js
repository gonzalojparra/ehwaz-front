import axios from '@/lib/axios';

export const getTrainers = async () => {
  try {
    const res = await axios.get('/api/trainers');
    return res.data.trainers; // .trainers porque así lo devuelve la api
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTrainer = async (id) => {
  try {
    const res = await axios.get(`/api/trainers/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRequests = async () => {
  try {
    const res = await axios.get('/api/trainer_students');
    return res.data;
  } catch (error) {
    return error;
  }
}