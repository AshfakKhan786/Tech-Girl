let clickCount = 0;
const maxClicks = 5;
const counterText = document.getElementById("counter");
const shareBtn = document.getElementById("whatsappShare");
const form = document.getElementById("registrationForm");
const thankyouMessage = document.getElementById("thankyouMessage");

// Disable if already submitted
if (localStorage.getItem("submitted")) {
  form.style.display = "none";
  thankyouMessage.classList.remove("hidden");
}

shareBtn.addEventListener("click", () => {
  if (clickCount < maxClicks) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");

    clickCount++;
    counterText.textContent = `Click count: ${clickCount}/${maxClicks}`;

    if (clickCount === maxClicks) {
      alert("Sharing complete. Please continue.");
    }
  } else {
    alert("You have completed sharing.");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < maxClicks) {
    alert("Please complete sharing on WhatsApp (5 times) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const screenshot = document.getElementById("screenshot").files[0];

  // Prepare form data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshot);

  // Replace with your actual Google Apps Script Web App URL
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbx-nAKjFybBUZPCF4UnGFQDEQ7EdcBGb-wgfPWfrC0PNr_9v_rgoSm2xobrPS87RU_Y/exec";

  try {
    await fetch(googleScriptURL, {
      method: "POST",
      body: formData
    });

    // Disable form
    form.reset();
    form.style.display = "none";
    thankyouMessage.classList.remove("hidden");

    // Set localStorage flag
    localStorage.setItem("submitted", "true");

  } catch (error) {
    alert("Error submitting form. Please try again.");
    console.error("Submission error:", error);
  }
});
