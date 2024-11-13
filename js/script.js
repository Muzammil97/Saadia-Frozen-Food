

var deliveryOptions = {
  1: "Block 1",
  2: "Block 2",
  3: "Block 3",
  4: "Block 4",
  5: "Block 5",
  6: "Block 6",
  7: "Block 7",
  8: "Block 8",
  9: "Other Block",
  other: "Other (Other Gulshan Block)"
};

function askDeliveryLocation() {
  Swal.fire({
    title: "Delivery Area Notice",
    text: "We only deliver to Gulshan-e-Iqbal Block All Block. Please select your block:",
    icon: "info",
    input: "select",
    inputOptions: deliveryOptions,
    inputPlaceholder: "Select your block",
    showCancelButton: false,
    confirmButtonText: "Confirm",
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: (selectedBlock) => {
      return new Promise((resolve, reject) => {
        if (!selectedBlock) {
          Swal.showValidationMessage("Please select a block to continue.");
          reject();
        } else {
          resolve(selectedBlock);
        }
      });
    }
  }).then((result) => {
    if (result.isConfirmed) {
      var selectedBlock = result.value;

      if (selectedBlock === "other") {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: "We can only deliver to Gulshan-e-Iqbal All Blocks Only.",
          confirmButtonText: "OK"
        });
      } else {
        // Save the selection to localStorage
        localStorage.setItem("deliveryBlock", selectedBlock);
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: `You selected Gulshan-e-Iqbal ${deliveryOptions[selectedBlock]}.`,
          confirmButtonText: "OK"
        });
      }
    }
  });
}

// On page load, check if delivery location is already saved
window.onload = function () {
  if (!localStorage.getItem("deliveryBlock")) {
    askDeliveryLocation();
  }
};

// Change delivery location functionality
document.getElementById("changeDeliveryLocation").addEventListener("click", () => {
  askDeliveryLocation();
});


document.getElementById("floatingButton").addEventListener("click", function () {
  Swal.fire({
    title: "Change Delivery Location",
    text: "Would you like to change your delivery location?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then((result) => {
    if (result.isConfirmed) {
      askDeliveryLocation(); // Assuming this function is defined in your script for changing the location
    }
  });
});