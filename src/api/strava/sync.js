// //import { CLIENT_ID, CLIENT_SECRET } from './api/client/client.json'; *** Works, comment out save usage rate ***
// import data from '../strava/fakeAuthReturn.json';

// console.log("Sync Start");
// let url = new URLSearchParams(document.location.search);
// let state = url.get("state");

// //   console.log("Sync Start");
// //   let url = new URLSearchParams(document.location.search);
// //   let state = url.get("state");
// //   let isLoggedIn = false;

//   if (url.get("error" === "access_denied")) {
//     //Enter user resolution here
//     console.log("API access denied. Possible user decline."); //dev only
//     return false;
//   } else if (state === "newauth") {
//       let code = url.get("code");
//       let scope = url.get("scope");

//       console.log("Access granted by user."); //dev only

//         // const response = await fetch(`https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
//         //    method: 'POST' });
//         // const data = await response.json(); *** Works, comment out save usage rate ***
        
//         console.log(data); //dev only
//         sessionStorage.setItem('userData', data);
//         sessionStorage.setItem('isLoggedIn', true);
//         return true;
//   }

// export default Sync;