/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Search,
  RotateCcw,
  SlidersHorizontal,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface ResourcesProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: 'article' | 'guide' | 'template' | 'download' | 'case_study';
  typeName: string;
  category: string;
  access: 'free' | 'email_required' | 'student_only';
  accessName: string;
  downloads: number;
  status: 'published' | 'draft' | 'archived';
  statusName: string;
  courseId?: string;
  fileId?: string;
  url?: string;
  thumbnailUrl?: string;
  readingTime?: string;
  is_featured: boolean;
  date: string;
}

export default function Resources({ courses, onToggleSidebar }: ResourcesProps) {
  // Master resource state
  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: "1",
      title: "Hướng dẫn cài đặt n8n local với Docker",
      slug: "huong-dan-cai-dat-n8n-docker",
      excerpt: "Hướng dẫn từng bước thiết lập n8n local trên máy tính cá nhân để tự động hóa công việc.",
      content: "### Hướng dẫn cài đặt n8n local với Docker\n\nDocker là cách tốt nhất để chạy n8n trên máy tính cá nhân. Hãy thực hiện theo các bước sau:\n\n1. Cài đặt Docker Desktop trên máy tính.\n2. Chạy lệnh docker run để khởi chạy container n8n.\n3. Truy cập http://localhost:5678 để bắt đầu thiết kế workflow đầu tiên.",
      type: "guide",
      typeName: "Hướng dẫn",
      category: "DevOps",
      access: "free",
      accessName: "Công khai",
      downloads: 182,
      status: "published",
      statusName: "Đã xuất bản",
      courseId: "n8n",
      fileId: "",
      url: "https://github.com/n8n-docker-local",
      thumbnailUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=300&q=80",
      readingTime: "8 phút",
      is_featured: false,
      date: "04/06/2026"
    },
    {
      id: "2",
      title: "Ebook: Xây dựng AI Agent tự quản lý Email",
      slug: "ebook-ai-agent-quan-ly-email",
      excerpt: "Cuốn sách ngắn hướng dẫn sử dụng LangChain và GPT-4o để phân loại và trả lời tự động email.",
      content: "### Ebook: Xây dựng AI Agent tự quản lý Email\n\nCuốn sách này cung cấp kiến thức nền tảng và hướng dẫn thực hành chi tiết:\n\n- Cách phân loại email đến bằng LLM.\n- Tích hợp n8n với Gmail API.\n- Thiết lập prompt thông minh trả lời email theo văn phong mong muốn.",
      type: "download",
      typeName: "Tài liệu tải xuống",
      category: "AI Agent",
      access: "email_required",
      accessName: "Nhập Email",
      downloads: 148,
      status: "published",
      statusName: "Đã xuất bản",
      courseId: "ai",
      fileId: "file_id_8819281",
      url: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
      readingTime: "25 phút",
      is_featured: true,
      date: "02/06/2026"
    },
    {
      id: "3",
      title: "Prompt Template cho Code Assistant",
      slug: "prompt-template-code-assistant",
      excerpt: "Bộ prompt tối ưu giúp tạo nhanh source code và sửa lỗi bảo mật.",
      content: "### Prompt Template cho Code Assistant\n\nBộ prompt giúp bạn giao tiếp hiệu quả hơn với AI assistant (Cursor, Github Copilot, Claude):\n\n- Prompt viết test case tự động.\n- Prompt refactor code tối ưu hóa hiệu năng.\n- Prompt rà soát lỗi bảo mật.",
      type: "template",
      typeName: "Mẫu Code/Prompt",
      category: "Prompt Engineering",
      access: "student_only",
      accessName: "Học viên",
      downloads: 65,
      status: "published",
      statusName: "Đã xuất bản",
      courseId: "ai",
      fileId: "file_id_990112",
      url: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80",
      readingTime: "3 phút",
      is_featured: false,
      date: "25/05/2026"
    },
    {
      id: "4",
      title: "Báo cáo: Xu hướng Automation trong năm 2026",
      slug: "bao-cao-xu-huong-automation-2026",
      excerpt: "Phân tích xu hướng áp dụng tự động hóa quy trình nghiệp vụ trong các doanh nghiệp.",
      content: "### Báo cáo: Xu hướng Automation trong năm 2026\n\nNội dung đang được soạn thảo...",
      type: "download",
      typeName: "Tài liệu tải xuống",
      category: "Analytics",
      access: "email_required",
      accessName: "Nhập Email",
      downloads: 0,
      status: "draft",
      statusName: "Bản nháp",
      courseId: "",
      fileId: "",
      url: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=300&q=80",
      readingTime: "12 phút",
      is_featured: true,
      date: "07/06/2026"
    }
  ]);

  // Filters inputs
  const [filterType, setFilterType] = useState('');
  const [filterAccess, setFilterAccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Active editor states
  const [editId, setEditId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('Tạo / Cập nhật tài nguyên');

  // Smooth scroll to the editor panel when a resource is selected
  React.useEffect(() => {
    if (editId) {
      const element = document.getElementById('resource-editor-panel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [editId]);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTypeState, setFormTypeState] = useState<'article' | 'guide' | 'template' | 'download' | 'case_study'>('article');
  const [formCategory, setFormCategory] = useState('');
  const [formAccess, setFormAccess] = useState<'free' | 'email_required' | 'student_only'>('free');
  const [formCourse, setFormCourse] = useState('');
  const [formFileId, setFormFileId] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formReadingTime, setFormReadingTime] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [formFeatured, setFormFeatured] = useState(false);

  // Auto Generate slug from Vietnamese string title
  const handleTitleChange = (titleVal: string) => {
    setFormTitle(titleVal);

    // Only auto-generate if we are creating a brand-new resource
    if (!editId) {
      let slug = titleVal.toLowerCase();
      slug = slug.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      slug = slug.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      slug = slug.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      slug = slug.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      slug = slug.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      slug = slug.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      slug = slug.replace(/đ/g, "d");
      slug = slug.replace(/[^a-z0-9 -]/g, ""); // remove invalid chars
      slug = slug.replace(/\s+/g, "-"); // collapse whitespace
      slug = slug.replace(/-+/g, "-"); // collapse dashes
      setFormSlug(slug);
    }
  };

  const handleSelectResource = (item: ResourceItem) => {
    setEditId(item.id);
    setEditorTitle(`Chỉnh sửa: ${item.title}`);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormExcerpt(item.excerpt);
    setFormContent(item.content);
    setFormTypeState(item.type);
    setFormCategory(item.category);
    setFormAccess(item.access);
    let cId = item.courseId || '';
    if (cId === 'course_ai_agent_bootcamp') cId = 'ai';
    if (cId === 'course_n8n_web_automation') cId = 'n8n';
    setFormCourse(cId);
    setFormFileId(item.fileId || '');
    setFormUrl(item.url || '');
    setFormThumbnail(item.thumbnailUrl || '');
    setFormReadingTime(item.readingTime || '');
    setFormStatus(item.status);
    setFormFeatured(item.is_featured);
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setEditorTitle('Tạo Resource mới');
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormContent('');
    setFormTypeState('article');
    setFormCategory('');
    setFormAccess('free');
    setFormCourse('');
    setFormFileId('');
    setFormUrl('');
    setFormThumbnail('');
    setFormReadingTime('');
    setFormStatus('published');
    setFormFeatured(false);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formSlug) {
      alert("Vui lòng điền tiêu đề và slug URL bắt buộc!");
      return;
    }

    const typeNames: Record<string, string> = {
      article: 'Bài viết',
      guide: 'Hướng dẫn',
      template: 'Mẫu Code/Prompt',
      download: 'Tài liệu tải xuống',
      case_study: 'Case Study'
    };

    const accessNames: Record<string, string> = {
      free: 'Công khai',
      email_required: 'Nhập Email',
      student_only: 'Học viên'
    };

    const statusNames: Record<string, string> = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      archived: 'Lưu trữ'
    };

    if (editId) {
      // Edit mode
      setResources(prev => prev.map(r => {
        if (r.id === editId) {
          return {
            ...r,
            title: formTitle,
            slug: formSlug,
            excerpt: formExcerpt,
            content: formContent,
            type: formTypeState,
            typeName: typeNames[formTypeState],
            category: formCategory,
            access: formAccess,
            accessName: accessNames[formAccess],
            courseId: formCourse,
            fileId: formFileId,
            url: formUrl,
            thumbnailUrl: formThumbnail,
            readingTime: formReadingTime,
            status: formStatus,
            statusName: statusNames[formStatus],
            is_featured: formFeatured
          };
        }
        return r;
      }));
      alert(`Đã lưu thay đổi cho tài nguyên "${formTitle}"!`);
    } else {
      // Create mode
      const newId = String(resources.length + 1);
      const newRes: ResourceItem = {
        id: newId,
        title: formTitle,
        slug: formSlug,
        excerpt: formExcerpt,
        content: formContent,
        type: formTypeState,
        typeName: typeNames[formTypeState],
        category: formCategory,
        access: formAccess,
        accessName: accessNames[formAccess],
        downloads: 0,
        status: formStatus,
        statusName: statusNames[formStatus],
        courseId: formCourse,
        fileId: formFileId,
        url: formUrl,
        thumbnailUrl: formThumbnail,
        readingTime: formReadingTime,
        is_featured: formFeatured,
        date: new Date().toLocaleDateString('vi-VN')
      };
      setResources([newRes, ...resources]);
      alert(`Đã thêm thành công tài nguyên mới "${formTitle}"!`);
    }

    setEditorTitle('Tạo / Cập nhật tài nguyên');
    handleOpenCreate();
  };

  const handleDeleteResource = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có tin chắc muốn xóa vĩnh viễn tài nguyên này?")) {
      setResources(prev => prev.filter(r => r.id !== id));
      handleOpenCreate();
    }
  };

  // Computations
  const totalCount = 24 + resources.length - 4;
  const publishedCount = 18 + resources.filter(r => r.status === 'published').length - 3;
  const draftCount = 4 + resources.filter(r => r.status === 'draft').length - 1;
  const leadsCount = 340;
  const studentOnlyCount = 2 + resources.filter(r => r.access === 'student_only').length - 1;

  const filteredResources = resources.filter(r => {
    const matchesType = !filterType || r.type === filterType;
    const matchesAccess = !filterAccess || r.access === filterAccess;
    const matchesQuery = !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesAccess && matchesQuery;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .resource-title-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .resource-meta-sub {
          font-size: 10px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        
        .badge-blue { background-color: #eff6ff; color: #1e40af; }
        .badge-amber { background-color: #fef3c7; color: #92400e; }
        .badge-purple { background-color: #faf5ff; color: #6b21a8; }
        
        .detail-section-title {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 16px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 4px;
        }

        #resources-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 24px !important;
        }
        #resources-grid .grid-col-left,
        #resources-grid .grid-col-right {
          width: 100% !important;
          max-width: 100% !important;
        }
        #resources-grid table th.col-secondary,
        #resources-grid table td.col-secondary {
          display: table-cell !important;
        }
        @media (max-width: 991px) {
          #resources-grid table th.col-secondary,
          #resources-grid table td.col-secondary {
            display: none !important;
          }
        }

        .resource-form-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }
        .col-span-12 { grid-column: span 12; }
        .col-span-8 { grid-column: span 8; }
        .col-span-6 { grid-column: span 6; }
        .col-span-4 { grid-column: span 4; }
        .col-span-3 { grid-column: span 3; }
        .col-span-2 { grid-column: span 2; }
        
        @media (max-width: 768px) {
          .resource-form-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
        }

        .form-checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
        }

        .form-actions-right {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          border-top: 1px solid var(--border-passive);
          padding-top: 16px;
        }
        
        .form-actions-right button {
          min-width: 100px;
        }
      `}</style>
      <PageHeader
        title="Quản lý Resources Hub"
        subtitle="Thiết lập, xuất bản bài viết, ebook và tài liệu học miễn phí/bảo mật."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <button 
            onClick={handleOpenCreate}
            className="btn-black"
            id="add-resource-btn"
            style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={14} />
            <span>Tạo Resource</span>
          </button>
        }
      />

      {/* KPI Row (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng tài nguyên</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{totalCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>tài liệu trong thư viện</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Đã xuất bản</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-green)' }}>{publishedCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>công khai trên website</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Bản nháp</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange)' }}>{draftCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>đang biên tập nội dung</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Leads Captured</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-indigo)' }}>{leadsCount}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>
              <ArrowUpRight size={12} />
              +12%
            </span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>thu thập từ form email</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Chỉ học viên</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{studentOnlyCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>cần enrollment active</span>
        </div>
      </section>

      <section className="dashboard-grid" id="resources-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* LEFT COLUMN: Resource List Panel */}
        <div className="grid-col-left" style={{ width: '100%', maxWidth: '100%' }}>
          
          {/* Filter panel */}
          <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                
                {/* Search bar */}
                <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Tìm tiêu đề, danh mục, tóm tắt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: '32px', height: '32px', fontSize: '12.5px', width: '100%' }}
                  />
                </div>

                {/* Advanced Filters Toggle Button */}
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`btn-secondary ${showAdvancedFilters ? 'active' : ''}`}
                  style={{ padding: '0 12px', height: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                >
                  <SlidersHorizontal size={13} />
                  <span>Bộ lọc</span>
                </button>

                {/* Reset button */}
                {(filterType || filterAccess || searchQuery) && (
                  <button
                    onClick={() => {
                      setFilterType('');
                      setFilterAccess('');
                      setSearchQuery('');
                    }}
                    className="btn-secondary"
                    style={{ padding: '0 10px', height: '32px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    title="Reset filters"
                  >
                    <RotateCcw size={12} />
                    <span style={{ fontSize: '12px' }}>Đặt lại</span>
                  </button>
                )}
              </div>

              {/* Collapsible Select Filters row */}
              {showAdvancedFilters && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px dashed var(--border-passive)' }}>
                  <div className="form-group" style={{ marginBottom: 0, minWidth: '160px' }}>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="form-control form-select"
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                      id="filter-type"
                    >
                      <option value="">Tất cả loại hình</option>
                      <option value="article">Bài viết (Article)</option>
                      <option value="guide">Hướng dẫn (Guide)</option>
                      <option value="template">Mẫu Code / Prompt</option>
                      <option value="download">Tài liệu tải xuống (Download)</option>
                      <option value="case_study">Case Study</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '160px' }}>
                    <select
                      value={filterAccess}
                      onChange={(e) => setFilterAccess(e.target.value)}
                      className="form-control form-select"
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                      id="filter-access"
                    >
                      <option value="">Tất cả quyền truy cập</option>
                      <option value="free">Công khai (Free)</option>
                      <option value="email_required">Cần nhập Email (Lead capture)</option>
                      <option value="student_only">Chỉ học viên (Student Only)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table Panel */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Tài nguyên học thuật</h2>
                <span className="panel-subtitle" id="resources-count-label">
                  {filteredResources.length} tài nguyên
                </span>
              </div>
            </div>

            <div className="table-container">
              <table id="resources-table">
                <thead>
                  <tr>
                    <th>Tên tài nguyên</th>
                    <th className="col-secondary">Thể loại</th>
                    <th className="col-secondary">Quyền truy cập</th>
                    <th className="col-secondary">Lượt tải/Xem</th>
                    <th>Trạng thái</th>
                    <th className="col-secondary">Ngày đăng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                        Không tìm thấy tài nguyên nào phù hợp.
                      </td>
                    </tr>
                  ) : (
                    filteredResources.map((item) => {
                      let typeClass = 'badge-blue';
                      if (item.type === 'download' || item.type === 'case_study') {
                        typeClass = 'badge-purple';
                      } else if (item.type === 'template') {
                        typeClass = 'badge-amber';
                      }

                      let statusClass = 'badge-gray';
                      if (item.status === 'published') statusClass = 'badge-green';
                      else if (item.status === 'draft') statusClass = 'badge-orange';

                      let accessText = item.accessName;
                      if (item.access === 'email_required') accessText = '🔑 ' + accessText;
                      if (item.access === 'student_only') accessText = '🎓 ' + accessText;

                      return (
                        <tr
                          key={item.id}
                          onClick={() => handleSelectResource(item)}
                          style={{ cursor: 'pointer' }}
                          className={editId === item.id ? 'highlight-row' : ''}
                        >
                          <td>
                            <div className="resource-title-cell">
                              <span style={{ fontWeight: 600 }}>
                                {item.title} {item.is_featured && <span style={{ color: 'var(--color-orange)' }} title="Featured">★</span>}
                              </span>
                              <span className="resource-meta-sub">/{item.slug}</span>
                            </div>
                          </td>
                          <td className="col-secondary">
                            <span className={`badge ${typeClass}`}>{item.typeName}</span>
                          </td>
                          <td className="col-secondary">
                            <span style={{ fontSize: '11.5px', fontWeight: 500 }}>{accessText}</span>
                          </td>
                          <td className="col-secondary" style={{ fontSize: '11.5px', fontWeight: 600, textAlign: 'center' }}>
                            {item.downloads}
                          </td>
                          <td>
                            <span className={`badge ${statusClass}`}>{item.statusName}</span>
                          </td>
                          <td className="col-secondary" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            {item.date}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <span id="pagination-label">
                Hiển thị 1 - {filteredResources.length} trong {filteredResources.length} tài nguyên
              </span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown" defaultValue="10 / trang">
                <option value="10 / trang">10 / trang</option>
              </select>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Slide Form Drawer / Editor */}
        <div className="grid-col-right" style={{ width: '100%', maxWidth: '100%' }}>
          <div className="panel" id="resource-editor-panel">
            <div className="panel-header" style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
              <h2 className="panel-title" id="editor-title" style={{ fontSize: '13.5px' }}>
                {editorTitle}
              </h2>
            </div>
            
            <form id="resource-form" onSubmit={handleSaveResource}>
              <div className="resource-form-grid">
                {/* Row 1: Title & Slug */}
                <div className="form-group col-span-6">
                  <label className="form-label" htmlFor="res-title">Tiêu đề tài nguyên <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-title"
                    required
                    placeholder="Ví dụ: Cẩm nang Prompt Engineering"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-6">
                  <label className="form-label" htmlFor="res-slug">Slug URL <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-slug"
                    required
                    placeholder="cam-nang-prompt-engineering"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                  />
                </div>

                {/* Row 2: Excerpt */}
                <div className="form-group col-span-12">
                  <label className="form-label" htmlFor="res-excerpt">Mô tả ngắn (Excerpt)</label>
                  <textarea
                    className="form-control"
                    id="res-excerpt"
                    style={{ height: '50px' }}
                    placeholder="Tóm tắt nội dung tài liệu..."
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                  />
                </div>

                {/* Row 3: Content Body */}
                <div className="form-group col-span-12">
                  <label className="form-label" htmlFor="res-content">Nội dung chi tiết (Markdown / HTML)</label>
                  <textarea
                    className="form-control form-textarea"
                    id="res-content"
                    style={{ height: '180px' }}
                    placeholder="Nhập nội dung chi tiết bài viết hoặc tài liệu học thuật ở đây..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                  />
                </div>

                {/* Row 4: Type, Category, Access */}
                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-type">Loại tài nguyên</label>
                  <select
                    className="form-control form-select"
                    id="res-type"
                    value={formTypeState}
                    onChange={(e) => setFormTypeState(e.target.value as any)}
                  >
                    <option value="article">Bài viết (Article)</option>
                    <option value="guide">Hướng dẫn</option>
                    <option value="template">Mẫu Code/Prompt</option>
                    <option value="download">Tài liệu tải xuống (Download)</option>
                    <option value="case_study">Case Study</option>
                  </select>
                </div>

                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-category">Nhóm nội dung (Category)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-category"
                    placeholder="Ví dụ: AI Agent, DevOps, Web"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-access">Quyền truy cập</label>
                  <select
                    className="form-control form-select"
                    id="res-access"
                    value={formAccess}
                    onChange={(e) => setFormAccess(e.target.value as any)}
                  >
                    <option value="free">Công khai (Free)</option>
                    <option value="email_required">Cần nhập Email (Lead capture)</option>
                    <option value="student_only">Chỉ học viên đăng ký khóa (Student only)</option>
                  </select>
                </div>

                {/* Row 5: Course Link, File ID, External URL */}
                <div className="form-group col-span-4" id="course-link-group">
                  <label className="form-label" htmlFor="res-course">Khóa học liên kết</label>
                  <select
                    className="form-control form-select"
                    id="res-course"
                    value={formCourse}
                    onChange={(e) => setFormCourse(e.target.value)}
                  >
                    <option value="">Không có (Global)</option>
                    {courses.map((c) => {
                      let val = c.id;
                      if (c.id === 'course_ai_agent_bootcamp') val = 'ai';
                      else if (c.id === 'course_n8n_web_automation') val = 'n8n';
                      return (
                        <option key={c.id} value={val}>
                          {c.id === 'course_ai_agent_bootcamp' ? 'AI Agent & Vibe Coding Bootcamp' : (c.id === 'course_n8n_web_automation' ? 'Web Automation n8n nâng cao' : c.name)}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-file-id">File đính kèm (file_id)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-file-id"
                    placeholder="file_id_123456"
                    value={formFileId}
                    onChange={(e) => setFormFileId(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-url">Đường dẫn ngoài (URL)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-url"
                    placeholder="https://drive.google.com/..."
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                  />
                </div>

                {/* Row 6: Thumbnail, Reading Time, Status, Featured */}
                <div className="form-group col-span-4">
                  <label className="form-label" htmlFor="res-thumbnail-url">Ảnh đại diện (Thumbnail URL)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-thumbnail-url"
                    placeholder="https://images.unsplash.com/... hoặc /images/..."
                    value={formThumbnail}
                    onChange={(e) => setFormThumbnail(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-2">
                  <label className="form-label" htmlFor="res-reading-time">Thời gian đọc</label>
                  <input
                    type="text"
                    className="form-control"
                    id="res-reading-time"
                    placeholder="Ví dụ: 5 phút"
                    value={formReadingTime}
                    onChange={(e) => setFormReadingTime(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-3">
                  <label className="form-label" htmlFor="res-status">Trạng thái</label>
                  <select
                    className="form-control form-select"
                    id="res-status"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="published">Đã xuất bản (Published)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="archived">Lưu trữ (Archived)</option>
                  </select>
                </div>

                <div className="col-span-3 form-checkbox-group">
                  <label className="form-checkbox-label" style={{ marginTop: 0, fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      id="res-featured"
                      style={{ marginRight: '4px' }}
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                    />
                    Hiển thị nổi bật
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions-right">
                {editId && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteResource(editId, e)}
                    className="btn-red-outline h-8 px-3 flex items-center gap-1 mr-auto"
                  >
                    <Trash2 size={12} />
                    <span>Xóa</span>
                  </button>
                )}
                <button
                  type="button"
                  id="cancel-form-btn"
                  onClick={handleOpenCreate}
                  className="btn-secondary"
                  style={{ height: '32px', fontSize: '12.5px' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-black"
                  style={{ height: '32px', fontSize: '12.5px' }}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
