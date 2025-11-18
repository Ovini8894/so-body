// Navigation between sections
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.admin-menu-link[data-section]');
  const sections = document.querySelectorAll('.admin-section');
  const sectionTitle = document.getElementById('section-title');
  
  // Section titles mapping
  const sectionTitles = {
    'dashboard': 'Dashboard',
    'produtos': 'Produtos',
    'pedidos': 'Pedidos',
    'clientes': 'Clientes',
    'categorias': 'Categorias',
    'relatorios': 'Relatórios',
    'configuracoes': 'Configurações'
  };
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      
      // Remove active class from all links
      menuLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));
      
      // Show target section
      const section = document.getElementById(`${targetSection}-section`);
      if (section) {
        section.classList.add('active');
        sectionTitle.textContent = sectionTitles[targetSection];
      }
    });
  });
  
  // Set initial active state
  const firstLink = document.querySelector('.admin-menu-link[data-section="dashboard"]');
  if (firstLink) {
    firstLink.classList.add('active');
  }
  
  // Product Modal
  const productModal = document.getElementById('product-modal');
  const addProductBtn = document.getElementById('add-product-btn');
  const productForm = document.getElementById('product-form');
  
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      productModal.classList.add('active');
    });
  }
  
  // Category Modal
  const categoryModal = document.getElementById('category-modal');
  const addCategoryBtn = document.getElementById('add-category-btn');
  const categoryForm = document.getElementById('category-form');
  
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
      categoryModal.classList.add('active');
    });
  }
  
  // Close modals
  const closeButtons = document.querySelectorAll('.modal-close, .modal-btn-cancel');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      productModal.classList.remove('active');
      categoryModal.classList.remove('active');
    });
  });
  
  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === productModal) {
      productModal.classList.remove('active');
    }
    if (e.target === categoryModal) {
      categoryModal.classList.remove('active');
    }
  });
  
  // Product form submission
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const productName = document.getElementById('product-name').value;
      const productCategory = document.getElementById('product-category').value;
      const productPrice = document.getElementById('product-price').value;
      const productStock = document.getElementById('product-stock').value;
      
      console.log('[v0] New product:', {
        name: productName,
        category: productCategory,
        price: productPrice,
        stock: productStock
      });
      
      // Here you would send the data to your backend
      alert('Produto adicionado com sucesso!');
      productModal.classList.remove('active');
      productForm.reset();
    });
  }
  
  // Category form submission
  if (categoryForm) {
    categoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const categoryName = document.getElementById('category-name').value;
      const categoryIcon = document.getElementById('category-icon').value;
      const categoryColor = document.getElementById('category-color').value;
      
      console.log('[v0] New category:', {
        name: categoryName,
        icon: categoryIcon,
        color: categoryColor
      });
      
      // Here you would send the data to your backend
      alert('Categoria adicionada com sucesso!');
      categoryModal.classList.remove('active');
      categoryForm.reset();
    });
  }
  
  // Filter buttons for orders
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      console.log('[v0] Filtering orders by:', filter);
      // Here you would filter the orders table
    });
  });
  
  // Delete confirmations
  const deleteButtons = document.querySelectorAll('.action-btn.delete');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja excluir este item?')) {
        console.log('[v0] Item deleted');
        // Here you would delete the item
      }
    });
  });
});
