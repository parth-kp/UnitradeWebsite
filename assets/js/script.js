"use strict";

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      // Replace with actual Google Form entry IDs
      const formEntries = new URLSearchParams();
      formEntries.append("entry.1075323873", formData.get("name"));
      formEntries.append("entry.1314436605", formData.get("email"));
      formEntries.append("entry.1885307535", formData.get("message"));

      // Google Form URL
      const googleFormUrl =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLScfeL0HB5vf4aIvbGOa5rAd7cx8RM41USStq3iW0U0zLfQ9Bw/formResponse";

      fetch(googleFormUrl, {
        method: "POST",
        body: formEntries,
        mode: "no-cors", // Important for Google Forms
      })
        .then(() => {
          const customAlert = document.getElementById("customAlert");
          customAlert.textContent = "Thank you! Message sent successfully.";
          customAlert.classList.add("show");
          customAlert.classList.remove("error");
          customAlert.classList.remove("warning");
          form.reset();
          setTimeout(() => {
            customAlert.classList.remove("show");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error!", error);
          customAlert.innerHTML =
            'Oops! Error Occurred, Please Contact us at <b style="color: yellow;">support@unitradenexus.com</b> (Copied)';
          navigator.clipboard.writeText("support@unitradenexus.com");
          customAlert.classList.add("show");
          customAlert.classList.add("error");
          customAlert.classList.remove("warning");
          setTimeout(() => {
            customAlert.classList.remove("show");
            customAlert.classList.remove("error");
          }, 5000);
        });
    });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const customAlert = document.getElementById("customAlert");
    customAlert.textContent = "Email Copied";
    customAlert.classList.add("show");
    customAlert.classList.add("warning");
    customAlert.classList.remove("error");
    setTimeout(() => {
      customAlert.classList.remove("show");
      customAlert.classList.remove("warning");
    }, 2000);
  });
}