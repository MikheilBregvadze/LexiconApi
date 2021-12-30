import axios from "axios";
import {getItemFromLocalStorage} from "./common";

export function AuthorizedGet(url) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.get(url,{
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedPost(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedDelete(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.delete(url, { data,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedPut(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.put(url, data, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export const ClientAuthorization = (data) => {
    return axios.post('/Api/Client/Login', data);
}

export const ClientAddWord = (data) => {
    return AuthorizedPost('/Api/Client/AddWord', data);
}

export const GetClientAllWords = () => {
    return AuthorizedGet('/Api/Client/GetAllWords');
}

export const DeleteWordById = (id) => {
    return AuthorizedDelete('/Api/Client/DeleteWord/' + id);
}

export const UpdatedWord = (id, data) => {
    return AuthorizedPut('/Api/Client/EditWord/' + id, data);
}
