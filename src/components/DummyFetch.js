import { API } from './API';

const fetchFiles = (param1, param2) => API.sendFile2(param1, param2);

export const userAPI = {
    fetchFiles,
};