const fetchAndDisplayProducts = async () => {
  const container = document.getElementById('products-grid');
  if (!container) return;

  try {
    const products = await apiRequest('/products');
    
    container.innerHTML = products.map((product) => `
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img class="w-full h-48 object-cover" src="${product.imageUrl}" alt="${product.title}">
        <div class="p-5">
          <span class="text-xs font-semibold text-indigo-600 uppercase tracking-wide">${product.category}</span>
          <h3 class="text-lg font-bold text-gray-800 mt-1">${product.title}</h3>
          <p class="text-gray-500 text-sm mt-2 line-clamp-2">${product.description}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
            <button onclick="addToCart('${product._id}', '${product.title}', ${product.price}, '${product.imageUrl}')" 
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = `<p class="text-red-500 text-center col-span-full">Failed to load products: ${error.message}</p>`;
  }
};