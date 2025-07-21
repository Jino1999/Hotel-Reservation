document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("bookingModal");
  const openBtn = document.getElementById("openBookingModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modalContent = document.getElementById("modalContent");
  const contactForm = document.getElementById("contactForm");
  const confirmationSection = document.getElementById("confirmationSection");

  const scriptURL = "https://script.google.com/macros/s/AKfycbwPasb4A5RtV7okeOSR8PuEeGRJ_KtVYTjfAZPbyES2H2Fci4lkg4axG4JsmmI_Vtw/exec";

  // Open Modal with animation
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Trigger animation after 10ms
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  });

  function closeModal() {
    // Start hiding animation
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");

    // After transition duration, hide modal
    setTimeout(() => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
      contactForm.style.display = "";
      confirmationSection.classList.add("hidden");
    }, 300);
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("contactEmail").value.trim();
    const fullname = document.getElementById("Fullname").value.trim();
    const phone = document.getElementById("contactPhoneNumber").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const guests = document.getElementById("guests").value;
    const checkin = document.getElementById("checkin").value;

    const emailError = document.getElementById("contactEmailError");
    const fullnameError = document.getElementById("contactFullnameError");
    const phoneError = document.getElementById("contactPhoneNumberError");
    const messageError = document.getElementById("contactMessageError");
    const guestsError = document.getElementById("guestsError");
    const checkinError = document.getElementById("checkinError");

    let valid = true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Please enter a valid email.";
      emailError.classList.remove("hidden");
      valid = false;
    } else emailError.classList.add("hidden");

    if (!fullname) {
      fullnameError.textContent = "Fullname is required.";
      fullnameError.classList.remove("hidden");
      valid = false;
    } else fullnameError.classList.add("hidden");

    if (!phone || !/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) {
      phoneError.textContent = "Please enter a valid phone number.";
      phoneError.classList.remove("hidden");
      valid = false;
    } else phoneError.classList.add("hidden");

    if (!message) {
      messageError.textContent = "Message is required.";
      messageError.classList.remove("hidden");
      valid = false;
    } else messageError.classList.add("hidden");

    if (!guests) {
      guestsError.textContent = "Please select number of guests.";
      guestsError.classList.remove("hidden");
      valid = false;
    } else guestsError.classList.add("hidden");

    if (!checkin) {
      checkinError.textContent = "Please select a check-in date.";
      checkinError.classList.remove("hidden");
      valid = false;
    } else checkinError.classList.add("hidden");

    if (valid) {
      const formData = new FormData(contactForm);
      const urlEncoded = new URLSearchParams(formData);

      fetch(scriptURL, {
        method: "POST",
        body: urlEncoded,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
         .then((response) => {
   if (response.ok) {
     contactForm.style.display = "none";
     confirmationSection.classList.remove("hidden");
      confirmationSection.querySelector("p").textContent = "Booking confirmed!";

      setTimeout(() => {
       window.location.href = "index.html"; // Redirect back to your page
     }, 2000);
   } else {
     alert("❌ Submission failed. Please try again.");
   }
  })

        .catch((error) => {
          console.error("Error!", error.message);
          alert("⚠️ Network error. Please try again.");
        });
    }
  });
});
