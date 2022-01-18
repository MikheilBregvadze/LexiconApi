import axios from "axios";
import {GetBaseUrl, getItemFromLocalStorage} from "./common";

export function AuthorizedGet(url) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.get(GetBaseUrl() + url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedPost(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.post(GetBaseUrl() + url, data, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedDelete(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.delete(GetBaseUrl() + url, { data,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export function AuthorizedPut(url, data) {
    let accessToken = getItemFromLocalStorage('accessToken');
    return axios.put(GetBaseUrl() + url, data, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

export const ClientAuthorization = (data) => {
    return axios.post('/Client/Login', data);
}

export const ClientAddWord = (data) => {
    return AuthorizedPost('/Client/AddWord', data);
}

export const GetClientAllWords = () => {
    return AuthorizedGet('/Client/GetAllWords');
}

export const DeleteWordById = (id) => {
    return AuthorizedDelete('/Client/DeleteWord/' + id);
}

export const UpdatedWord = (id, data) => {
    return AuthorizedPut('/Client/EditWord/' + id, data);
}

export const AddFavorite = (id) => {
    return AuthorizedPost('/Client/AddFavorite/' + id);
}

export const GetFavoriteWords = (id) => {
    return AuthorizedGet('/Client/GetFavoriteWords');
}

export const DeleteFavoriteWordById = (id) => {
    return AuthorizedDelete('/Client/DeleteFavoriteWord/' + id);
}
