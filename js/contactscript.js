// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzlasVy0R5esy9r5ufrVxI3AbZ-CUMeYE",
    authDomain: "fir-auth-2f530.firebaseapp.com",
    databaseURL: "https://fir-auth-2f530-default-rtdb.firebaseio.com",
    projectId: "fir-auth-2f530",
    storageBucket: "fir-auth-2f530.firebasestorage.app",
    messagingSenderId: "587961815536",
    appId: "1:587961815536:web:8bb5bffa413a7ac13a8d35",
    measurementId: "G-8H43JS4KBZ"
  };


  var app = firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  // Handle form submission
 document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Save to Firebase
  var newMessageRef = firebase.database().ref("reviews").push();
  newMessageRef
    .set({
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString(),
    })
    .then(() => {
      // Success notification
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for your feedback. We appreciate it!",
      });

      // Reset the form
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      // Warning notification
      Swal.fire({
        icon: "warning",
        title: "Error Sending Message",
        text: "Something went wrong. Please try again later.",
      });

      console.error("Error saving data:", error);
    });
});
