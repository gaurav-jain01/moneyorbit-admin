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

export const updateIpo = (id, data) => {
  return api.put(`/api/ipo/update/${id}`, data);
};

export const updateIpoStatus = (id, status) => {
  return api.put(`/api/ipo/update-status/${id}`, { status });
};

export const deleteIpo = (id) => {
  return api.delete(`/api/ipo/delete/${id}`);
};