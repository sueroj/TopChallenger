import axios from 'axios';
import * as config from 'api/config.json'



export function httpServices() {
        //Gets Challenges as json list. Used if data is lost due to refresh.
        axios.get(`${config.SERVER_URL}/challenges`)
        .then((response) => { 
            console.log(response.data);
          return response.data;
        })
        .catch ((e) => {
          console.log("Could not connect to server:", e);
          alert("A server error has occurred.");
        })
}