document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Toast Notification Helper
  function showToast(message, type = 'success') {
    // Create toast container if not exists
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    
    // Choose icon
    let iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';
    if (type === 'info') iconName = 'info';
    
    toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ attrs: { class: 'toast-icon' } });
    }

    // Automatically remove after 3s
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Mobile Menu Sidebar Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar if clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Drawers Toggle Utilities
  const closeDrawerBtns = document.querySelectorAll('.drawer-close-btn, .close-drawer-action');
  const drawers = document.querySelectorAll('.detail-drawer');
  const gridContainer = document.querySelector('.dashboard-grid');

  function closeAllDrawers() {
    drawers.forEach(drawer => drawer.classList.add('drawer-closed'));
    if (gridContainer) {
      gridContainer.classList.remove('drawer-open');
      gridContainer.classList.add('drawer-closed');
    }
    // Remove highlighted rows
    document.querySelectorAll('tbody tr').forEach(row => row.classList.remove('selected-row'));
  }

  closeDrawerBtns.forEach(btn => {
    btn.addEventListener('click', closeAllDrawers);
  });

  // Drawer Tabs switching
  const tabs = document.querySelectorAll('.drawer-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      const drawerBody = tab.closest('.detail-drawer');
      if (!drawerBody) return;
      
      // Toggle tab header active state
      drawerBody.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Toggle tab content panels
      drawerBody.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================================
  // PAGE-SPECIFIC BEHAVIORS
  // ==========================================================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // --- 1. OVERVIEW PAGE ---
  if (currentPage === 'index.html' || currentPage === '') {
    // Interactive action items
    const viewSubBtns = document.querySelectorAll('.view-submission-trigger');
    viewSubBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.getAttribute('data-sub-id');
        window.location.href = `submissions.html?id=${subId}`;
      });
    });


  }

  // --- 2. COURSES PAGE ---
  if (currentPage === 'courses.html') {
    const courseRows = document.querySelectorAll('.course-row');
    const courseDrawer = document.getElementById('course-detail-drawer');
    
    courseRows.forEach(row => {
      const viewBtn = row.querySelector('.view-course-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const courseId = row.getAttribute('data-id');
          openCourseDetail(courseId, row);
        });
      }
      // Clicking the row opens details too
      row.addEventListener('click', () => {
        const courseId = row.getAttribute('data-id');
        openCourseDetail(courseId, row);
      });
    });

    function openCourseDetail(courseId, rowElement) {
      closeAllDrawers();
      rowElement.classList.add('selected-row');

      // Populate details dynamically
      const title = rowElement.querySelector('.course-title').innerText;
      const level = rowElement.querySelector('.course-level').innerText;
      const statusBadge = rowElement.querySelector('.badge').outerHTML;
      const studentCount = rowElement.querySelector('.student-count').innerText;
      const subCount = rowElement.querySelector('.sub-count').innerText;
      const lastUpdate = rowElement.querySelector('.last-update').innerText;

      document.getElementById('drawer-course-title').innerText = title;
      document.getElementById('drawer-course-level').innerText = level;
      document.getElementById('drawer-course-status').innerHTML = statusBadge;
      document.getElementById('drawer-course-update').innerText = `Cập nhật gần nhất: ${lastUpdate}`;
      
      // Update quick link buttons badges
      const viewSubsBtn = document.getElementById('drawer-view-submissions-btn');
      if (viewSubsBtn) {
        viewSubsBtn.innerHTML = `Xem danh sách bài nộp <span class="sidebar-badge" style="background-color: var(--color-orange); margin-left: 6px;">${subCount}</span>`;
        viewSubsBtn.onclick = () => { window.location.href = `submissions.html?course=${encodeURIComponent(title)}`; };
      }

      // Slide in drawer
      courseDrawer.classList.remove('drawer-closed');
      if (gridContainer) {
        gridContainer.classList.add('drawer-open');
        gridContainer.classList.remove('drawer-closed');
      }

      // Reset to first tab "Chương trình học"
      const firstTab = courseDrawer.querySelector('.drawer-tab[data-tab="tab-syllabus"]');
      if (firstTab) firstTab.click();
    }
  }

  // --- 3. SUBMISSIONS PAGE ---
  if (currentPage === 'submissions.html') {
    const submissionRows = document.querySelectorAll('.submission-row');
    const submissionDrawer = document.getElementById('submission-detail-drawer');
    const prevBtn = document.getElementById('btn-prev-submission');
    const nextBtn = document.getElementById('btn-next-submission');
    let activeSubmissionId = null;
    let activeRowElement = null;

    submissionRows.forEach(row => {
      const viewBtn = row.querySelector('.view-submission-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const subId = row.getAttribute('data-id');
          openSubmissionDetail(subId, row);
        });
      }
      row.addEventListener('click', () => {
        const subId = row.getAttribute('data-id');
        openSubmissionDetail(subId, row);
      });
    });

    // Mock data for student submissions detail (Expanded with attempt_no, tools_used, reflection, reviewed_by/at)
    const submissionDetailsData = {
      'submission-1': {
        name: 'Phạm Đức Trí', email: 'tri.nguyen@example.com', date: '21/05/2026 14:32',
        course: 'AI Agent & Vibe Coding Bootcamp', lesson: 'Final Project – AI Landing Page',
        type: 'Final Project', typeBadge: 'badge-indigo', status: 'Chờ duyệt', statusBadge: 'badge-purple',
        projTitle: 'AI Landing Page cho sản phẩm AI SaaS',
        projDesc: 'Em xây landing page giới thiệu sản phẩm AI giúp tự động hóa công việc. Sử dụng Next.js, TailwindCSS và Framer Motion.',
        tech: 'Next.js, TailwindCSS, TypeScript, Framer Motion, Vercel',
        learned: 'Hiểu hơn về UI animation và tối ưu hiệu năng trang.',
        challenge: 'Tối ưu animation trên mobile và xử lý SEO metadata.',
        demoUrl: 'https://ai-landing-tri.vercel.app',
        sourceUrl: 'https://github.com/trindev/ai-landing',
        fileName: 'AI_Landing_Page_Demo.pdf', fileSize: '2.4 MB',
        attempt_no: 1,
        tools_used: 'Claude 3.5 Sonnet, v0.dev',
        reflection: 'Sử dụng v0 để dựng layout nhanh chóng, sau đó dùng Claude để tích hợp tương tác và viết hiệu ứng chuyển động mượt mà. Học được cách tối ưu CSS animation.',
        reviewed_by: '', reviewed_at: ''
      },
      'submission-2': {
        name: 'Nguyễn Hoàng Anh', email: 'hoanganh@gmail.com', date: '21/05/2026 09:15',
        course: 'AI Agent & Vibe Coding Bootcamp', lesson: 'Bài tập: Viết prompt tạo layout',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Chờ duyệt', statusBadge: 'badge-purple',
        projTitle: 'Layout Vibe Coding Portfolio',
        projDesc: 'Tối ưu hóa prompt để Claude Code dựng layout trang portfolio cá nhân siêu tốc.',
        tech: 'Claude 3.5 Sonnet, HTML, Vanilla CSS',
        learned: 'Biết cách chia nhỏ cấu trúc prompt và sử dụng block style.',
        challenge: 'Đảm bảo layout responsive đồng đều giữa các section.',
        demoUrl: 'https://hoanganh-portfolio.vercel.app',
        sourceUrl: 'https://github.com/hoanganh/vibe-portfolio',
        fileName: 'Portfolio_Structure.zip', fileSize: '1.2 MB',
        attempt_no: 1,
        tools_used: 'Claude Code, Cursor',
        reflection: 'Thử nghiệm prompt lặp để cải thiện thiết kế responsive. AI tạo code nhanh nhưng đôi khi bị trùng thẻ hoặc CSS ad-hoc, cần tự tối ưu lại.',
        reviewed_by: '', reviewed_at: ''
      },
      'submission-3': {
        name: 'Mai Lan', email: 'mailan.le@example.com', date: '20/05/2026 16:48',
        course: 'Web Development with Next.js', lesson: 'Bài tập 2: Tạo landing đầu tiên',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Chờ duyệt', statusBadge: 'badge-purple',
        projTitle: 'Landing Page Bán Cà Phê Sinh Thái',
        projDesc: 'Trang landing giới thiệu và đặt mua cà phê organic, tối ưu LCP và SEO.',
        tech: 'Next.js 14 (App Router), Vanilla CSS',
        learned: 'Nắm chắc kiến thức Server Actions và Route Handlers.',
        challenge: 'Tối ưu hóa ảnh chất lượng cao mà vẫn đạt điểm Lighthouse LCP tốt.',
        demoUrl: 'https://ecocoffee.vercel.app',
        sourceUrl: 'https://github.com/mailan/eco-coffee',
        fileName: 'Eco_Coffee_Design.pdf', fileSize: '4.8 MB',
        attempt_no: 1,
        tools_used: 'ChatGPT, v0.dev',
        reflection: 'Tập trung viết CSS thuần thay vì Tailwind để rèn luyện kỹ năng Flexbox và Grid. Nhận xét: Web tải nhanh, đạt 98 điểm Lighthouse.',
        reviewed_by: '', reviewed_at: ''
      },
      'submission-4': {
        name: 'Võ Thị Khánh', email: 'khanh.vo@example.com', date: '20/05/2026 11:21',
        course: 'AI Automation Fundamentals', lesson: 'Bài tập 1: Automation workflow',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Yêu cầu chỉnh sửa', statusBadge: 'badge-orange',
        projTitle: 'Hệ thống tự động hóa Marketing Lead qua n8n',
        projDesc: 'Workflow đồng bộ dữ liệu từ Google Sheets sang HubSpot CRM và gửi email cảm ơn qua SendGrid.',
        tech: 'n8n, Google Sheets API, HubSpot CRM, SendGrid',
        learned: 'Hiểu cơ chế webhook và parsing JSON data.',
        challenge: 'Xử lý lỗi duplicate data khi webhook gửi tin trùng lặp.',
        demoUrl: 'https://n8n.cloud/workflow/marketing-leads',
        sourceUrl: 'https://github.com/khanhvo/n8n-marketing-workflow',
        fileName: 'marketing_workflow.json', fileSize: '45 KB',
        attempt_no: 2,
        tools_used: 'ChatGPT-4o',
        reflection: 'Đã sửa lại lỗi parse JSON ở Node 3 như giảng viên góp ý ở attempt 1, tuy nhiên vẫn cần tối ưu điều kiện lọc lead trùng.',
        reviewed_by: 'Instructor Tuấn', reviewed_at: '20/05/2026 15:40'
      },
      'submission-5': {
        name: 'Đỗ Quang Minh', email: 'minhdo@outlook.com', date: '19/05/2026 20:05',
        course: 'Mobile App Development', lesson: 'Final Project – Todo App',
        type: 'Final Project', typeBadge: 'badge-indigo', status: 'Đã duyệt', statusBadge: 'badge-green',
        projTitle: 'Todo List App tích hợp Widget và Cloud Sync',
        projDesc: 'Ứng dụng quản lý công việc hàng ngày với giao diện Glassmorphism, đồng bộ Cloud Firestore.',
        tech: 'Flutter, Firebase Firestore, Provider, Local Notifications',
        learned: 'Quản lý state phức tạp và tối ưu local data caching.',
        challenge: 'Đồng bộ offline data sang online mượt mà không bị xung đột timeline.',
        demoUrl: 'https://play.google.com/store/apps/details?id=todo.minhdo',
        sourceUrl: 'https://github.com/minhdo/todo-flutter',
        fileName: 'Todo_Flutter_Build.apk', fileSize: '18.4 MB',
        attempt_no: 2,
        tools_used: 'GitHub Copilot, ChatGPT',
        reflection: 'Đã thêm tính năng đồng bộ background ở lần nộp này. Ứng dụng chạy mượt mà trên cả máy ảo Android và thiết bị iOS thật.',
        reviewed_by: 'Instructor Tuấn', reviewed_at: '20/05/2026 10:12'
      },
      'submission-6': {
        name: 'Hoàng Bảo', email: 'baohoang@gmail.com', date: '19/05/2026 15:16',
        course: 'AI Automation Fundamentals', lesson: 'Bài tập: Workflow cơ bản',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Chờ duyệt', statusBadge: 'badge-purple',
        projTitle: 'Workflow Tự Động Lưu File Email Vào Google Drive',
        projDesc: 'Sử dụng n8n để lắng nghe email mới có đính kèm từ khách hàng, tự động tải xuống và lưu vào Drive theo tên khách hàng.',
        tech: 'n8n, Gmail API, Google Drive API',
        learned: 'Cách lấy token OAuth2 cho Google APIs và trích xuất file đính kèm.',
        challenge: 'Định dạng lại tên file tiếng Việt có dấu tránh lỗi hiển thị.',
        demoUrl: 'https://n8n.cloud/workflow/email-attachments',
        sourceUrl: 'https://github.com/baohoang/n8n-drive-sync',
        fileName: 'email_sync_drive.json', fileSize: '32 KB',
        attempt_no: 1,
        tools_used: 'ChatGPT',
        reflection: 'Tìm hiểu cách lấy và lọc tệp từ attachment của mail, viết script JS đơn giản để chuẩn hóa tên tệp.',
        reviewed_by: '', reviewed_at: ''
      },
      'submission-7': {
        name: 'Ngọc Trâm', email: 'tramngoc@live.com', date: '19/05/2026 10:42',
        course: 'Mobile App Development', lesson: 'Bài tập: State Management',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Yêu cầu chỉnh sửa', statusBadge: 'badge-orange',
        projTitle: 'Shopping Cart State Management với Riverpod',
        projDesc: 'Bài tập thực hành quản lý giỏ hàng trực tuyến bằng Flutter Riverpod, cập nhật số lượng, tổng tiền realtime.',
        tech: 'Flutter, Riverpod, Dart',
        learned: 'Nắm vững StateNotifier và ChangeNotifier Provider.',
        challenge: 'UI không tự động re-render khi cập nhật thuộc tính nhỏ trong class sản phẩm.',
        demoUrl: 'https://tram-shopping-cart.web.app',
        sourceUrl: 'https://github.com/tramngoc/riverpod-cart',
        fileName: 'cart_riverpod_project.zip', fileSize: '2.1 MB',
        attempt_no: 1,
        tools_used: 'ChatGPT, Phind',
        reflection: 'Quá trình lưu trữ state của Riverpod phức tạp hơn Provider, em cần thời gian làm quen với Immutable State.',
        reviewed_by: 'Instructor Tuấn', reviewed_at: '19/05/2026 16:30'
      },
      'submission-8': {
        name: 'Khánh Duy', email: 'duykhanh@gmail.com', date: '18/05/2026 18:30',
        course: 'AI Agent & Vibe Coding Bootcamp', lesson: 'Bài tập 1: AI và tương tác người dùng',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Từ chối', statusBadge: 'badge-red',
        projTitle: 'Chatbot Tự Động Trả Lời FAQs',
        projDesc: 'Sao chép đoạn mã nguồn chatbot của người khác và sửa đổi sơ sài tiêu đề.',
        tech: 'HTML, CSS, JS',
        learned: 'Không có nhiều bài học.',
        challenge: 'Không gặp thách thức nào đáng kể.',
        demoUrl: 'https://faqs-chatbot-copy.vercel.app',
        sourceUrl: 'https://github.com/duykhanh/faq-chatbot-copy',
        fileName: 'faq_chatbot.zip', fileSize: '300 KB',
        attempt_no: 1,
        tools_used: 'None',
        reflection: 'Em nộp bài này để lấy lượt xem đáp án, em chưa có thời gian tự code.',
        reviewed_by: 'Instructor Tuấn', reviewed_at: '18/05/2026 19:15'
      },
      'submission-9': {
        name: 'Yến Linh', email: 'yenlinh@gmail.com', date: '18/05/2026 16:40',
        course: 'Web Development with Next.js', lesson: 'Bài tập: Component & Props',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Đã duyệt', statusBadge: 'badge-green',
        projTitle: 'Dashboard Component Card Library',
        projDesc: 'Tạo bộ library các component card nhỏ dùng cho trang dashboard bán hàng, sử dụng props linh hoạt để tùy biến màu sắc, icon.',
        tech: 'Next.js, React, TailwindCSS',
        learned: 'Hiểu sâu về Reusability và Children Props trong React.',
        challenge: 'Xử lý typescript type cho icon props linh hoạt.',
        demoUrl: 'https://dash-cards-yenlinh.vercel.app',
        sourceUrl: 'https://github.com/yenlinh/nextjs-component-cards',
        fileName: 'Dashboard_Cards_Lib.zip', fileSize: '1.5 MB',
        attempt_no: 1,
        tools_used: 'Claude Code, v0.dev',
        reflection: 'Tận dụng tốt tính chất props để giảm bớt code dư thừa. Bộ component rất linh hoạt và dễ tái sử dụng.',
        reviewed_by: 'Instructor Tuấn', reviewed_at: '18/05/2026 18:20'
      },
      'submission-10': {
        name: 'Quang Nam', email: 'quangnam@gmail.com', date: '18/05/2026 10:22',
        course: 'AI Automation Fundamentals', lesson: 'Bài tập: API Integration',
        type: 'Assignment', typeBadge: 'badge-orange', status: 'Chờ duyệt', statusBadge: 'badge-purple',
        projTitle: 'Tích Hợp API Thời Tiết Gửi SMS Hàng Ngày',
        projDesc: 'Workflow n8n tích hợp OpenWeatherMap API để lấy thông tin thời tiết lúc 7h sáng, sau đó dùng Twilio gửi tin nhắn SMS tóm tắt tới điện thoại cá nhân.',
        tech: 'n8n, Weather API, Twilio API',
        learned: 'Cách cấu hình HTTP Request Node và xử lý dữ liệu JSON nested.',
        challenge: 'Đăng ký tài khoản thử nghiệm Twilio bị chặn số điện thoại Việt Nam.',
        demoUrl: 'https://n8n.cloud/workflow/weather-sms',
        sourceUrl: 'https://github.com/quangnam/n8n-weather-twilio',
        fileName: 'weather_sms_workflow.json', fileSize: '18 KB',
        attempt_no: 1,
        tools_used: 'ChatGPT-4o',
        reflection: 'Đã hoàn tất tích hợp thành công, tin nhắn SMS gửi về chính xác hàng ngày.',
        reviewed_by: '', reviewed_at: ''
      }
    };

    function openSubmissionDetail(subId, rowElement) {
      // Remove highlighted rows
      document.querySelectorAll('.submission-row').forEach(row => row.classList.remove('selected-row'));
      
      activeSubmissionId = subId;
      activeRowElement = rowElement;
      rowElement.classList.add('selected-row');

      const data = submissionDetailsData[subId] || submissionDetailsData['submission-1'];

      // Populate text contents
      document.getElementById('drawer-student-name').innerText = data.name;
      document.getElementById('drawer-student-email').innerText = data.email;
      document.getElementById('drawer-student-date').innerText = `Ngày nộp\n${data.date}`;
      
      // Update avatar initials
      const initials = data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const avatarEl = document.getElementById('drawer-student-avatar');
      avatarEl.innerText = initials;
      avatarEl.className = `student-profile-avatar avatar-${subId.split('-')[1]}`;

      // Metadata
      document.getElementById('drawer-sub-course').innerText = data.course;
      document.getElementById('drawer-sub-lesson').innerText = data.lesson;
      document.getElementById('drawer-sub-attempt').innerText = `Lần nộp ${data.attempt_no || 1}`;
      
      const reviewerContainer = document.getElementById('drawer-sub-reviewer-container');
      const reviewerVal = document.getElementById('drawer-sub-reviewer');
      if (data.reviewed_by) {
        reviewerVal.innerText = `${data.reviewed_by} (${data.reviewed_at})`;
        reviewerContainer.style.display = 'block';
      } else {
        reviewerVal.innerText = '-';
        reviewerContainer.style.display = 'none';
      }
      
      const typeBadge = document.getElementById('drawer-sub-type');
      typeBadge.innerText = data.type;
      typeBadge.className = `badge ${data.typeBadge}`;

      const statusBadge = document.getElementById('drawer-sub-status');
      statusBadge.innerText = data.status;
      statusBadge.className = `badge ${data.statusBadge}`;

      // Sub Content
      document.getElementById('drawer-sub-title').innerText = data.projTitle;
      document.getElementById('drawer-sub-desc').innerText = data.projDesc;
      document.getElementById('drawer-sub-tools').innerText = data.tools_used || 'Không sử dụng';
      document.getElementById('drawer-sub-reflection').innerText = data.reflection || 'Không có';
      document.getElementById('drawer-sub-tech').innerText = data.tech;
      document.getElementById('drawer-sub-learned').innerText = data.learned;
      document.getElementById('drawer-sub-challenge').innerText = data.challenge;

      // Links & attachments
      document.getElementById('drawer-demo-link').innerText = data.demoUrl;
      document.getElementById('drawer-demo-link-href').href = data.demoUrl;
      document.getElementById('drawer-source-link').innerText = data.sourceUrl;
      document.getElementById('drawer-source-link-href').href = data.sourceUrl;

      document.getElementById('drawer-file-name').innerText = data.fileName;
      document.getElementById('drawer-file-size').innerText = data.fileSize;

      // Text area reset
      document.getElementById('review-comment').value = '';

      // Show detail panel
      submissionDrawer.classList.remove('drawer-closed');

      // Update Nav Buttons State
      updateNavButtons(rowElement);

      // Smooth scroll to details
      setTimeout(() => {
        submissionDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }

    function updateNavButtons(currentRow) {
      const rows = Array.from(document.querySelectorAll('.submission-row'));
      const currentIndex = rows.indexOf(currentRow);
      
      if (prevBtn) {
        if (currentIndex <= 0) {
          prevBtn.disabled = true;
        } else {
          prevBtn.disabled = false;
        }
      }
      if (nextBtn) {
        if (currentIndex >= rows.length - 1 || currentIndex === -1) {
          nextBtn.disabled = true;
        } else {
          nextBtn.disabled = false;
        }
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentRow = document.querySelector('.submission-row.selected-row');
        if (!currentRow) return;
        const rows = Array.from(document.querySelectorAll('.submission-row'));
        const currentIndex = rows.indexOf(currentRow);
        if (currentIndex > 0) {
          const prevRow = rows[currentIndex - 1];
          const subId = prevRow.getAttribute('data-id');
          openSubmissionDetail(subId, prevRow);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentRow = document.querySelector('.submission-row.selected-row');
        if (!currentRow) return;
        const rows = Array.from(document.querySelectorAll('.submission-row'));
        const currentIndex = rows.indexOf(currentRow);
        if (currentIndex >= 0 && currentIndex < rows.length - 1) {
          const nextRow = rows[currentIndex + 1];
          const subId = nextRow.getAttribute('data-id');
          openSubmissionDetail(subId, nextRow);
        }
      });
    }

    // Interactive grading actions
    const approveBtn = document.getElementById('btn-approve-sub');
    const requestEditBtn = document.getElementById('btn-request-edit-sub');
    const rejectBtn = document.getElementById('btn-reject-sub');

    function updateRowStatus(statusText, badgeClass) {
      if (!activeRowElement) return;
      const statusBadge = activeRowElement.querySelector('.submission-status-badge');
      if (statusBadge) {
        statusBadge.innerText = statusText;
        statusBadge.className = `badge submission-status-badge ${badgeClass}`;
      }
      
      // Update detail drawer badge as well
      const drawerStatusBadge = document.getElementById('drawer-sub-status');
      if (drawerStatusBadge) {
        drawerStatusBadge.innerText = statusText;
        drawerStatusBadge.className = `badge ${badgeClass}`;
      }
    }

    if (approveBtn) {
      approveBtn.addEventListener('click', () => {
        const comment = document.getElementById('review-comment').value.trim();
        const studentName = document.getElementById('drawer-student-name').innerText;
        
        updateRowStatus('Đã duyệt', 'badge-green');
        showToast(`Đã duyệt thành công bài nộp của ${studentName}!`);
        
        // Mock decrement "Chờ duyệt" counters in header dashboard
        const pendingCounter = document.getElementById('counter-pending-review');
        if (pendingCounter) {
          let val = parseInt(pendingCounter.innerText);
          if (val > 0) pendingCounter.innerText = val - 1;
        }
        
        closeAllDrawers();
      });
    }

    if (requestEditBtn) {
      requestEditBtn.addEventListener('click', () => {
        const comment = document.getElementById('review-comment').value.trim();
        const studentName = document.getElementById('drawer-student-name').innerText;
        
        if (!comment) {
          showToast('Vui lòng nhập nhận xét yêu cầu chỉnh sửa.', 'error');
          document.getElementById('review-comment').focus();
          return;
        }

        updateRowStatus('Yêu cầu chỉnh sửa', 'badge-orange');
        showToast(`Đã gửi yêu cầu chỉnh sửa bài nộp tới ${studentName}.`, 'info');
        closeAllDrawers();
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        const comment = document.getElementById('review-comment').value.trim();
        const studentName = document.getElementById('drawer-student-name').innerText;

        if (!comment) {
          showToast('Vui lòng nhập lý do từ chối bài nộp.', 'error');
          document.getElementById('review-comment').focus();
          return;
        }

        updateRowStatus('Từ chối', 'badge-red');
        showToast(`Đã từ chối bài nộp của ${studentName}.`, 'error');
        closeAllDrawers();
      });
    }

    // Check if ID was passed in query params (navigated from Overview page)
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id');
    if (targetId) {
      const targetRow = document.querySelector(`.submission-row[data-id="${targetId}"]`);
      if (targetRow) {
        setTimeout(() => {
          openSubmissionDetail(targetId, targetRow);
        }, 300);
      }
    }
  }

});
