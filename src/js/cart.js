import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const quantity = item.Quantity || 1;

  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button
      class="quantity-btn"
      data-action="decrease"
      data-id="${item.Id}"
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span class="quantity-value">qty: ${quantity}</span>
    <button
      class="quantity-btn"
      data-action="increase"
      data-id="${item.Id}"
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
  <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

// Recalculates and displays the number of items and the cart total
function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');

  if (!cartItems.length) {
    cartFooter.classList.add('hide');
    return;
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.Quantity || 1),
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
    0,
  );

  document.querySelector('.cart-total-items').textContent = totalItems;
  document.querySelector('.cart-total-price').textContent =
    `$${totalPrice.toFixed(2)}`;

  cartFooter.classList.remove('hide');
}

// Updates (or removes) a single item's quantity, persists it, then re-renders
function updateQuantity(id, newQuantity) {
  let cartItems = getLocalStorage('so-cart') || [];

  if (newQuantity < 1) {
    cartItems = cartItems.filter((item) => item.Id !== id);
  } else {
    cartItems = cartItems.map((item) =>
      item.Id === id ? { ...item, Quantity: newQuantity } : item,
    );
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

// Handles clicks on the +/- quantity buttons (event delegation)
function cartQuantityHandler(e) {
  const button = e.target.closest('.quantity-btn');

  if (!button) return;

  const cartItems = getLocalStorage('so-cart') || [];
  const item = cartItems.find((product) => product.Id === button.dataset.id);

  if (!item) return;

  const currentQuantity = item.Quantity || 1;
  const newQuantity =
    button.dataset.action === 'increase'
      ? currentQuantity + 1
      : currentQuantity - 1;

  updateQuantity(button.dataset.id, newQuantity);
}

document
  .querySelector('.product-list')
  .addEventListener('click', cartQuantityHandler);

renderCartContents();
