// JavaScript code for adding items to the cart
function addToCartFunction(item) {
    // Check if the cart exists in the localStorage
    var cart = localStorage.getItem('cart');
    if (cart === null) {
      // If the cart doesn't exist, create an empty array
      cart = [];
    } else {
      // If the cart exists, parse the JSON string to an array
      cart = JSON.parse(cart);
    }
  
    // Check if the item already exists in the cart
    var existingItem = cart.find(function(cartItem) {
      return cartItem.name === item.name;
    });
  
    if (existingItem) {
      // If the item already exists, display a message to the user
      alert('The item has already been added!');
    } else {
      // Add the item to the cart
      cart.push(item);
  
      // Update the cart in the localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Show a success message to the user
      alert('محصول با موفقیت به سبد خرید اضافه شد!');
    }
  }
  
  // Get all the "افزودن به سبد خرید" buttons
  const addToCartButtons = document.querySelectorAll('.product .btn');
  
  // Add event listener to each button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Function to handle adding items to the cart
  function addToCart(event) {
    event.preventDefault();
  
    // Get the product details
    const product = event.target.parentNode;
    const productName = product.querySelector('h3').textContent;
    const productPrice = product.querySelector('p').textContent;
  
    // Create an object with the product details
    const item = {
      name: productName,
      price: productPrice
    };
  
    // Add the item to the cart
    addToCartFunction(item);
  }
  