// JS for adding2cart

// Get all "افزودن به سبد خرید" buttons
const addToCartButtons = document.querySelectorAll('.product .btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// adding2cart
function addToCart(event) {
  //Preventing to auto-add
  event.preventDefault();

  // Get the product details
  const product = event.target.parentNode;//Retrieve the parent element of the clicked button
  const productName = product.querySelector('h3').textContent;
  const productPrice = product.querySelector('p').textContent;

  // Create an object with the product details
  const item = {
    name: productName,
    price: productPrice
  };

  // Add2cart
  addToCartFunction(item);
}

function addToCartFunction(item) {

    // Check whether CART exists or not
    var cart = localStorage.getItem('cart');
    if (cart === null) {
      // Create an empty array
      cart = [];
    } 
    else {
      // parse the JSON string to an array
      cart = JSON.parse(cart);
    }
  
    // Check whether ITEM already exists or not
    var existingItem = cart.find(function(cartItem) {
      return cartItem.name === item.name;
    });
  
    if (existingItem) {
      
      alert('The item has already been added!');
    } 
    else {
      cart.push(item);
  
      // Updating
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert('محصول با موفقیت به سبد خرید اضافه شد!');
    }
  }
  
  
  