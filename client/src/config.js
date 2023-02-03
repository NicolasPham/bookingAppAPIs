import axios from 'axios';

export const axiosIntance = axios.create({
    baseURL: "https://nicolasbooking.herokuapp.com/api/"
})