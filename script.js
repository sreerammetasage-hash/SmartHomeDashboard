// ------------------------------
// FIREBASE CDN IMPORT
// ------------------------------
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { 
    getDatabase, 
    ref, 
    set, 
    onValue 
} 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


// ------------------------------
// YOUR FIREBASE CONFIG
// ------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAFBFu6HQ6er6cFvF6kRTJdd0YgU75xtP0",
  authDomain: "smart-home-dashboard-3f5b2.firebaseapp.com",
  databaseURL: "https://smart-home-dashboard-3f5b2-default-rtdb.firebaseio.com",
  projectId: "smart-home-dashboard-3f5b2",
  storageBucket: "smart-home-dashboard-3f5b2.firebasestorage.app",
  messagingSenderId: "967923717630",
  appId: "1:967923717630:web:1c52a975d5c446e53f9caf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ------------------------------
// LIVE DATABASE READING
// ------------------------------
onValue(ref(db, '/'), (snap) => {
    const data = snap.val();

    // Mode
    document.getElementById("modeStatus").innerText = data.mode;

    // Appliances
    document.getElementById("fanStatus").innerText = data.fan;
    document.getElementById("lightStatus").innerText = data.light;
    document.getElementById("pirLightStatus").innerText = data.pirLight;

    // Sensors
    document.getElementById("tempVal").innerText = data.sensors.temperature;
    document.getElementById("lightVal").innerText = data.sensors.light;
    document.getElementById("motionVal").innerText = data.sensors.motion;
    document.getElementById("gasVal").innerText = data.sensors.gas;

    // AI Status
    document.getElementById("aiStatus").innerText = data.ai;
});


// ------------------------------
// WRITE DATA (BUTTONS)
// ------------------------------
window.setFan = function(state) {
    set(ref(db, 'fan'), state);
};

window.setLight = function(state) {
    set(ref(db, 'light'), state);
};

window.setPirLight = function(state) {
    set(ref(db, 'pirLight'), state);
};

window.setMode = function(state) {
    set(ref(db, 'mode'), state);
};
