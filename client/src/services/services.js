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
    return axios.post(GetBaseUrl() + '/Api/Client/Login', data);
}

export const ClientRegistration = (data) => {
    return axios.post(GetBaseUrl() + '/Api/Client/Register', data);
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

export const AddFavorite = (id) => {
    return AuthorizedPost('/Api/Client/AddFavorite/' + id);
}

export const GetFavoriteWords = () => {
    return AuthorizedGet('/Api/Client/GetFavoriteWords');
}

export const DeleteFavoriteWordById = (id) => {
    return AuthorizedDelete('/Api/Client/DeleteFavoriteWord/' + id);
}

export const AddSentence = (id, data) => {
    return AuthorizedPost('/Api/Client/AddSentences/' + id, data);
}

export const DeleteSentence = (wordId, sentenceId) => {
    return AuthorizedDelete(`/Api/Client/DeleteSentences/${wordId}/${sentenceId}`);
}