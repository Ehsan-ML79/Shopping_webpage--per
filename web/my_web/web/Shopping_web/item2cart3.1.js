"use strict";

// Initializing data or creating an empty array
var cart = JSON.parse(localStorage.getItem('cart')) || [];
var cartList = document.getElementById('cart-list');// Getting the cart list element
var totalPriceElement = document.getElementById('total-price-value');// Getting the total price element
var purchaseButton = document.getElementById('purchase-button');// Getting the purchase button element
//var addToCartButtons = document.querySelectorAll('.product .btn');// All "افزودن به سبد خرید"

// Adding to the "افزودن به سبد خرید" buttons
// addToCartButtons.forEach(function(button) {
//   button.addEventListener('click', addToCart);
// });

//Handle adding items2cart
function addToCart(event) {
  event.preventDefault();

  var product = event.target.parentNode;
  var productName = product.querySelector('h3').textContent;
  var productPrice = product.querySelector('p').textContent;

  var item = {
    name: productName,
    price: productPrice,
    quantity: 1
  };

  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));// Updating the cart data in local storage

  alert('محصول با موفقیت به سبد خرید اضافه شد!');

  displayCartItems();// Updating the displayed cart items
}

//total price of the cart items
function calculateTotalPrice() {
  var totalPrice = 0;

  cart.forEach(function(item) {
    var quantity = parseInt(item.quantity);

    if (!isNaN(quantity) && quantity > 0) {
      var itemTotalPrice = parseInt(item.price) * quantity;
      totalPrice += itemTotalPrice;
    }
  });

  totalPriceElement.textContent = totalPrice;// Updating the total price element
}

function displayCartItems() {
  cartList.innerHTML = '';// Clearing the cart list

  cart.forEach(function(item) {
    // If invalid reset quantity
    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
      item.quantity = 1;
    }
    // searching for the first li element has a data-name attribute matching the current item
    var existingItem = cartList.querySelector(`li[data-name="${item.name}"]`);

    if (existingItem) {
      alert("error duplicating!");
    } 
    else {
      var listItem = document.createElement('li');
      listItem.dataset.name = item.name;//dataset version

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
        if (!isNaN(quantity) && quantity >= 1) {
          item.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          calculateTotalPrice();
        } 
        else {
          this.value = item.quantity;} // Reset the value 4 invalid input
      });

      quantityWrapper.appendChild(quantityElement);

      var removeButton = document.createElement('button');
      removeButton.textContent = 'حذف';
      removeButton.addEventListener('click', function() {
        var listItem = this.closest('li');
        var itemName = listItem.dataset.name;

        listItem.remove();

        cart = cart.filter(function(item) {
          return item.name !== itemName;
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        calculateTotalPrice();
      });

      listItem.appendChild(itemName);
      listItem.appendChild(itemPrice);
      listItem.appendChild(quantityWrapper);
      listItem.appendChild(removeButton);

      cartList.appendChild(listItem);
    }
  });

  calculateTotalPrice();
}

displayCartItems();// Display initially

purchaseButton.addEventListener('click', function() {
  alert('با تشکر از خرید شما!');

  cart = []; // Clearing the cart array
  localStorage.setItem('cart', JSON.stringify(cart));// Updating the cart data in local storage
  displayCartItems();
});
