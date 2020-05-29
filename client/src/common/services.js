import React, { useState, useEffect} from 'react';
import * as config from '../api/config.json';
import axios from 'axios';

function useHttpGetChallenges() {
  const [ data, setData] = useState([]);

  useEffect (() => {
      //Gets Challenges as json list. Used if data is lost due to refresh.
      axios.get(`${config.SERVER_URL}/challenges`)
      .then((response) => {
        setData(response.data);
      })
      .catch ((e) => {
        console.log("Could not connect to server:", e);
      })
    }, [data]
  );

return data;
};

export default useHttpGetChallenges