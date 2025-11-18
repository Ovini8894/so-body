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

function finishOrder() {
  // Simulate order processing
  window.location.href = 'order-success.html';
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
  radio.addEventListener('change', function() {
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
document.querySelector('.cep-btn')?.addEventListener('click', function() {
  showAlert('success', 'CEP Encontrado', 'Endereço preenchido automaticamente.');
});
