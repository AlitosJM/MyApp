import { API } from './API';

const fetchFiles = (param1) => API.sendFile2(param1);

export const userAPI = {
    fetchFiles,
};