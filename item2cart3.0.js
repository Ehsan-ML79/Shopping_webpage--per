//initializing cart's data
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get the cart list element
var cartList = document.getElementById('cart-list');

// Get all "افزودن به سبد خرید" buttons
const addToCartButtons = document.querySelectorAll('.product .btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Handle adding item2cart
function addToCart(event) {
  //Preventing to auto-add
  event.preventDefault();

  // Product details
  const product = event.target.parentNode;
  const productName = product.querySelector('h3').textContent;
  const productPrice = product.querySelector('p').textContent;

  // Create an object with the product details
  const item = {
    name: productName,
    price: productPrice,
    quantity: 1
  };

  // Add item2cart
  cart.push(item);

  // Update the cart
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('محصول با موفقیت به سبد خرید اضافه شد!');

  // Re-display the cart items
  displayCartItems();
  
}
// Function 4 the total price
function displayTotalPrice() {

  var totalPrice = 0;
  
  cart.forEach(function(item) {
    // Get the quantity
    var quantity = parseInt(item.quantity);

    // Check validity of quantity
    if (!isNaN(quantity) && quantity > 0) {
      
      var itemTotalPrice = parseInt(item.price) * quantity;
      
      totalPrice += itemTotalPrice;
    }
  });

  // Update total price
  var totalPriceElement = document.getElementById('total-price-value');
  totalPriceElement.textContent = totalPrice;
}

// Display items' cart
function displayCartItems() {
  // Clear list
  cartList.innerHTML = '';

  var totalPrice = 0;

  cart.forEach(function(item) {
    // checking valid quantity, set it to 1
    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
      item.quantity = 1;
    }

    // Check if the item already exists in the cart
    var existingItem = cartList.querySelector(`li[data-name="${item.name}"]`);

    //Duplicating issue ...
    if (existingItem) {
      
      alert("error duplicating!");
    }

    else {
      // create a new list item
      var listItem = document.createElement('li');
      listItem.dataset.name = item.name;

      // Create item details
      var itemName = document.createElement('span');
      itemName.textContent = item.name;

      var itemPrice = document.createElement('span');
      itemPrice.textContent = item.price + ' تومان';

      var quantityWrapper = document.createElement('div');
      quantityWrapper.className = 'quantity-wrapper';

      var quantityElement = document.createElement('input');
      quantityElement.type = 'number';
      quantityElement.className = 'quantity';
      quantityElement.value = item.quantity;
      quantityElement.addEventListener('input', function() {
        var quantity = parseInt(this.value);
        if (!isNaN(quantity) && quantity >= 0) {
          item.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          displayTotalPrice();
        }
      });

      var quantityButtons = document.createElement('div');
      quantityButtons.className = 'quantity-buttons';

      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      decreaseButton.addEventListener('click', function() {
        
        //var quantityElement = this.nextElementSibling;
        var quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantityElement.textContent = quantity - 1;
          item.quantity = quantity - 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          displayTotalPrice(); // Update
        }
      });

      // var quantityElement = document.createElement('span');
      // quantityElement.className = 'quantity';
      // quantityElement.textContent = item.quantity;

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', function() {
        
        //var quantityElement = this.previousElementSibling;
        var quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        item.quantity = quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayTotalPrice(); // Update
      });

      // Append the quantity buttons to the quantityButtons container
        quantityButtons.appendChild(decreaseButton);
        quantityButtons.appendChild(increaseButton);

        // Append the quantity input and quantity buttons to the quantityWrapper
        quantityWrapper.appendChild(quantityElement);
        quantityWrapper.appendChild(quantityButtons);

        // Append the quantityWrapper to the listItem
        listItem.appendChild(quantityWrapper);

      var removeButton = document.createElement('button');
      removeButton.textContent = 'حذف';
      removeButton.addEventListener('click', function() {
        // Removing process...
        var listItem = this.closest('li');
        var itemName = listItem.dataset.name;

        listItem.remove();

        // Updating new cart with omitting the removed item 
        cart = cart.filter(function(item) {
          return item.name !== itemName;
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        displayTotalPrice();
      });

      // Append Qbuttons to the list Wrapper
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

  // Update the total price
  var totalPriceElement = document.getElementById('total-price-value');
  totalPriceElement.textContent = totalPrice;
}

// Display initially
displayCartItems();

var purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', function() {
  alert('با تشکر از خرید شما!');
  // Reset the cart and update localStorage
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
});



