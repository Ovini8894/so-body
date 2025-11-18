document.addEventListener('DOMContentLoaded', () => {
  loadCartItems();
  
  // Apply coupon
  document.querySelector('.coupon-btn')?.addEventListener('click', function() {
    const couponInput = document.querySelector('.coupon-input');
    const code = couponInput.value.trim();
    
    if (code) {
      if (code.toUpperCase() === 'SOBODY10') {
        showAlert('success', 'Cupom aplicado!', 'Você ganhou 10% de desconto.');
        couponInput.value = '';
      } else {
        showAlert('error', 'Cupom inválido', 'O código informado não é válido.');
      }
    } else {
      showAlert('warning', 'Atenção', 'Por favor, insira um código de cupom.');
    }
  });
});

function loadCartItems() {
  const cart = CartManager.getCart();
  const cartItemsContainer = document.querySelector('.cart-items');
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <i class="fas fa-shopping-cart" style="font-size: 80px; color: var(--primary-gold); margin-bottom: 20px;"></i>
        <h3>Seu carrinho está vazio</h3>
        <p style="color: var(--text-light); margin-bottom: 30px;">Adicione produtos para continuar comprando</p>
        <a href="catalog.html" class="btn-add-cart" style="display: inline-flex; text-decoration: none;">
          <span>Ir às Compras</span>
        </a>
      </div>
    `;
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-size">Tamanho: ${item.size}</p>
      </div>
      <div class="item-quantity">
        <button class="qty-btn" onclick="updateItemQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">-</button>
        <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
        <button class="qty-btn" onclick="updateItemQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">+</button>
      </div>
      <p class="item-price">${formatCurrency(item.price)}</p>
      <button class="remove-btn" onclick="removeCartItem('${item.id}', '${item.size}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
  
  updateCartTotal();
}

function updateItemQuantity(itemId, size, newQuantity) {
  if (newQuantity < 1) return;
  
  CartManager.updateQuantity(itemId, size, newQuantity);
  loadCartItems();
  showAlert('success', 'Quantidade atualizada', 'O item foi atualizado no carrinho.');
}

function removeCartItem(itemId, size) {
  if (confirm('Tem certeza que deseja remover este item?')) {
    CartManager.removeItem(itemId, size);
    loadCartItems();
    showAlert('info', 'Item removido', 'O produto foi removido do carrinho.');
  }
}

function updateCartTotal() {
  const cart = CartManager.getCart();
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;
  
  document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatCurrency(subtotal);
  document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = formatCurrency(shipping);
  document.querySelector('.summary-total span:last-child').textContent = formatCurrency(total);
}
