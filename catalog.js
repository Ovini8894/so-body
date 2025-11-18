document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn-catalog');
  const productCards = document.querySelectorAll('.catalog-product-card');
  const productCount = document.getElementById('product-count');
  const sortSelect = document.getElementById('sort-products');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const applyFilterBtn = document.querySelector('.apply-filter-btn');
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const catalogFilters = document.querySelector('.catalog-filters');

  let currentCategory = 'all';
  let minPrice = 0;
  let maxPrice = 1000;

  // Filtro por categoria
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.dataset.category;
      filterProducts();
    });
  });

  // Filtro de preço
  applyFilterBtn?.addEventListener('click', () => {
    minPrice = parseFloat(minPriceInput.value) || 0;
    maxPrice = parseFloat(maxPriceInput.value) || 1000;
    filterProducts();
  });

  // Ordenação
  sortSelect?.addEventListener('change', () => {
    sortProducts(sortSelect.value);
  });

  // Toggle filtros mobile
  mobileFilterBtn?.addEventListener('click', () => {
    catalogFilters.classList.toggle('active');
  });

  function filterProducts() {
    let visibleCount = 0;

    productCards.forEach(card => {
      const category = card.dataset.category;
      const price = parseFloat(card.dataset.price);

      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      if (matchesCategory && matchesPrice) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    productCount.textContent = visibleCount;
  }

  function sortProducts(sortType) {
    const grid = document.getElementById('products-grid');
    const cardsArray = Array.from(productCards);

    cardsArray.sort((a, b) => {
      switch (sortType) {
        case 'name-asc':
          return a.dataset.name.localeCompare(b.dataset.name);
        case 'name-desc':
          return b.dataset.name.localeCompare(a.dataset.name);
        case 'price-asc':
          return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        case 'price-desc':
          return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        default:
          return 0;
      }
    });

    cardsArray.forEach(card => grid.appendChild(card));
  }

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.catalog-product-card');
      const productId = card.dataset.name.toLowerCase().replace(/\s+/g, '-');
      const productName = card.querySelector('.product-name-catalog').textContent;
      const productPrice = parseFloat(card.dataset.price);
      const productImage = card.querySelector('.product-image').src;
      const productCategory = card.dataset.category;
      
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory,
        size: 'M',
        quantity: 1
      };
      
      CartManager.addItem(product);
      
      button.innerHTML = '<i class="fas fa-check"></i><span>Adicionado!</span>';
      button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Adicionar ao Carrinho</span>';
        button.style.background = '';
      }, 2000);
      
      showAlert('success', 'Produto adicionado!', `${productName} foi adicionado ao carrinho.`);
    });
  });

  const favoriteButtons = document.querySelectorAll('.quick-action-btn[title="Adicionar aos favoritos"]');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.catalog-product-card');
      const productId = card.dataset.name.toLowerCase().replace(/\s+/g, '-');
      const productName = card.querySelector('.product-name-catalog').textContent;
      const productPrice = parseFloat(card.dataset.price);
      const productImage = card.querySelector('.product-image').src;
      const productCategory = card.dataset.category;
      
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory
      };
      
      const added = WishlistManager.toggleItem(product);
      const icon = button.querySelector('i');
      
      if (added) {
        icon.classList.replace('far', 'fas');
        icon.style.color = 'var(--primary-gold)';
        showAlert('success', 'Adicionado aos favoritos!', `${productName} foi salvo na sua lista de desejos.`);
      } else {
        icon.classList.replace('fas', 'far');
        icon.style.color = '';
        showAlert('info', 'Removido dos favoritos', `${productName} foi removido da sua lista de desejos.`);
      }
    });
  });
});
