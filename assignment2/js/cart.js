export let cart = [];

export function addToCart(product) {
     const existing = cart.find(item => item.id === product.id);
     if (existing) {
          existing.quantity += 1;
     } else {
          cart.push({...product, quantity: 1});
     }
     saveCart();
}

export function loadCart() {
     const data = localStorage.getItem("cart");
     if (data) {
          let parsed = JSON.parse(data);
          cart.length = 0;
          for (let i = 0; i < parsed.length; i++) {
               cart.push(parsed[i]);
          }
     }

}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
          }
          saveCart();

export function clearCart() {
     cart = [];
     saveCart();
}

export function saveCart() {
     localStorage.setItem("cart", JSON.stringify(cart));
}

