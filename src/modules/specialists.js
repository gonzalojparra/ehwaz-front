import axios from '@/lib/axios';

export const getSpecialists = async () => {
  try {
    const res = await axios.get('/api/specialists');
    return res.data.specialists; // .specialists porque así lo devuelve la api
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getSpecialist = async (id) => {
  try {
    const res = await axios.get(`/api/specialists/${id}`);
    return res.data.data;
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

export const getSpecialistSocials = async (id) => {
  try {
    const res = await axios.get(`/api/get_specialist_socials/${id}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}