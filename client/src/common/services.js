import {SERVER_LOCATION} from "../api/config.json";
import axios from "axios";


export default class Services {
    

    // getProfile(id){
    //     axios.get(`${SERVER_LOCATION}/login?athleteId=${id}`)
    //     .then((response) => { 
    //       return response.data;
    //     })
    //     .catch ((e) => {
    //         console.log("Could not connect to server:", e);
    //     })
    // }

    // getUser(id){
    //     axios.get(`${SERVER_LOCATION}/login?athleteId=${id}`)
    //     .then((response) => {
    //         return response;
    //     }) 
    //     .catch ((e) => {
    //         console.log("Could not connect to server:", e);
    //     })
    // }

    // async getChallenges(){
    //     await axios.get(`${SERVER_LOCATION}/challenges`)
    //     .then((response) => {
    //         return response;
    //     }) 
    //     .catch ((e) => {
    //         console.log("Could not retrieve challenge list:", e);
    //     })
    // }

    async checkToken(){
        const user = sessionStorage.getItem();

    }
}