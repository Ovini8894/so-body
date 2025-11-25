const DELIVERY_INFO = {
  orderNumber: 'SB-2025-001234',
  trackingCode: 'BR123456789BR',
  lastUpdate: 'Atualizado em 20/11 - 09h12'
};

document.addEventListener('DOMContentLoaded', () => {
  hydrateSimpleView();
  initCopyButton();
  updateCorreiosLink();
});

function hydrateSimpleView() {
  setText('#order-number-display', DELIVERY_INFO.orderNumber);
  setText('#tracking-code-display', DELIVERY_INFO.trackingCode);
  setText('#last-update-display', DELIVERY_INFO.lastUpdate);
}

function initCopyButton() {
  const copyBtn = document.getElementById('copy-code-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard?.writeText(DELIVERY_INFO.trackingCode);
      showAlert?.('success', 'Código copiado', 'Cole o código no site dos Correios.');
    } catch (error) {
      console.error('Copy failed', error);
      showAlert?.('error', 'Não foi possível copiar', 'Copie manualmente o código acima.');
    }
  });
}

function updateCorreiosLink() {
  const link = document.getElementById('correios-link');
  if (!link) return;

  const url = new URL('https://rastreamento.correios.com.br/app/index.php');
  url.searchParams.set('objeto', DELIVERY_INFO.trackingCode);
  link.href = url.toString();
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  }
}

