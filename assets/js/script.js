// 'use strict';



// // element toggle function
// const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// // sidebar variables
// const sidebar = document.querySelector("[data-sidebar]");
// const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// // sidebar toggle functionality for mobile
// sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// // testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// // modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// // add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {

//   testimonialsItem[i].addEventListener("click", function () {

//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//     modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//     testimonialsModalFunc();

//   });

// }

// // add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// // custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }



// // contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }



// // page navigation variables
// const navigationLinks = document.querySelectorAll("[data-nav-link]");
// const pages = document.querySelectorAll("[data-page]");

// // add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }

//   });
// }

'use strict';

/* ================================
   Small helpers
================================ */
const norm = (s) => (s ?? "").toString().trim().toLowerCase();
const toggle = (el, cls) => el && el.classList.toggle(cls);

/* ================================
   Sidebar
================================ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => toggle(sidebar, "active"));
}

/* ================================
   Testimonials modal
================================ */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const openCloseModal = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {
  testimonialsItem.forEach((item) => {
    item.addEventListener("click", function () {
      const a = this.querySelector("[data-testimonials-avatar]");
      const t = this.querySelector("[data-testimonials-title]");
      const x = this.querySelector("[data-testimonials-text]");
      if (a && modalImg) { modalImg.src = a.src; modalImg.alt = a.alt || ""; }
      if (t && modalTitle) modalTitle.innerHTML = t.innerHTML;
      if (x && modalText) modalText.innerHTML = x.innerHTML;
      openCloseModal();
    });
  });
  modalCloseBtn.addEventListener("click", openCloseModal);
  overlay.addEventListener("click", openCloseModal);
}

/* ================================
   Custom select + filter buttons
================================ */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // (typo is from template)
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Always re-query items AFTER we inject projects
const getFilterItems = () => document.querySelectorAll("[data-filter-item]");

// Read "active" button once, if present; else null
let lastClickedBtn = document.querySelector("[data-filter-btn].active") || null;

select?.addEventListener("click", function () {
  this.classList.toggle("active");
});

selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const val = norm(this.textContent);
    if (selectValue) selectValue.textContent = this.textContent.trim();
    select?.classList.remove("active");
    filterFunc(val);

    // Keep buttons in sync (safe even if none match)
    filterBtn.forEach((btn) => {
      const match = norm(btn.textContent) === val;
      btn.classList.toggle("active", match);
      if (match) lastClickedBtn = btn;
    });
  });
});

function filterFunc(selectedValue) {
  const value = norm(selectedValue || "all");
  const items = getFilterItems();
  items.forEach((el) => {
    // Support single or multi categories (space/comma separated)
    const cats = norm(el.dataset.category).split(/[\s,]+/).filter(Boolean);
    const show = value === "all" || cats.includes(value);
    el.classList.toggle("active", show);
  });
}

filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const val = norm(this.textContent);
    if (selectValue) selectValue.textContent = this.textContent.trim();
    filterFunc(val);

    // Safely remove active from previous button
    if (lastClickedBtn && lastClickedBtn !== this) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/* ================================
   Contact form
================================ */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length) {
  const validate = () => {
    if (form.checkValidity()) {
      formBtn?.removeAttribute("disabled");
    } else {
      formBtn?.setAttribute("disabled", "");
    }
  };
  formInputs.forEach((input) => input.addEventListener("input", validate));
}

/* ================================
   Page navigation
================================ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach((link, idx) => {
    link.addEventListener("click", function () {
      pages.forEach((p, i) => {
        const match = this.innerHTML.toLowerCase() === p.dataset.page;
        p.classList.toggle("active", match);
        navigationLinks[i].classList.toggle("active", match);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

/* =========================================================
   NEW: Load projects.json -> About (Recent) + Portfolio
========================================================= */
function projectCardHTML(p) {
  const cat = norm(p.category || "all");
  return `
    <li class="project-item active" data-filter-item data-category="${cat}">
      <a href="${p.link || '#'}" target="_blank" rel="noopener">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </figure>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-category">${p.description || ""}</p>
      </a>
    </li>
  `;
}

async function loadProjects() {
  try {
    const res = await fetch("./data/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`projects.json HTTP ${res.status}`);
    const projects = await res.json();

    const recentEl = document.querySelector("[data-recent-list]");
    if (recentEl) {
      recentEl.innerHTML = projects.slice(0, 3).map(projectCardHTML).join("");
    }

    const portfolioEl = document.querySelector("[data-project-list]");
    if (portfolioEl) {
      portfolioEl.innerHTML = projects.map(projectCardHTML).join("");
    }

    // Apply currently selected filter (button or select), default 'all'
    const activeBtn = document.querySelector("[data-filter-btn].active");
    const selectedValue = activeBtn
      ? norm(activeBtn.textContent)
      : (selectValue ? norm(selectValue.textContent) : "all");
    filterFunc(selectedValue);

  } catch (e) {
    console.error("Failed to load projects.json:", e);
  }
}

loadProjects();
