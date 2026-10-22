// --- Continuous & Repeatable Scroll Reveal Animations ---
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Screen par aane par animate karein
        entry.target.classList.add("reveal-active");
      } else {
        // Screen se bahar jaane par reset karein taaki dobara scroll karne par animation PHIR HO!
        entry.target.classList.remove("reveal-active");
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-top, .reveal-zoom, .reveal-flip",
  );
  elementsToAnimate.forEach((el) => revealObserver.observe(el));
});

// Detailed Modal Specs
const projectsDatabase = {
  proj1: {
    title: "E-Commerce Product Ordering System",
    desc: "Designed and engineered a complete full-stack product ordering pipeline supporting dynamic catalogs, shopping carts, billing checkout, and order updates as part of a remote internship[cite: 3, 4].",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js/PHP", "MySQL"],
    features: [
      "Real-time catalog filter & search",
      "Persistent LocalStorage cart workflows",
      "Checkout & automated order confirmation",
      "Relational database structure for orders",
    ],
    github: "https://github.com/umarraja61933/CodeAlpha_ShopEase",
  },
  proj2: {
    title: "Mini Social Media Platform",
    desc: "Built an interactive social network platform enabling core user interactions such as follow/unfollow functionality, post creation, dynamic liking, and commenting systems[cite: 3, 4].",
    tech: ["JavaScript", "Full-Stack Dev", "MySQL", "UI/UX"],
    features: [
      "User registration & profile feeds",
      "Dynamic Like & Comment mechanics",
      "Follow/Unfollow system",
      "Responsive media feed cards",
    ],
    github: "https://github.com/umarraja61933/CodeAlpha_SocialMediaPlatform",
  },
  proj3: {
    title: "AI-Powered Agriculture Advisor (FYP)",
    desc: "Developed a Flutter-based mobile application powered by Python backend and MySQL for smart agricultural decision-making[cite: 4].",
    tech: ["Flutter", "Python Backend", "MySQL", "AI Advisory"],
    features: [
      "Smart crop yield advisory algorithms",
      "Python machine learning integration",
      "Clean cross-platform mobile UI",
    ],
    github: null,
  },
  proj4: {
    title: "Food Recipe & Bakery Web Platform",
    desc: "Developed a frontend web application for browsing bakery items, detailing ingredients, and recipe instructions[cite: 4].",
    tech: ["HTML5", "CSS Grid", "JavaScript UI"],
    features: [
      "Interactive recipe search",
      "Ingredient calculator UI",
      "Clean, appetite-friendly responsive design",
    ],
    github: null,
  },
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPills = document.getElementById("modalPills");
const modalFeatures = document.getElementById("modalFeatures");
const modalLinks = document.getElementById("modalLinks");

function openModal(id) {
  const data = projectsDatabase[id];
  if (data) {
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalPills.innerHTML = data.tech
      .map((t) => `<span class="pill-badge">${t}</span>`)
      .join(" ");

    modalFeatures.innerHTML = `
            <h4 style="margin: 15px 0 8px; color: var(--cyan);">Key Features & Architecture:</h4>
            <ul style="padding-left: 20px; color: var(--text-sub); font-size: 14px;">
                ${data.features.map((f) => `<li style="margin-bottom: 4px;">${f}</li>`).join("")}
            </ul>
        `;

    if (data.github) {
      modalLinks.innerHTML = `<a href="${data.github}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View GitHub Repository</a>`;
    } else {
      modalLinks.innerHTML = `<span style="color: var(--text-sub); font-size: 13px; font-style: italic;">* Repository link is managed under academic or private organization access.</span>`;
    }

    modal.style.display = "flex";
  }
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

// Real AJAX Email Form Submission (Formspree Integration)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    formStatus.style.color = "var(--cyan)";
    formStatus.style.marginTop = "12px";
    formStatus.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending message directly to email...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.style.color = "#27c93f";
        formStatus.innerHTML =
          '<i class="fa-solid fa-circle-check"></i> Success! Message delivered to Amna\'s Inbox.';
        contactForm.reset();
      } else {
        formStatus.style.color = "#ff5f56";
        formStatus.textContent =
          "Oops! There was a problem sending your message.";
      }
    } catch (error) {
      formStatus.style.color = "#ff5f56";
      formStatus.textContent = "Network error. Please try again later.";
    }

    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });
}
