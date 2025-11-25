// Product detail page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Gallery thumbs
  const thumbs = document.querySelectorAll('.thumb');
  const mainImage = document.getElementById('main-image');
  
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.dataset.image;
    });
  });
  
  // Size selection
  const sizeButtons = document.querySelectorAll('.size-btn');
  let selectedSize = 'P';
  
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });
  
  // Quantity
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyValue = document.getElementById('qty-value');
  
  qtyMinus?.addEventListener('click', () => {
    let value = parseInt(qtyValue.value);
    if (value > 1) {
      qtyValue.value = value - 1;
    }
  });
  
  qtyPlus?.addEventListener('click', () => {
    let value = parseInt(qtyValue.value);
    if (value < 10) {
      qtyValue.value = value + 1;
    }
  });
  
  // Add to cart
  const addToCartBtn = document.getElementById('add-to-cart');
  addToCartBtn?.addEventListener('click', () => {
    const product = {
      id: 'body-preto-basico',
      name: 'Body Preto Básico',
      price: 89.90,
      image: '/placeholder.svg?height=300&width=300',
      size: selectedSize,
      quantity: parseInt(qtyValue.value)
    };
    
    CartManager.addItem(product);
    showAlert('success', 'Produto adicionado!', `${product.name} (${selectedSize}) foi adicionado ao carrinho.`);
  });
  
  // Buy now
  const buyNowBtn = document.getElementById('buy-now');
  buyNowBtn?.addEventListener('click', () => {
    const product = {
      id: 'body-preto-basico',
      name: 'Body Preto Básico',
      price: 89.90,
      image: '/placeholder.svg?height=300&width=300',
      size: selectedSize,
      quantity: parseInt(qtyValue.value)
    };
    
    CartManager.addItem(product);
    window.location.href = 'checkout.html';
  });
  
  // Wishlist toggle
  const wishlistBtn = document.getElementById('wishlist-toggle');
  const productId = 'body-preto-basico';
  
  // Check if already in wishlist
  if (WishlistManager.isInWishlist(productId)) {
    wishlistBtn.querySelector('i').classList.replace('far', 'fas');
    wishlistBtn.classList.add('active');
  }
  
  wishlistBtn?.addEventListener('click', () => {
    const product = {
      id: productId,
      name: 'Body Preto Básico',
      price: 89.90,
      image: '/placeholder.svg?height=300&width=300',
      category: 'bodies'
    };
    
    const added = WishlistManager.toggleItem(product);
    const icon = wishlistBtn.querySelector('i');
    
    if (added) {
      icon.classList.replace('far', 'fas');
      wishlistBtn.classList.add('active');
      showAlert('success', 'Adicionado aos favoritos!', 'Produto salvo na sua lista de desejos.');
    } else {
      icon.classList.replace('fas', 'far');
      wishlistBtn.classList.remove('active');
      showAlert('info', 'Removido dos favoritos', 'Produto removido da sua lista de desejos.');
    }
  });
  
  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
});
