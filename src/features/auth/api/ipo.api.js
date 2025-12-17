import api from "../../../config/axios.config";

export const getAllIpo = ()=>{
    return api.get('/api/ipo/get')
}

export const getIpoById = (id) => {
  return api.get(`/api/ipo/get/${id}`);
};

export const createIpo = (data) =>{
  return api.post('/api/ipo/create', data);
}