// Firebase initialisieren (füge hier deine Firebase-Konfiguration ein)
const firebaseConfig = {
    apiKey: "AIzaSyAZZIerCwvYQ08jXZM4UK63tGFegVr5fmc",
    authDomain: "krimiritt.firebaseapp.com",
    projectId: "krimiritt",
    storageBucket: "krimiritt.firebasestorage.app",
    messagingSenderId: "460062836531",
    appId: "1:460062836531:web:86ce3626ce4022a839a046",
    measurementId: "G-S9RV7VQ8MB"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const trackTitle = document.getElementById('trackTitle');
const coverImage = document.getElementById('coverImage');

let currentTrackIndex = 0;
let tracks = [];

// Funktion zum Laden der Tracks aus Firestore
function loadTracks() {
    db.collection("tracks").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tracks.push(doc.data());
        });
        updatePlayer();
    }).catch((error) => {
        console.error("Fehler beim Laden der Tracks: ", error);
    });
}

// Funktion zum Aktualisieren des Players
function updatePlayer() {
    if (tracks.length > 0) {
        const currentTrack = tracks[currentTrackIndex];
        audioPlayer.src = currentTrack.audioUrl; // Setze die Audio-URL
        trackTitle.textContent = currentTrack.title; // Setze den Titel
        coverImage.src = currentTrack.coverUrl; // Setze die Cover-URL
    }
}

// Event-Listener für Play- und Pause-Buttons
playButton.addEventListener('click', () => {
    audioPlayer.play();
});

pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
});

// Funktion zum nächsten Track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updatePlayer();
}

// Event-Listener für das Ende des Tracks
audioPlayer.addEventListener('ended', nextTrack);

// Lade die Tracks beim Start
loadTracks();