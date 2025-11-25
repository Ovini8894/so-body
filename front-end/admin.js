// ========================================
// INPUT FORMATTING FUNCTIONS
// ========================================

// Format currency (R$ 0,00)
function formatCurrency(value) {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  if (!value) return '';
  
  // Converte para número e divide por 100 para ter centavos
  const number = (parseInt(value, 10) / 100).toFixed(2);
  
  // Formata com separadores
  return 'R$ ' + number.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Format phone (00) 00000-0000
function formatPhone(value) {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  if (!value) return '';
  
  // Aplica máscara
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
  } else {
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
  }
}

// Format CPF 000.000.000-00
function formatCPF(value) {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  if (!value) return '';
  
  // Limita a 11 dígitos
  value = value.substring(0, 11);
  
  // Aplica máscara
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Remove formatting for storage
function unformatCurrency(value) {
  return value.replace(/[^\d,]/g, '').replace(',', '.');
}

function unformatPhone(value) {
  return value.replace(/\D/g, '');
}

function unformatCPF(value) {
  return value.replace(/\D/g, '');
}

// Theme Toggle Functionality
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const adminPage = document.querySelector('.admin-page');
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('admin-theme') || 'light';
  
  // Apply theme
  if (currentTheme === 'dark') {
    adminPage.classList.add('theme-dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    adminPage.classList.remove('theme-dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = adminPage.classList.contains('theme-dark');
      
      if (isDark) {
        adminPage.classList.remove('theme-dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('admin-theme', 'light');
      } else {
        adminPage.classList.add('theme-dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('admin-theme', 'dark');
      }
    });
  }
}

// Navigation between sections
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // ========================================
  // INPUT MASKING
  // ========================================
  
  // Price inputs
  const priceInputs = document.querySelectorAll('#product-price, #edit-order-value');
  priceInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = formatCurrency(e.target.value);
    });
    
    input.addEventListener('keydown', (e) => {
      // Permite apenas números, backspace, delete, tab, escape, enter
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
    
    input.addEventListener('blur', (e) => {
      if (e.target.value && !e.target.value.includes('R$')) {
        e.target.value = formatCurrency(e.target.value);
      }
    });
  });
  
  // Phone inputs
  const phoneInputs = document.querySelectorAll('#client-phone');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
    });
    
    input.addEventListener('keydown', (e) => {
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
  });
  
  // CPF inputs
  const cpfInputs = document.querySelectorAll('#client-cpf');
  cpfInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = formatCPF(e.target.value);
    });
    
    input.addEventListener('keydown', (e) => {
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
  });
  
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

  // View all orders link
  const viewAllOrdersLink = document.getElementById('view-all-orders-link');
  if (viewAllOrdersLink) {
    viewAllOrdersLink.addEventListener('click', (e) => {
      e.preventDefault();
      const pedidosLink = document.querySelector('.admin-menu-link[data-section="pedidos"]');
      if (pedidosLink) {
        pedidosLink.click();
      }
    });
  }

  // ========================================
  // PRODUCT MODAL
  // ========================================
  const productModal = document.getElementById('product-modal');
  const addProductBtn = document.getElementById('add-product-btn');
  const productForm = document.getElementById('product-form');
  
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      productModal.classList.add('active');
    });
  }
  
  // ========================================
  // CATEGORY MODAL
  // ========================================
  const categoryModal = document.getElementById('category-modal');
  const addCategoryBtn = document.getElementById('add-category-btn');
  const categoryForm = document.getElementById('category-form');
  
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
      categoryModal.classList.add('active');
    });
  }

  // ========================================
  // CLIENT MODAL
  // ========================================
  const clientModal = document.getElementById('client-modal');
  const addClientBtn = document.getElementById('add-client-btn');
  const clientForm = document.getElementById('client-form');
  const clientModalTitle = document.getElementById('client-modal-title');
  let editingClientId = null;

  if (addClientBtn) {
    addClientBtn.addEventListener('click', () => {
      editingClientId = null;
      clientModalTitle.textContent = 'Adicionar Cliente';
      clientForm.reset();
      clientModal.classList.add('active');
    });
  }

  // Edit client
  document.querySelectorAll('.action-btn.edit[data-client-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const clientId = btn.getAttribute('data-client-id');
      const row = btn.closest('tr');
      editingClientId = clientId;
      clientModalTitle.textContent = 'Editar Cliente';
      
      document.getElementById('client-name').value = row.cells[1].textContent;
      document.getElementById('client-email').value = row.cells[2].textContent;
      document.getElementById('client-phone').value = row.cells[3].textContent;
      document.getElementById('client-cpf').value = ''; // CPF não está na tabela, deixar vazio
      
      clientModal.classList.add('active');
    });
  });

  // View client
  document.querySelectorAll('.action-btn.view[data-client-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const clientId = btn.getAttribute('data-client-id');
      const row = btn.closest('tr');
      const viewModal = document.getElementById('view-client-modal');
      
      document.getElementById('view-client-id').textContent = row.cells[0].textContent;
      document.getElementById('view-client-name').textContent = row.cells[1].textContent;
      document.getElementById('view-client-email').textContent = row.cells[2].textContent;
      document.getElementById('view-client-phone').textContent = row.cells[3].textContent;
      document.getElementById('view-client-cpf').textContent = 'Não informado';
      document.getElementById('view-client-total').textContent = row.cells[4].textContent;
      document.getElementById('view-client-date').textContent = row.cells[5].textContent;
      
      viewModal.classList.add('active');
    });
  });

  // ========================================
  // ORDER MODALS
  // ========================================
  const editOrderModal = document.getElementById('edit-order-modal');
  const viewOrderModal = document.getElementById('view-order-modal');
  let editingOrderId = null;

  // Edit order
  document.querySelectorAll('.action-btn.edit[data-order-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = btn.getAttribute('data-order-id');
      const row = btn.closest('tr');
      editingOrderId = orderId;
      
      document.getElementById('edit-order-id').value = row.cells[0].textContent;
      document.getElementById('edit-order-client').value = row.cells[1].textContent;
      document.getElementById('edit-order-product').value = row.cells[2].textContent;
      // Formata o valor se não estiver formatado
      let orderValue = row.cells[3].textContent.trim();
      if (orderValue && !orderValue.includes('R$')) {
        // Remove caracteres não numéricos e formata
        const numbers = orderValue.replace(/\D/g, '');
        orderValue = formatCurrency(numbers);
      }
      document.getElementById('edit-order-value').value = orderValue || 'R$ 0,00';
      
      const statusBadge = row.querySelector('.status-badge');
      let statusValue = 'pending';
      if (statusBadge) {
        if (statusBadge.classList.contains('status-paid')) statusValue = 'paid';
        else if (statusBadge.classList.contains('status-shipped')) statusValue = 'shipped';
      }
      document.getElementById('edit-order-status').value = statusValue;
      
      editOrderModal.classList.add('active');
    });
  });

  // View order
  document.querySelectorAll('.action-btn.view[data-order-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = btn.getAttribute('data-order-id');
      const row = btn.closest('tr');
      
      document.getElementById('view-order-id').textContent = row.cells[0].textContent;
      document.getElementById('view-order-client').textContent = row.cells[1].textContent;
      document.getElementById('view-order-product').textContent = row.cells[2].textContent;
      document.getElementById('view-order-value').textContent = row.cells[3].textContent;
      document.getElementById('view-order-date').textContent = row.cells[4] ? row.cells[4].textContent : '-';
      document.getElementById('view-order-status').textContent = row.querySelector('.status-badge')?.textContent || '-';
      
      viewOrderModal.classList.add('active');
    });
  });

  // ========================================
  // PRODUCT VIEW MODAL
  // ========================================
  document.querySelectorAll('.action-btn.view[data-product-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = btn.getAttribute('data-product-id');
      const productItem = btn.closest('.product-item');
      const viewModal = document.getElementById('view-product-modal');
      
      document.getElementById('view-product-name').textContent = productItem.querySelector('.product-item-name')?.textContent || '-';
      document.getElementById('view-product-category').textContent = productItem.querySelector('.product-item-category')?.textContent || '-';
      document.getElementById('view-product-price').textContent = productItem.querySelector('.product-item-price')?.textContent || '-';
      document.getElementById('view-product-stock').textContent = productItem.querySelector('.product-item-stock')?.textContent || '-';
      
      viewModal.classList.add('active');
    });
  });

  // ========================================
  // CATEGORY EDIT MODAL
  // ========================================
  const editCategoryModal = document.getElementById('edit-category-modal');
  let editingCategoryId = null;

  document.querySelectorAll('.action-btn.edit[data-category-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const categoryId = btn.getAttribute('data-category-id');
      const categoryCard = btn.closest('.category-card');
      editingCategoryId = categoryId;
      
      document.getElementById('edit-category-name').value = categoryCard.querySelector('.category-name')?.textContent || '';
      // Set icon and color based on category
      editCategoryModal.classList.add('active');
    });
  });

  // ========================================
  // DELETE CONFIRMATION MODAL
  // ========================================
  const deleteConfirmModal = document.getElementById('delete-confirm-modal');
  const deleteConfirmMessage = document.getElementById('delete-confirm-message');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  let itemToDelete = null;
  let deleteType = null;

  // Delete buttons for orders
  document.querySelectorAll('.action-btn.delete[data-order-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const orderId = btn.getAttribute('data-order-id');
      const row = btn.closest('tr');
      itemToDelete = row;
      deleteType = 'order';
      deleteConfirmMessage.textContent = `Tem certeza que deseja excluir o pedido ${orderId}? Esta ação não pode ser desfeita.`;
      deleteConfirmModal.classList.add('active');
    });
  });

  // Delete buttons for clients
  document.querySelectorAll('.action-btn.delete[data-client-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const clientId = btn.getAttribute('data-client-id');
      const row = btn.closest('tr');
      itemToDelete = row;
      deleteType = 'client';
      deleteConfirmMessage.textContent = `Tem certeza que deseja excluir o cliente ${clientId}? Esta ação não pode ser desfeita.`;
      deleteConfirmModal.classList.add('active');
    });
  });

  // Delete buttons for categories - will be handled by attachCategoryEventListeners

  // Delete buttons for products
  document.querySelectorAll('.action-btn.delete[data-product-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.getAttribute('data-product-id');
      const productItem = btn.closest('.product-item');
      itemToDelete = productItem;
      deleteType = 'product';
      deleteConfirmMessage.textContent = `Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.`;
      deleteConfirmModal.classList.add('active');
    });
  });

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (itemToDelete) {
        itemToDelete.remove();
        console.log(`[v0] ${deleteType} deleted`);
        deleteConfirmModal.classList.remove('active');
        itemToDelete = null;
        deleteType = null;
      }
    });
  }

  // ========================================
  // ORDER FILTERS
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const orderRows = document.querySelectorAll('#pedidos-section tbody tr');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      orderRows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          const status = row.getAttribute('data-status');
          if (status === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        }
      });
    });
  });

  // ========================================
  // ORDER SEARCH
  // ========================================
  const orderSearch = document.getElementById('order-search');
  if (orderSearch) {
    orderSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      orderRows.forEach(row => {
        const orderId = row.cells[0].textContent.toLowerCase();
        if (orderId.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // ========================================
  // MODAL CLOSE HANDLERS
  // ========================================
  const closeButtons = document.querySelectorAll('.modal-close, .modal-btn-cancel');
  const allModals = document.querySelectorAll('.modal');
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      allModals.forEach(modal => modal.classList.remove('active'));
    });
  });

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    allModals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // ========================================
  // FORM SUBMISSIONS
  // ========================================
  
  // Product form
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
      
      if (typeof showAlert === 'function') {
        showAlert('success', 'Sucesso!', 'Produto adicionado com sucesso!');
      } else {
        alert('Produto adicionado com sucesso!');
      }
      productModal.classList.remove('active');
      productForm.reset();
    });
  }
  
  // Category form - Add new category
  if (categoryForm) {
    categoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const categoryName = document.getElementById('category-name').value;
      const categoryIcon = document.getElementById('category-icon').value;
      const categoryColor = document.getElementById('category-color').value;
      
      if (!categoryName || !categoryIcon) {
        if (typeof showAlert === 'function') {
          showAlert('error', 'Erro!', 'Por favor, preencha todos os campos obrigatórios.');
        } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
        }
        return;
      }
      
      // Create new category card
      const categoriesGrid = document.querySelector('.categories-grid');
      if (categoriesGrid) {
        const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-category-id', categoryId);
        
        // Get icon class from select value
        const iconClass = categoryIcon.startsWith('fa-') ? categoryIcon : `fa-${categoryIcon}`;
        
        // Convert hex color to RGB for gradient
        const hexToRgb = (hex) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        };
        
        const rgb = hexToRgb(categoryColor);
        const darkerColor = rgb ? `rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)})` : categoryColor;
        
        categoryCard.innerHTML = `
          <div class="category-icon" style="background: linear-gradient(135deg, ${categoryColor} 0%, ${darkerColor} 100%);">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="category-info">
            <h3 class="category-name">${categoryName}</h3>
            <p class="category-count">0 produtos</p>
          </div>
          <div class="category-actions">
            <button class="action-btn edit" data-category-id="${categoryId}"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" data-category-id="${categoryId}"><i class="fas fa-trash"></i></button>
          </div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
        
        // Re-attach event listeners for new buttons
        attachCategoryEventListeners(categoryCard);
      }
      
      if (typeof showAlert === 'function') {
        showAlert('success', 'Sucesso!', 'Categoria adicionada com sucesso!');
      } else {
        alert('Categoria adicionada com sucesso!');
      }
      categoryModal.classList.remove('active');
      categoryForm.reset();
    });
  }
  
  // Function to attach event listeners to category buttons
  function attachCategoryEventListeners(categoryCard) {
    const editBtn = categoryCard.querySelector('.action-btn.edit');
    const deleteBtn = categoryCard.querySelector('.action-btn.delete');
    
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        const categoryId = editBtn.getAttribute('data-category-id');
        const categoryName = categoryCard.querySelector('.category-name')?.textContent || '';
        editingCategoryId = categoryId;
        
        document.getElementById('edit-category-name').value = categoryName;
        // Set icon and color based on category
        editCategoryModal.classList.add('active');
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const categoryId = deleteBtn.getAttribute('data-category-id');
        itemToDelete = categoryCard;
        deleteType = 'category';
        deleteConfirmMessage.textContent = `Tem certeza que deseja excluir a categoria "${categoryCard.querySelector('.category-name')?.textContent}"? Esta ação não pode ser desfeita.`;
        deleteConfirmModal.classList.add('active');
      });
    }
  }

  // Edit category form
  const editCategoryForm = document.getElementById('edit-category-form');
  if (editCategoryForm) {
    editCategoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const categoryName = document.getElementById('edit-category-name').value;
      const categoryIcon = document.getElementById('edit-category-icon').value;
      const categoryColor = document.getElementById('edit-category-color').value;
      
      if (!categoryName || !categoryIcon) {
        if (typeof showAlert === 'function') {
          showAlert('error', 'Erro!', 'Por favor, preencha todos os campos obrigatórios.');
        } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
        }
        return;
      }
      
      // Update category card
      if (editingCategoryId) {
        const categoryCard = document.querySelector(`.category-card[data-category-id="${editingCategoryId}"]`);
        if (categoryCard) {
          const categoryNameEl = categoryCard.querySelector('.category-name');
          if (categoryNameEl) {
            categoryNameEl.textContent = categoryName;
          }
          
          const iconEl = categoryCard.querySelector('.category-icon i');
          if (iconEl) {
            const iconClass = categoryIcon.startsWith('fa-') ? categoryIcon : `fa-${categoryIcon}`;
            iconEl.className = `fas ${iconClass}`;
          }
          
          const iconDiv = categoryCard.querySelector('.category-icon');
          if (iconDiv && categoryColor) {
            const hexToRgb = (hex) => {
              const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
              } : null;
            };
            
            const rgb = hexToRgb(categoryColor);
            const darkerColor = rgb ? `rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)})` : categoryColor;
            iconDiv.style.background = `linear-gradient(135deg, ${categoryColor} 0%, ${darkerColor} 100%)`;
          }
        }
      }
      
      if (typeof showAlert === 'function') {
        showAlert('success', 'Sucesso!', 'Categoria atualizada com sucesso!');
      } else {
        alert('Categoria atualizada com sucesso!');
      }
      editCategoryModal.classList.remove('active');
      editingCategoryId = null;
    });
  }

  // Client form
  if (clientForm) {
    clientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clientName = document.getElementById('client-name').value;
      const clientEmail = document.getElementById('client-email').value;
      const clientPhone = document.getElementById('client-phone').value;
      const clientCpf = document.getElementById('client-cpf').value;
      
      console.log(editingClientId ? '[v0] Client updated:' : '[v0] New client:', {
        id: editingClientId,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        cpf: clientCpf
      });
      
      if (typeof showAlert === 'function') {
        showAlert('success', 'Sucesso!', editingClientId ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');
      } else {
        alert(editingClientId ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');
      }
      clientModal.classList.remove('active');
      clientForm.reset();
      editingClientId = null;
    });
  }

  // Edit order form
  const editOrderForm = document.getElementById('edit-order-form');
  if (editOrderForm) {
    editOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const orderId = document.getElementById('edit-order-id').value;
      const orderClient = document.getElementById('edit-order-client').value;
      const orderProduct = document.getElementById('edit-order-product').value;
      const orderValue = document.getElementById('edit-order-value').value;
      const orderStatus = document.getElementById('edit-order-status').value;
      
      console.log('[v0] Order updated:', {
        id: orderId,
        client: orderClient,
        product: orderProduct,
        value: orderValue,
        status: orderStatus
      });
      
      // Update the row in the table
      if (editingOrderId) {
        const rows = document.querySelectorAll('#pedidos-section tbody tr, #dashboard-section tbody tr');
        rows.forEach(row => {
          if (row.cells[0].textContent === orderId) {
            row.cells[1].textContent = orderClient;
            row.cells[2].textContent = orderProduct;
            row.cells[3].textContent = orderValue;
            
            // Update status badge
            const statusBadge = row.querySelector('.status-badge');
            if (statusBadge) {
              statusBadge.className = 'status-badge';
              if (orderStatus === 'paid') {
                statusBadge.classList.add('status-paid');
                statusBadge.textContent = 'Pago';
              } else if (orderStatus === 'shipped') {
                statusBadge.classList.add('status-shipped');
                statusBadge.textContent = 'Enviado';
              } else {
                statusBadge.classList.add('status-pending');
                statusBadge.textContent = 'Pendente';
              }
            }
            
            // Update data-status attribute
            row.setAttribute('data-status', orderStatus);
          }
        });
      }
      
      if (typeof showAlert === 'function') {
        showAlert('success', 'Sucesso!', 'Pedido atualizado com sucesso!');
      } else {
        alert('Pedido atualizado com sucesso!');
      }
      editOrderModal.classList.remove('active');
      editingOrderId = null;
    });
  }
});
