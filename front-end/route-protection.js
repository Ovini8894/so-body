// Route protection utilities

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!API.auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Protect admin page - redirect if not admin
function protectAdminPage() {
    if (!API.auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }

    if (!API.auth.isAdmin()) {
        alert('Acesso negado. Apenas administradores podem acessar esta página.');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// Update navbar based on authentication status
function updateNavbar() {
    const user = API.auth.getUser();

    if (API.auth.isAuthenticated()) {
        // Add user menu
        const navbarIcons = document.querySelector('.navbar-icons');
        if (navbarIcons && !document.getElementById('user-menu')) {
            const userMenu = document.createElement('div');
            userMenu.id = 'user-menu';
            userMenu.className = 'navbar-icon user-menu';
            userMenu.innerHTML = `
        <i class="fas fa-user-circle"></i>
        <div class="user-dropdown">
          <div class="user-info">
            <strong>${user.name}</strong>
            <span>${user.email}</span>
          </div>
          <a href="my-orders.html"><i class="fas fa-list"></i> Meus Pedidos</a>
          ${user.role === 'ADMIN' ? '<a href="admin.html"><i class="fas fa-cog"></i> Painel Admin</a>' : ''}
          <a href="#" onclick="API.auth.logout()"><i class="fas fa-sign-out-alt"></i> Sair</a>
        </div>
      `;
            navbarIcons.insertBefore(userMenu, navbarIcons.firstChild);
        }
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateNavbar);
