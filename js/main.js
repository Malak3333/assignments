const nav = document.getElementById("main-nav");

const currentPath = window.location.pathname;
let prefix = "";

if (currentPath.includes("/assignment1/")) {
     prefix = "../";
} else if (currentPath.includes("/assignment2/")) {
     prefix = "../";
} 

assignments.forEach(item => {
     const link = document.createElement("a");
     link.href = prefix + item.link;
     link.textContent = item.title;

     if (currentPath.endsWith(item.link)) {
          link.classList.add("active");
     }

     nav.appendChild(link);
});

const cards = document.getElementById("cards");

if (cards) {
     assignments.forEach(item => {
          if (item.id !== "home") {
          const article = document.createElement("article");
          article.innerHTML = `
               <h2>${item.title}</h2>
               <p>${item.description}</p>
               <a href="${item.link}">Till uppgiften</a>
          `;
          cards.appendChild(article);
          }
     });
}

