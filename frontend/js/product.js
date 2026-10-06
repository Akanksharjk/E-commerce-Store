const fetchAndDisplayProductDetail = async () => {

  const container =
    document.getElementById(
      'product-detail-container'
    );

  if (!container) return;


  const params =
    new URLSearchParams(
      window.location.search
    );


  const productId =
    params.get('id');


  if (!productId) {

    container.innerHTML = `
      <div class="text-center py-12">

        <p class="text-red-500 font-semibold">
          Product ID is missing.
        </p>

        <a
          href="index.html"
          class="inline-block mt-5
                 text-indigo-600
                 hover:underline"
        >
          ← Back to Products
        </a>

      </div>
    `;

    return;
  }


  try {

    const product =
      await apiRequest(
        `/products/${productId}`
      );


    container.innerHTML = `

      <div
        class="grid grid-cols-1
               md:grid-cols-2
               gap-10 bg-white
               rounded-2xl shadow-md
               p-6 md:p-10"
      >


        <!-- Product Image -->

        <div>

          <img
            src="${product.imageUrl}"
            alt="${product.title}"
            class="w-full h-[400px]
                   object-cover
                   rounded-xl"
          >

        </div>


        <!-- Product Info -->

        <div
          class="flex flex-col
                 justify-center"
        >

          <span
            class="text-sm font-semibold
                   text-indigo-600
                   uppercase tracking-wide"
          >
            ${product.category || 'Product'}
          </span>


          <h1
            class="text-3xl md:text-4xl
                   font-bold text-gray-900
                   mt-3"
          >
            ${product.title}
          </h1>


          <p
            class="text-2xl font-bold
                   text-indigo-600 mt-5"
          >
            $${Number(
      product.price
    ).toFixed(2)}
          </p>


          <p
            class="text-gray-600
                   leading-7 mt-6"
          >
            ${product.description || 'No description available.'}
          </p>


          <div
            class="flex gap-4 mt-8"
          >

            <button
              onclick="addToCart(
                ${JSON.stringify(product._id)},
                ${JSON.stringify(product.title)},
                ${Number(product.price)},
                ${JSON.stringify(product.imageUrl)}
              )"
              class="bg-indigo-600
                     text-white
                     px-6 py-3
                     rounded-lg
                     font-semibold
                     hover:bg-indigo-700
                     transition"
            >
              Add to Cart
            </button>


            <a
              href="cart.html"
              class="border border-gray-300
                     px-6 py-3
                     rounded-lg
                     font-semibold
                     hover:bg-gray-100
                     transition"
            >
              Go to Cart
            </a>

          </div>

        </div>

      </div>
    `;


  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div class="text-center py-12">

        <p
          class="text-red-500
                 font-semibold"
        >
          Failed to load product.
        </p>

        <p
          class="text-gray-500
                 text-sm mt-2"
        >
          ${error.message}
        </p>

      </div>
    `;
  }
};