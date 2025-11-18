// Global utilities for all pages

// Cart Management with localStorage
const CartManager = {
  getCart() {
    const cart = localStorage.getItem('sobody_cart');
    return cart ? JSON.parse(cart) : [];
  },
  
  saveCart(cart) {
    localStorage.setItem('sobody_cart', JSON.stringify(cart));
    this.updateBadge();
  },
  
  addItem(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.push({
        ...product,
        quantity: product.quantity || 1,
        addedAt: Date.now()
      });
    }
    
    this.saveCart(cart);
    return cart;
  },
  
  removeItem(itemId, size) {
    let cart = this.getCart();
    cart = cart.filter(item => !(item.id === itemId && item.size === size));
    this.saveCart(cart);
    return cart;
  },
  
  updateQuantity(itemId, size, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === itemId && item.size === size);
    
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
    
    return cart;
  },
  
  clearCart() {
    localStorage.removeItem('sobody_cart');
    this.updateBadge();
  },
  
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// Wishlist Management
const WishlistManager = {
  getWishlist() {
    const wishlist = localStorage.getItem('sobody_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },
  
  saveWishlist(wishlist) {
    localStorage.setItem('sobody_wishlist', JSON.stringify(wishlist));
  },
  
  toggleItem(product) {
    let wishlist = this.getWishlist();
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
      wishlist.splice(index, 1);
      return false; // Removed
    } else {
      wishlist.push({
        ...product,
        addedAt: Date.now()
      });
      return true; // Added
    }
  },
  
  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.id === productId);
  }
};

// Alert System
function showAlert(type, title, message) {
  const alertContainer = document.createElement('div');
  alertContainer.className = `custom-alert alert-${type}`;
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  
  alertContainer.innerHTML = `
    <div class="custom-alert-icon">
      <i class="fas ${icons[type]}"></i>
    </div>
    <div class="custom-alert-content">
      <h4 class="custom-alert-title">${title}</h4>
      <p class="custom-alert-message">${message}</p>
    </div>
    <button class="custom-alert-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(alertContainer);
  
  setTimeout(() => {
    alertContainer.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => alertContainer.remove(), 300);
  }, 5000);
}

// Loading overlay
function showLoading(message = 'Carregando...') {
  const loading = document.createElement('div');
  loading.className = 'loading-overlay';
  loading.id = 'global-loading';
  loading.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(loading);
}

function hideLoading() {
  const loading = document.getElementById('global-loading');
  if (loading) {
    loading.remove();
  }
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.querySelector('.search-toggle');
  const searchBar = document.querySelector('.search-bar');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchBar.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
    });
    
    searchClose?.addEventListener('click', () => {
      searchBar.classList.remove('active');
      searchInput.value = '';
    });
    
    searchBtn?.addEventListener('click', () => {
      performSearch(searchInput.value);
    });
    
    searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }
  
  // Update cart badge on all pages
  CartManager.updateBadge();
  
  // Mobile menu toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
  }
});

function performSearch(query) {
  if (query.trim()) {
    window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
  }
}

// Update cart badge helper
function updateCartBadge() {
  CartManager.updateBadge();
}

// Format currency
function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}
