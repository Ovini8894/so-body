// Catalog page with API integration
let allProducts = [];
let allCategories = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadCategories();
  await loadProducts();

  const filterButtons = document.querySelectorAll('.filter-btn-catalog');
  const productCount = document.getElementById('product-count');
  const sortSelect = document.getElementById('sort-products');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const applyFilterBtn = document.querySelector('.apply-filter-btn');
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const catalogFilters = document.querySelector('.catalog-filters');

  let currentCategory = 'all';
  let minPrice = 0;
  let maxPrice = 10000;

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
    maxPrice = parseFloat(maxPriceInput.value) || 10000;
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
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    let filtered = allProducts.filter(product => {
      const matchesCategory = currentCategory === 'all' || product.categoryId === currentCategory;
      const price = parseFloat(product.price);
      const matchesPrice = price >= minPrice && price <= maxPrice;
      return matchesCategory && matchesPrice;
    });

    filtered.forEach(product => {
      grid.appendChild(createProductCard(product));
    });

    productCount.textContent = filtered.length;
  }

  function sortProducts(sortType) {
    const grid = document.getElementById('products-grid');
    const cards = Array.from(grid.children);

    cards.sort((a, b) => {
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

    grid.innerHTML = '';
    cards.forEach(card => grid.appendChild(card));
  }
});

async function loadCategories() {
  try {
    allCategories = await API.categories.getAll();
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    showAlert('error', 'Erro', 'Não foi possível carregar as categorias');
  }
}

async function loadProducts() {
  try {
    allProducts = await API.products.getAll();
    renderProducts(allProducts);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    showAlert('error', 'Erro', 'Não foi possível carregar os produtos');
  }
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  const productCount = document.getElementById('product-count');

  grid.innerHTML = '';

  products.forEach(product => {
    grid.appendChild(createProductCard(product));
  });

  productCount.textContent = products.length;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'catalog-product-card';
  card.dataset.category = product.categoryId;
  card.dataset.price = product.price;
  card.dataset.name = product.name;
  card.dataset.id = product.id;

  const isInWishlist = WishlistManager.isInWishlist(product.id);
  const heartIcon = isInWishlist ? 'fas' : 'far';
  const heartColor = isInWishlist ? 'style="color: var(--primary-gold)"' : '';

  card.innerHTML = `
    <div class="product-image-wrapper">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-badge">${product.category?.name || 'Produto'}</div>
      <div class="quick-actions">
        <button class="quick-action-btn favorite-btn" title="Adicionar aos favoritos">
          <i class="${heartIcon} fa-heart" ${heartColor}></i>
        </button>
        <button class="quick-action-btn" title="Ver detalhes" onclick="window.location.href='product.html?id=${product.id}'">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name-catalog">${product.name}</h3>
      <p class="product-description">${product.description || 'Produto de qualidade premium'}</p>
      <div class="product-footer">
        <span class="product-price">${formatCurrency(parseFloat(product.price))}</span>
        <button class="add-to-cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  `;

  // Add to cart functionality
  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    const productData = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      category: product.category?.name,
      size: 'M',
      quantity: 1
    };

    CartManager.addItem(productData);

    addToCartBtn.innerHTML = '<i class="fas fa-check"></i><span>Adicionado!</span>';
    addToCartBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

    setTimeout(() => {
      addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Adicionar ao Carrinho</span>';
      addToCartBtn.style.background = '';
    }, 2000);

    showAlert('success', 'Produto adicionado!', `${product.name} foi adicionado ao carrinho.`);
  });

  // Favorite functionality
  const favoriteBtn = card.querySelector('.favorite-btn');
  favoriteBtn.addEventListener('click', () => {
    const productData = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      category: product.category?.name
    };

    const added = WishlistManager.toggleItem(productData);
    const icon = favoriteBtn.querySelector('i');

    if (added) {
      icon.classList.replace('far', 'fas');
      icon.style.color = 'var(--primary-gold)';
      showAlert('success', 'Adicionado aos favoritos!', `${product.name} foi salvo na sua lista de desejos.`);
    } else {
      icon.classList.replace('fas', 'far');
      icon.style.color = '';
      showAlert('info', 'Removido dos favoritos', `${product.name} foi removido da sua lista de desejos.`);
    }
  });

  return card;
}
