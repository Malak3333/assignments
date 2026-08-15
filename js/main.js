import { assignments } from "./assignments.js";

function buildNavigation() {
     const nav = document.getElementById("main-nav");
     if (!nav) return;

     const currentPath = window.location.pathname;
     const isSubfolder = currentPath.includes("/assignment");
     const prefix = isSubfolder ? "../" : "./";
     nav.innerHTML = "";

     assignments.forEach(item => {
          const link = document.createElement("a");
          link.href = prefix + item.link;
          link.textContent = item.title;

          if (currentPath.endsWith(item.link) || (currentPath.endsWith("/") && item.id === "home")) {
               link.classList.add("active");
          }

          nav.appendChild(link);
     });
}
function renderCards() {
     const cards = document.getElementById("cards");
     if (!cards) return;

     const currentPath = window.location.pathname;
     const isSubfolder = currentPath.includes("/assignment");
     const prefix = isSubfolder ? "../" : "./";

     cards.innerHTML = "";

     assignments.forEach(item => {
          if (item.id !== "home") {
               const article = document.createElement("article");
               article.classList.add("card");
               article.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
               `;
               cards.appendChild(article);
          }

          cards.appendChild(card);
     });
}

document.addEventListener("DOMContentLoaded", () => {
     buildNavigation();
     renderCards();
});
