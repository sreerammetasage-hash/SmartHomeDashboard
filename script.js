// AUTO/MANUAL TOGGLE
const modeToggle = document.getElementById("modeToggle");
const modeStatus = document.getElementById("modeStatus");

modeToggle.addEventListener("change", () => {
    if (modeToggle.checked) {
        modeStatus.innerText = "MANUAL";
        modeStatus.style.color = "#ffdd00";
    } else {
        modeStatus.innerText = "AUTO";
        modeStatus.style.color = "#00eaff";
    }
});

// Appliance buttons (UI only for now)
const fanState = document.getElementById("fanState");
const lightState = document.getElementById("lightState");
const pirLightState = document.getElementById("pirLightState");

document.getElementById("fanBtn").onclick = () => {
    fanState.innerText = fanState.innerText === "ON" ? "OFF" : "ON";
};

document.getElementById("lightBtn").onclick = () => {
    lightState.innerText = lightState.innerText === "ON" ? "OFF" : "ON";
};

document.getElementById("pirLightBtn").onclick = () => {
    pirLightState.innerText = pirLightState.innerText === "ON" ? "OFF" : "ON";
};

// Placeholder sensor values
document.getElementById("tempVal").innerText = "32 °C";
document.getElementById("lightVal").innerText = "Bright";
document.getElementById("motionVal").innerText = "No Motion";
document.getElementById("gasVal").innerText = "Safe";

document.getElementById("aiStatus").innerText = "Monitoring Environment…";
