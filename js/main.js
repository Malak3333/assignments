const nav = document.getElementById("main-nav");

assignments.forEach(item => {
     const link = document.createElement("a");
     link.href = item.link;
     link.textContent = item.title;

     if (window.location.pathname.endsWith(item.link)) {
          link.classList.add("active");
     }

     nav.appendChild(link);
});

const cards = document.getElementById("cards");

assignments
     .filter(item => item.id !== "home")
     .forEach(item => {
          const article = document.createElement("article");
          article.innerHTML = `
               <h2>${item.title}</h2>
               <p>${item.description}</p>
               <a href="${item.link}">Till uppgiften</a>
          `;
          cards.appendChild(article);
     });