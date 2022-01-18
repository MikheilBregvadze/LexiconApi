import axios from "axios";
import {GetBaseUrl, getItemFromLocalStorage} from "./common";

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
    return axios.post(GetBaseUrl() + '/Client/Login', data);
}

export const ClientAddWord = (data) => {
    return AuthorizedPost(GetBaseUrl() + '/Client/AddWord', data);
}

export const GetClientAllWords = () => {
    return AuthorizedGet(GetBaseUrl() + '/Client/GetAllWords');
}
console.log(GetBaseUrl());
export const DeleteWordById = (id) => {
    return AuthorizedDelete(GetBaseUrl() + '/Client/DeleteWord/' + id);
}

export const UpdatedWord = (id, data) => {
    return AuthorizedPut(GetBaseUrl() + '/Client/EditWord/' + id, data);
}

export const AddFavorite = (id) => {
    return AuthorizedPost(GetBaseUrl() + '/Client/AddFavorite/' + id);
}

export const GetFavoriteWords = (id) => {
    return AuthorizedGet(GetBaseUrl() + '/Client/GetFavoriteWords');
}

export const DeleteFavoriteWordById = (id) => {
    return AuthorizedDelete(GetBaseUrl() + '/Client/DeleteFavoriteWord/' + id);
}
