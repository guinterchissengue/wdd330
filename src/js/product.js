import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let cart = getLocalStorage('so-cart');

  // garante que é array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const existingItem = cart.find((item) => item.Id === product.Id);

  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    cart.push({ ...product, Quantity: 1 });
  }

  setLocalStorage('so-cart', cart);
}

// handler do botão
async function addToCartHandler(e) {
  const id = e.target.dataset.id;

  const product = await dataSource.findProductById(id);

  addProductToCart(product);
}

// evento (IMPORTANTE: botão precisa ter data-id)
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
