// Firebase configuration



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
