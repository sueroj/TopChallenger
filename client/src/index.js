import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import mapboxgl from 'mapbox-gl';
 
// mapboxgl.accessToken = 'pk.eyJ1Ijoic3Vlcm8zMjEiLCJhIjoiY2thbnZzdWdvMWVxZTJybzZ4ZGczYnZwYSJ9.SVHp7KD_q6G28YRVBCAyNw';
// const map = new mapboxgl.Map({
// container: 'map',
//         center: [52.18,0.17],
//         zoom: 10,
// style: 'mapbox://styles/mapbox/streets-v9'
// });

//JS Example
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
