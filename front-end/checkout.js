// Checkout steps navigation
function nextStep(step) {
  // Hide all sections
  document.querySelectorAll('.checkout-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const sections = ['personal-info', 'delivery-info', 'payment-info'];
  document.getElementById(sections[step - 1]).classList.add('active');

  // Update progress steps
  document.querySelectorAll('.step').forEach((stepEl, index) => {
    if (index < step) {
      stepEl.classList.add('active');
    } else {
      stepEl.classList.remove('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
  nextStep(step);
}

async function finishOrder() {
  try {
    // Get form data
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;

    if (!name || !email || !phone) {
      showAlert('error', 'Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    if (!paymentMethod) {
      showAlert('error', 'Erro', 'Selecione um método de pagamento.');
      return;
    }

    // Get cart items
    const cart = CartManager.getCart();
    if (cart.length === 0) {
      showAlert('error', 'Carrinho vazio', 'Adicione produtos ao carrinho antes de finalizar.');
      return;
    }

    // Prepare order data
    const orderData = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      userId: API.auth.isAuthenticated() ? API.auth.getUser().id : null
    };

    // Create order via API
    showLoading('Processando pedido...');
    const order = await API.orders.create(orderData);
    hideLoading();

    // Store order info
    localStorage.setItem('last_order_id', order.id);
    localStorage.setItem('last_order_total', order.total);
    localStorage.setItem('last_payment_method', paymentMethod);

    // If PIX, generate QR Code
    if (paymentMethod === 'pix') {
      const pixCode = generatePixCode(order);
      localStorage.setItem('pix_code', pixCode);
    }

    // Clear cart
    CartManager.clearCart();

    // Redirect to success page
    window.location.href = 'order-success.html';
  } catch (error) {
    hideLoading();
    showAlert('error', 'Erro ao processar pedido', error.message);
  }
}

function generatePixCode(order) {
  // Simulated PIX code generation
  // In production, this should come from a payment gateway
  const pixKey = 'sobody@pix.com.br';
  const amount = parseFloat(order.total).toFixed(2);
  const orderId = order.id.substring(0, 8);

  // Simplified PIX code (in production, use proper EMV format)
  return `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${amount.length}${amount}5802BR5913SO BODY LTDA6009SAO PAULO62070503***${orderId}6304`;
}

function showAlert(type, title, message) {
  const alertContainer = document.createElement('div');
  alertContainer.className = `custom-alert alert-${type}`;

  const icons = {
    success: 'fa-check',
    error: 'fa-times',
    warning: 'fa-exclamation',
    info: 'fa-info'
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

// Payment method switching
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', function () {
    if (this.value === 'credit') {
      document.getElementById('credit-card-form').style.display = 'block';
    } else {
      document.getElementById('credit-card-form').style.display = 'none';
      if (this.value === 'pix') {
        showAlert('info', 'PIX Selecionado', 'O código PIX será gerado após a confirmação do pedido.');
      } else if (this.value === 'boleto') {
        showAlert('info', 'Boleto Selecionado', 'O boleto será gerado após a confirmação do pedido.');
      }
    }
  });
});

// CEP lookup simulation
document.querySelector('.cep-btn')?.addEventListener('click', function () {
  showAlert('success', 'CEP Encontrado', 'Endereço preenchido automaticamente.');
});
