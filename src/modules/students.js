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
    toast({
      title: "Se ha solicitado conectar",
      description: "El Trainer podrá ver su solicitud",
      duration: 4000
    })
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const assignSpecialist = async (specialistId) => {
  try {
    const res = axios.post('/api/asign_specialist', {
      specialist_id: specialistId,
    });
    toast({
      title: "Se ha solicitado conectar",
      description: "El Especialista podrá ver su solicitud",
      duration: 1000
    })
    return res.data;

  } catch (err) {
    console.log(err);
    return err;
  }
};

export const isConnectedTrainer = async (trainerId) => {
  try {
    const response = await axios.post('/api/is_connected_trainer', {
      trainer_id: trainerId,
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const isConnectedSpecialist = async (specialistId) => {
  try {
    const response = await axios.post('/api/is_connected_specialist', {
      specialist_id: specialistId,
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}