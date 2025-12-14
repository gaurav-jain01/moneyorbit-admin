import api from "../../../config/axios.config"

export const loginAdmin =(data) => {
    return api.post("api/admin/login", data);
}