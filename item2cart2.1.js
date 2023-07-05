// Retrieve the cart from localStorage
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get the cart list element
var cartList = document.getElementById('cart-list');

// Function to calculate and display the total price
function displayTotalPrice() {
  // Calculate the total price
  var totalPrice = 0;

  // Iterate over each item in the cart
  cart.forEach(function(item) {
    // Get the quantity of the item
    var quantity = parseInt(item.quantity);

    // Check if the quantity is a valid number
    if (!isNaN(quantity) && quantity > 0) {
      // Calculate the item's total price
      var itemTotalPrice = parseInt(item.price) * quantity;

      // Add the item's total price to the overall total price
      totalPrice += itemTotalPrice;
    }
  });

  // Update the total price element
  var totalPriceElement = document.getElementById('total-price-value');
  totalPriceElement.textContent = totalPrice;
}

// Function to display the items in the cart
function displayCartItems() {
  // Clear the existing list
  cartList.innerHTML = '';

  // Calculate the total price
  var totalPrice = 0;

  // Iterate over each item in the cart
  cart.forEach(function(item) {
    // If the item doesn't have a valid quantity, set it to 1
    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
      item.quantity = 1;
    }

    // Check if the item already exists in the cart
    var existingItem = cartList.querySelector(`li[data-name="${item.name}"]`);

    if (existingItem) {
      // If the item exists, increment its quantity
      var quantityElement = existingItem.querySelector('.quantity');
      var quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
      item.quantity = quantity + 1;
    } else {
      // If the item doesn't exist, create a new list item
      var listItem = document.createElement('li');
      listItem.dataset.name = item.name;

      // Create item details
      var itemName = document.createElement('span');
      itemName.textContent = item.name;

      var itemPrice = document.createElement('span');
      itemPrice.textContent = item.price + ' تومان';

      var quantityWrapper = document.createElement('div');
      quantityWrapper.className = 'quantity-wrapper';

      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      decreaseButton.addEventListener('click', function() {
        // Decrease the quantity of the item
        var quantityElement = this.nextElementSibling;
        var quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantityElement.textContent = quantity - 1;
          item.quantity = quantity - 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          displayTotalPrice(); // Update the total price
        }
      });

      var quantityElement = document.createElement('span');
      quantityElement.className = 'quantity';
      quantityElement.textContent = item.quantity;

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', function() {
        // Increase the quantity of the item
        var quantityElement = this.previousElementSibling;
        var quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        item.quantity = quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayTotalPrice(); // Update the total price
      });

      // Create remove button
      var removeButton = document.createElement('button');
      removeButton.textContent = 'حذف';
      removeButton.addEventListener('click', function() {
        // Remove the item from the cart
        var listItem = this.closest('li');
        var itemName = listItem.dataset.name;

        listItem.remove();

        cart = cart.filter(function(item) {
          return item.name !== itemName;
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the total price
        displayTotalPrice();
      });

      // Append elements to the list item
      quantityWrapper.appendChild(decreaseButton);
      quantityWrapper.appendChild(quantityElement);
      quantityWrapper.appendChild(increaseButton);

      listItem.appendChild(itemName);
      listItem.appendChild(itemPrice);
      listItem.appendChild(quantityWrapper);
      listItem.appendChild(removeButton);

      // Append the list item to the cart list
      cartList.appendChild(listItem);
    }

    // Calculate the total price
    var itemTotalPrice = parseInt(item.price) * item.quantity;
    totalPrice += itemTotalPrice;
  });

  // Update the total price element
  var totalPriceElement = document.getElementById('total-price-value');
  totalPriceElement.textContent = totalPrice;
}

// Display the cart items initially
displayCartItems();

// Purchase button
var purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', function() {
  alert('با تشکر از خرید شما!');
  // Reset the cart and update localStorage
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  // Re-display the cart items
  displayCartItems();
});

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
    price: productPrice,
    quantity: 1 // Set the initial quantity to 1
  };

  // Add the item to the cart
  cart.push(item);

  // Update the cart in the localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show a success message to the user
  alert('محصول با موفقیت به سبد خرید اضافه شد!');

  // Re-display the cart items
  displayCartItems();
  
}
