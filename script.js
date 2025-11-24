// ------------------------------
// FIREBASE IMPORT
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
// FIREBASE CONFIG
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
// LIVE DATABASE LISTENER
// ------------------------------
onValue(ref(db, '/'), (snap) => {
    const data = snap.val();

    if (!data) return;

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

    // Apply AI only in Auto mode
    if (data.mode === "AUTO") {
        runAIMode(data);
    }
});


// ------------------------------
// AUTO MODE AI LOGIC
// ------------------------------
function runAIMode(data) {

    const temp = data.sensors.temperature;
    const light = data.sensors.light;
    const motion = data.sensors.motion;
    const gas = data.sensors.gas;

    // 🔥 EMERGENCY GAS SHUTDOWN
    if (gas > 400) {
        set(ref(db, 'fan'), "OFF");
        set(ref(db, 'light'), "OFF");
        set(ref(db, 'pirLight'), "OFF");
        set(ref(db, 'ai'), "⚠ GAS detected! All appliances turned OFF.");
        return;
    }

    // 🌡 TEMPERATURE LOGIC
    if (temp > 30) {
        set(ref(db, 'fan'), "ON");
        set(ref(db, 'ai'), "Temperature high → Fan ON");
    } else if (temp < 25) {
        set(ref(db, 'fan'), "OFF");
        set(ref(db, 'ai'), "Temperature low → Fan OFF");
    }

    // 💡 LIGHT SENSOR LOGIC
    if (light < 200) {
        set(ref(db, 'light'), "ON");
        set(ref(db, 'ai'), "Low light → Main Light ON");
    } else {
        set(ref(db, 'light'), "OFF");
        set(ref(db, 'ai'), "Bright environment → Main Light OFF");
    }

    // 👣 MOTION SENSOR LOGIC
    if (motion == 1) {
        set(ref(db, 'pirLight'), "ON");
        set(ref(db, 'ai'), "Motion detected → PIR Light ON");
    } else {
        set(ref(db, 'pirLight'), "OFF");
        set(ref(db, 'ai'), "No motion → PIR Light OFF");
    }
}


// ------------------------------
// MANUAL CONTROL BUTTONS
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
    set(ref(db, 'ai'), "Mode switched to " + state);
};
