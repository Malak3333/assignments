let cart = [];

export function addToCart(product) {
     const existing = cart.find(item => item.id === product.id);
     if (existing) {
          existing.quanity += 1;
     } else {
          cart.push({...product, quanity: 1});
     }
     saveCart();
}

export function loadCart() {
     const data = localStorage.getItem("cart");
     if (data) cart = JSON.parse(data);
}

export function removeFromCart(productId) {
     cart = cart.filter(item => item.id !== productId);
}

export function clearCart() {
     cart = [];
     saveCart();
}

export function saveCart() {
     localStorage.setItem("cart", JSON.stringify(cart));
}

