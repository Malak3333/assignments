import {products} from "./products.js";
import {loadCart, addToCart, cart} from "./cart.js";

loadCart();

const container = document.getElementById("products-container");

products.forEach(function(product) {
     let div = document.createElement("div");
     div.classList.add("product-card");

     let img = document.createElement("img");
     img.src = "images/" + product.image;
     img.alt = product.name;
     div.appendChild(img);

     let h3 = document.createElement("h3");
     h3.textContent = product.name;
     div.appendChild(h3);

     let pDescription = document.createElement("p");
     pDescription.textContent = product.description;
     div.appendChild(pDescription);

     let pPrice = document.createElement("p");
     pPrice.textContent = product.price + " kr";
     div.appendChild(pPrice);

     let button = document.createElement("button");
     button.textContent = "Lägg i kundvagn";
     button.setAttribute("data-id", product.id);

     button.addEventListener("click", function() {
          addToCart(product);
          renderCart();
     });

     div.appendChild(button);

     container.appendChild(div);
});

function renderCart() {
     const cartContainer = document.getElementById("cart-items");
     const cartTotal = document.getElementById("cart-total");

     cartContainer.innerHTML = "";
     let total = 0;

    for (let i = 0; i < cart.length; i++) {
          let item = cart[i];

          let li = document.createElement("li");
          li.textContent = item.name + " x" + item.quantity + " - " + (item.price * item.quantity) + " kr";
          cartContainer.appendChild(li);

          total += item.price * item.quantity;
    }
    cartTotal.textContent = "Totalt: " + total + " kr";
}

renderCart();
