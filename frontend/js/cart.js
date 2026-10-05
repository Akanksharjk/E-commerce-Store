const getCartItems = () => JSON.parse(localStorage.getItem('cart_items')) || [];

const saveCartItems = (cart) => {
  localStorage.setItem('cart_items', JSON.stringify(cart));
  updateCartBadge();
};

const addToCart = (id, title, price, imageUrl) => {
  const cart = getCartItems();
  const existingItem = cart.find((item) => item.product === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product: id, title, price, imageUrl, quantity: 1 });
  }

  saveCartItems(cart);
  alert('Item added to cart!');
};

const updateCartBadge = () => {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const cart = getCartItems();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
};

const renderCartPage = () => {
  const container = document.getElementById('cart-items-container');
  const totalContainer = document.getElementById('cart-total-price');
  if (!container) return;

  const cart = getCartItems();

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-500 text-center py-8">Your shopping cart is empty.</p>`;
    if (totalContainer) totalContainer.textContent = '$0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="flex items-center justify-between border-b py-4">
        <div class="flex items-center space-x-4">
          <img src="${item.imageUrl}" class="w-16 h-16 object-cover rounded-md" alt="${item.title}">
          <div>
            <h4 class="font-bold text-gray-800">${item.title}</h4>
            <p class="text-sm text-gray-500">$${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
        </div>
        <span class="font-bold text-gray-900">$${itemTotal.toFixed(2)}</span>
      </div>
    `;
  }).join('');

  if (totalContainer) totalContainer.textContent = `$${total.toFixed(2)}`;
};

const processOrder = async () => {
  try {
    const cart = getCartItems();
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderPayload = {
      items: cart.map(item => ({ product: item.product, quantity: item.quantity, price: item.price })),
      totalAmount
    };

    const response = await apiRequest('/orders', 'POST', orderPayload, true);
    alert('Order placed successfully!');
    localStorage.removeItem('cart_items');
    window.location.href = 'index.html';
  } catch (error) {
    alert(`Order processing failed: ${error.message}`);
  }
};