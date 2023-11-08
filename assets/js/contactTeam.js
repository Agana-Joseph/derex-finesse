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

// ___FORM__
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");
  console.log(form);

  form.addEventListener("submit", function (e) {
    console.log(e);
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const services = formData.get("role");
    const recommend = formData.get("decision");
    const experience = formData.get("role2");

    // values of the checkboxes individually
    const customerCareService = formData.get("frontend");
    const dataVisualization = formData.get("data");
    const businessManagement = formData.get("gitter");
    const marketingSystem = formData.get("meetups");
    const additionalServices = formData.get("courses");

    const comment = formData.get("comments");

    console.log(formData);

    // Collected form data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Selected Service:", services);
    console.log("Recommend:", recommend);
    console.log("Favorite Experience:", experience);
    console.log("Improvement - Customer Care Service:", customerCareService);
    console.log("Improvement - Data Visualization:", dataVisualization);
    console.log("Improvement - Business Management:", businessManagement);
    console.log("Improvement - Marketing System:", marketingSystem);
    console.log("Improvement - Additional Services:", additionalServices);
    console.log("Comments:", comment);

    fetch("https://ebube-authapi-kj6m.onrender.com/api/users/service", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log("Login successful!");
          alert("Thanks for your response we'll get back to you shortly.");
          window.location.href = "/about.html";
        } else {
          alert("Form submission failed. Please try again.");
        }
      })
      .catch((error) => {
        // Error message
        console.error("Form submission error:", error);
        alert("Form submission failed. Please try again.");
      });
  });
});
