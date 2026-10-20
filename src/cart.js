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

function removeFromCart(products, productId) {
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) return products;
  products.splice(productIndex, 1);
  return products;
}

function calculateCartSubtotal(products) {
  return products.reduce((subtotal, product) => subtotal + product.price * product.quantity, 0);
 }

function calculateOrderTotal(products, promo) {
  const subtotal = calculateCartSubtotal(products);
  const discount = promo === 'SAVE10' && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const delivery = subtotal > 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
 }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
