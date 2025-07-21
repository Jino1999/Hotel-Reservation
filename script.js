document.getElementById("reservation-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const scriptURL = "https://script.google.com/macros/s/AKfycbwPasb4A5RtV7okeOSR8PuEeGRJ_KtVYTjfAZPbyES2H2Fci4lkg4axG4JsmmI_Vtw/exec";
  const form = e.target;
  const formData = new FormData(form);
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
        alert("✅ Reservation submitted successfully!");
        form.reset();

        // 🎯 Generate QR Code from form data
        const qrData = `
        Fullname: ${formData.get("Fullname")}
        Email: ${formData.get("contactEmail")}
        Phone: ${formData.get("contactPhoneNumber")}
        Guests: ${formData.get("guests")}
        Check-in: ${formData.get("checkin")}
        Message: ${formData.get("contactMessage")}`;

        const qrContainer = document.getElementById("qrCode");
        qrContainer.innerHTML = ""; // clear previous QR
        const qr = new QRCode(qrContainer, {
          text: qrData.trim(),
          width: 200,
          height: 200
        });

        // Wait for QR to render and then auto-download as image
        setTimeout(() => {
          const img = qrContainer.querySelector("img");
          if (img) {
            const link = document.createElement("a");
            link.href = img.src;
            link.download = "reservation_qr.png";
            link.click();
          }
        }, 500);
      } else {
        alert("❌ Failed to submit reservation.");
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      alert("⚠️ Submission error.");
    });
});
  const guestsError = document.getElementById("guestsError");
    const checkinError = document.getElementById("checkinError");

    let hasError = false;

    // Validate email
    if (!email) {
      emailError.textContent = "Email is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError.textContent = "Invalid email format.";
      hasError = true;
    } else {
      emailError.textContent = "";
    }

    // Validate fullname
    if (!fullname) {
      fullnameError.textContent = "Full name is required.";
      hasError = true;
    } else {
      fullnameError.textContent = "";
    }

    // Validate phone number
    if (!phone) {
      phoneError.textContent = "Phone number is required.";
      hasError = true;
    } else if (!/^\d{10,15}$/.test(phone)) {
      phoneError.textContent = "Invalid phone number format.";
      hasError = true;
    } else {
      phoneError.textContent = "";
    }

    // Validate message
    if (!message) {
      messageError.textContent = "Message is required.";
      hasError = true;
    } else {
      messageError.textContent = "";
    }

    // Validate guests
    if (!guests || guests <= 0) {
      guestsError.textContent = "Number of guests must be at least 1.";
      hasError = true;
    } else {
      guestsError.textContent = "";
    }

    // Validate check-in date
    if (!checkin) {
      checkinError.textContent = "Check-in date is required.";
      hasError = true;
    } else {
      checkinError.textContent = "";
    }

    // If no errors, show confirmation
    if (!hasError) {
      contactForm.style.display = "none";
      confirmationSection.classList.remove("hidden");
      
      // Optionally, you can also reset the form fields here
      contactForm.reset();
      
      // Close modal after showing confirmation
      setTimeout(closeModal, 2000); // Close after 2 seconds
    }
    confirmationSection.querySelector("p").textContent = "Booking confirmed!";