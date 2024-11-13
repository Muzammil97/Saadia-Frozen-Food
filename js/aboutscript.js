

  // Handle Contact Form Submission
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    // Save data to Firestore
    db.collection("contactMessages").add({
      name: name,
      email: email,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      // Show success message
      document.getElementById("submitMessage").style.display = "block";
      // Clear form fields
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  });
  