function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(products, product, quantity) {
  if (!quantity || quantity < 0) throw new RangeError('Количество должно быть положительным');
  if (product.stock < quantity) throw new RangeError('Недостаточно товаров в наличии');
  const productIndex = products.findIndex((p) => p.id === product.id);
  if (productIndex === -1) products.push({ ...product, quantity });
  else products[productIndex].quantity += quantity;
  return products;
 }
function changeQuantity(products, productId, quantity) {
  if (!quantity || quantity < 0) throw new RangeError('Количество должно быть положительным');
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) return products;
  if (products[productIndex].stock < quantity) throw new RangeError('Недостаточно товаров в наличии');
  products[productIndex].quantity = quantity;
  return products;

}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
