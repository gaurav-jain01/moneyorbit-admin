import api from "../../../config/axios.config";

export const getAllIpo = ()=>{
    return api.get('api/ipo/get')
}
