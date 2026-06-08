document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Sidebar navigation active state handler
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        // Allow default navigation
        return;
      }
      
      e.preventDefault();
      
      // Remove active class from all links
      sidebarLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to current clicked link
      link.classList.add('active');
      
      // Dynamic header text update based on menu item
      const tabName = link.querySelector('span').innerText;
      const dashboardTitle = document.querySelector('.dashboard-title');
      if (dashboardTitle) {
        if (tabName === 'Overview') {
          dashboardTitle.innerText = 'Admin Dashboard';
        } else {
          dashboardTitle.innerText = `${tabName} Management`;
        }
      }
      
      // On mobile, automatically close sidebar after choosing a tab
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Mobile menu sidebar toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar if clicking outside of it on mobile
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Visual feedback for date selector
  const dateSelector = document.getElementById('date-selector-btn');
  if (dateSelector) {
    dateSelector.addEventListener('click', () => {
      // Toggle color or show a toast
      dateSelector.style.borderColor = 'var(--text-primary)';
      setTimeout(() => {
        dateSelector.style.borderColor = '';
      }, 1500);
    });
  }

  // Visual hover effect logger for table action buttons
  const actionBtns = document.querySelectorAll('.btn-small');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const actionName = btn.innerText;
      const row = btn.closest('tr');
      if (!row) return;
      
      const studentEl = row.querySelector('.student-name');
      const studentName = studentEl ? studentEl.innerText : 'N/A';
      
      const courseEl = row.querySelector('.course-title');
      const courseName = courseEl ? courseEl.innerText : 'N/A';
      
      alert(`Vận hành: [${actionName}] cho học viên "${studentName}" - Khóa học "${courseName}"`);
    });
  });

  // Visual hover effect logger for alerts
  const alertItems = document.querySelectorAll('.alert-item');
  alertItems.forEach(item => {
    item.addEventListener('click', () => {
      const alertTitleEl = item.querySelector('.alert-title');
      const alertTitle = alertTitleEl ? alertTitleEl.innerText : 'N/A';
      
      const alertCountEl = item.querySelector('.alert-count, .alert-count-neutral');
      const alertCount = alertCountEl ? alertCountEl.innerText : '0';
      
      alert(`Điều hướng tới trang chi tiết: "${alertTitle}" (${alertCount} mục cần xử lý)`);
    });
  });
});
