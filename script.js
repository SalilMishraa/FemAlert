// ========== SOS Call Handler ==========
function triggerSOS() {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "tel:100";
    } else {
      alert("Cannot make a call");
    }
  }
  
  // ========== Contact Form Submission Handler ==========
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("form");
  
    if (contactForm && contactForm.id === "contact-form") {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you! Your message has been received.");
        contactForm.reset();
      });
    }
  });
  
  // ========== Fake Call Button ==========
  function triggerFakeCall() {
    alert("📞 Fake Call initiated!\nLive location sent to emergency contacts.");
  }
  
  // ========== Mobile Navigation Toggle ==========
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("mobile-menu");
  
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");
      });
    }
  });
  
 // ========== Overseers page ==========
 document.getElementById("overseerForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const response = await fetch("/api/overseers/register", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  alert(result.message);
});

async function findOverseers() {
  const response = await fetch("/api/overseers/find");
  const data = await response.json();

  const container = document.getElementById("overseerResults");
  container.innerHTML = data.map(o => `
    <div class="p-4 border rounded mb-2">
      <strong>${o.name}</strong> <br/>
      📍 ${o.address} <br/>
      📞 ${o.contact}
    </div>
  `).join('');
}     