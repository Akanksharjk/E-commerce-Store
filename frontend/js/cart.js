const getCartItems = () => {
  try {
    return JSON.parse(
      localStorage.getItem('cart_items')
    ) || [];
  } catch (error) {
    console.error('Invalid cart data:', error);

    return [];
  }
};


const saveCartItems = (cart) => {

  localStorage.setItem(
    'cart_items',
    JSON.stringify(cart)
  );

  updateCartBadge();
};


const addToCart = (
  id,
  title,
  price,
  imageUrl
) => {

  const cart = getCartItems();

  const existingItem = cart.find(
    (item) =>
      String(item.product) === String(id)
  );

  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({
      product: id,
      title: title,
      price: Number(price),
      imageUrl: imageUrl,
      quantity: 1
    });

  }

  saveCartItems(cart);

  alert('Item added to cart!');
};


const removeFromCart = (productId) => {

  const cart = getCartItems();

  const updatedCart = cart.filter(
    (item) =>
      String(item.product) !== String(productId)
  );

  saveCartItems(updatedCart);

  renderCartPage();
};


const increaseQuantity = (productId) => {

  const cart = getCartItems();

  const item = cart.find(
    (item) =>
      String(item.product) === String(productId)
  );

  if (item) {
    item.quantity += 1;
  }

  saveCartItems(cart);

  renderCartPage();
};


const decreaseQuantity = (productId) => {

  const cart = getCartItems();

  const item = cart.find(
    (item) =>
      String(item.product) === String(productId)
  );

  if (!item) return;

  if (item.quantity > 1) {

    item.quantity -= 1;

  } else {

    const updatedCart = cart.filter(
      (item) =>
        String(item.product) !== String(productId)
    );

    saveCartItems(updatedCart);

    renderCartPage();

    return;
  }

  saveCartItems(cart);

  renderCartPage();
};


const updateCartBadge = () => {

  const badge =
    document.getElementById('cart-badge');

  if (!badge) return;

  const cart = getCartItems();

  const totalCount = cart.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

  badge.textContent = totalCount;
};


const renderCartPage = () => {

  const container =
    document.getElementById(
      'cart-items-container'
    );

  const totalContainer =
    document.getElementById(
      'cart-total-price'
    );

  if (!container) return;

  const cart = getCartItems();

  if (cart.length === 0) {

    container.innerHTML = `
      <div class="text-center py-12">

        <div class="text-5xl mb-4">
          🛒
        </div>

        <p class="text-gray-500 text-lg">
          Your shopping cart is empty.
        </p>

        <a
          href="index.html"
          class="inline-block mt-5
                 bg-indigo-600 text-white
                 px-5 py-2 rounded-lg
                 hover:bg-indigo-700"
        >
          Continue Shopping
        </a>

      </div>
    `;

    if (totalContainer) {
      totalContainer.textContent = '$0.00';
    }

    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item) => {

    const price = Number(item.price);
    const quantity = Number(item.quantity);

    const itemTotal =
      price * quantity;

    total += itemTotal;

    return `
      <div
        class="flex flex-col sm:flex-row
               items-center justify-between
               gap-5 border-b py-5"
      >

        <div class="flex items-center gap-4 w-full">

          <img
            src="${item.imageUrl}"
            alt="${item.title}"
            class="w-20 h-20
                   object-cover rounded-lg"
          >

          <div>

            <h4
              class="font-bold text-gray-800"
            >
              ${item.title}
            </h4>

            <p
              class="text-sm text-gray-500 mt-1"
            >
              $${price.toFixed(2)} each
            </p>

          </div>

        </div>


        <div
          class="flex items-center
                 justify-between gap-5
                 w-full sm:w-auto"
        >

          <div
            class="flex items-center
                   border rounded-lg"
          >

            <button
              onclick="decreaseQuantity('${item.product}')"
              class="px-3 py-1
                     text-gray-700
                     hover:bg-gray-100"
            >
              −
            </button>

            <span
              class="px-3 font-semibold"
            >
              ${quantity}
            </span>

            <button
              onclick="increaseQuantity('${item.product}')"
              class="px-3 py-1
                     text-gray-700
                     hover:bg-gray-100"
            >
              +
            </button>

          </div>


          <span
            class="font-bold text-gray-900"
          >
            $${itemTotal.toFixed(2)}
          </span>


          <button
            onclick="removeFromCart('${item.product}')"
            class="text-red-500
                   hover:text-red-700
                   text-sm"
          >
            Remove
          </button>

        </div>

      </div>
    `;

  }).join('');


  if (totalContainer) {
    totalContainer.textContent =
      `$${total.toFixed(2)}`;
  }
};


const processOrder = async () => {

  try {

    const token =
      localStorage.getItem('token');

    if (!token) {

      alert(
        'Please login before placing an order.'
      );

      window.location.href =
        'login.html';

      return;
    }


    const cart = getCartItems();

    if (cart.length === 0) {

      alert('Your cart is empty.');

      return;
    }


    const totalAmount =
      cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
          Number(item.quantity),
        0
      );


    const orderPayload = {

      items: cart.map((item) => ({
        product: item.product,
        quantity: Number(item.quantity),
        price: Number(item.price)
      })),

      totalAmount: totalAmount
    };


    await apiRequest(
      '/orders',
      'POST',
      orderPayload,
      true
    );


    alert(
      'Order placed successfully!'
    );


    localStorage.removeItem(
      'cart_items'
    );


    window.location.href =
      'index.html';

  } catch (error) {

    console.error(error);

    alert(
      `Order processing failed: ${error.message}`
    );
  }
};


document.addEventListener(
  'DOMContentLoaded',
  () => {
    updateCartBadge();
  }
);