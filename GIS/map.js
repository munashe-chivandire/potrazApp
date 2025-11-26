// Initialize the map centered on Zimbabwe
const map = L.map('map', { zoomControl: false }).setView([-19.0154, 29.1549], 6);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);
