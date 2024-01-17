// ___Form background__

const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.fillStyle = "#5b0a6c";
    ctx.strokeStyle = "#5b0a6c";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// ___Listen to a click__

const particlesArray = [];
const numberOfParticles = 300;

for (let i = 0; i < numberOfParticles; i++) {
  particlesArray.push(new Particle());
}

function addParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle(x, y));
  }
}

canvas.addEventListener("click", (event) => {
  addParticles(event.clientX, event.clientY, 10);
});

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  const touch = event.touches[0];
  addParticles(touch.clientX, touch.clientY, 10);
});

function connectParticles(particles) {
  const distanceThreshold = 100;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < distanceThreshold) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${
          1 - distance / distanceThreshold
        })`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// ___Existing code__

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearCanvasBtn = document.getElementById("clearCanvasBtn");
clearCanvasBtn.addEventListener("click", () => {
  clearCanvas();
  particlesArray.length = 0;
});

// ___Existing code__

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  connectParticles(particlesArray);

  requestAnimationFrame(animate);
}

animate();

// For selecteted services
// Function to update selected service text
function updateSelectedService() {
  var selectedServiceText = document.querySelector("#selectedServiceText");
  var serviceSelect = document.querySelector("#serviceSelect");
  selectedServiceText.innerText =
    serviceSelect.options[serviceSelect.selectedIndex].text;
  console.log("Selected Service:", selectedServiceText.innerText);
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to submit the form
  function submitForm() {
    const firstName = document.querySelector('input[name="first_name"]').value;
    const lastName = document.querySelector('input[name="last_name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const mobile = document.querySelector('input[name="mobile"]').value;
    const selectedService = document.querySelector("#serviceSelect").value;
    const projectDescription = document.querySelector(
      'textarea[name="project_description"]'
    ).value;
    const fileInput = document.querySelector('input[name="file_upload"]');
    const failureMessage = document.getElementById("failureMessage");
    const successMessage = document.getElementById("successMessage");

    const formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("service", selectedService);
    formData.append("description", projectDescription);
    formData.append("file", fileInput.files[0]);
    console.log("For active");

    fetch("https://derex.onrender.com/contacts", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Response:", data);
        if (data.message === "Contact created successfully") {
          successMessage.style.display = "block";
          document.querySelector("form").reset();
          console.log("Form submitted successfully");
        } else {
          failureMessage.style.display = "block";
          console.log("Unable to  submite form");
        }
      });
    // .catch((error) => {
    //   console.error("Error:", error);
    //   error
    //     .text()
    //     .then((errorMessage) =>
    //       console.error("Error Message:", errorMessage)
    //     );
    // });
  }

  // Attach event listener to form submit
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });

  // Attach event listener to service select change
  document
    .querySelector("#serviceSelect")
    .addEventListener("change", function () {
      updateSelectedService();
    });
});
