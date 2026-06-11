/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Megaphone,
  Plus,
  Search,
  X,
  Calendar,
  ChevronDown,
  RotateCcw,
  Eye,
  Info,
  FileText,
  BarChart2,
  Pencil,
  Archive,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface AnnouncementItem {
  id: string;
  title: string;
  desc: string;
  scope: 'global' | 'course';
  scopeName: string;
  course: string;
  courseCode: string;
  priority: 'high' | 'medium' | 'low';
  priorityName: string;
  status: 'published' | 'draft' | 'failed';
  statusName: string;
  publishedAt: string;
  author: string;
  recipients: string;
  success: string;
  failed: string;
  slug?: string;
  excerpt?: string;
  publishingMode?: 'immediate' | 'scheduled';
  scheduledTime?: string;
}

interface AnnouncementsProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Announcements({ onToggleSidebar }: AnnouncementsProps) {
  // Master broadcast announcements matching announcements.html mock data
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    {
      id: "ANN-2026-0001",
      title: "Thông báo bảo trì hệ thống",
      desc: "Hệ thống sẽ bảo trì định kỳ vào Chủ nhật, ngày 08/06/2026 từ 02:00 - 04:00 (GMT+7). Trong thời gian này, nền tảng có thể gián đoạn truy cập. Rất mong bạn thông cảm. Cảm ơn bạn đã đồng hành cùng Blueprint!",
      scope: "global",
      scopeName: "Global",
      course: "—",
      courseCode: "",
      priority: "high",
      priorityName: "Cao",
      status: "published",
      statusName: "Đã xuất bản",
      publishedAt: "01/06/2026 10:30",
      author: "Admin User",
      recipients: "1,248",
      success: "1,245 (99.8%)",
      failed: "3 (0.2%)"
    },
    {
      id: "ANN-2026-0002",
      title: "Lịch học buổi live tuần này",
      desc: "Lịch học trực tuyến (Live Session) tuần này sẽ diễn ra vào lúc 20:00 ngày Thứ 5 (11/06/2026). Chủ đề: Giải đáp thắc mắc và Review code Final Project.",
      scope: "course",
      scopeName: "Course",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      priority: "medium",
      priorityName: "Trung bình",
      status: "published",
      statusName: "Đã xuất bản",
      publishedAt: "31/05/2026 19:00",
      author: "Instructor",
      recipients: "38",
      success: "38 (100%)",
      failed: "0 (0%)"
    },
    {
      id: "ANN-2026-0003",
      title: "Ưu đãi 20% cho học viên cũ",
      desc: "Chiến dịch tri ân học viên cũ: Giảm giá 20% khi đăng ký khóa học tiếp theo trong hệ thống. Thời hạn áp dụng từ nay đến hết 30/06/2026.",
      scope: "global",
      scopeName: "Global",
      course: "—",
      courseCode: "",
      priority: "low",
      priorityName: "Thấp",
      status: "draft",
      statusName: "Bản nháp",
      publishedAt: "—",
      author: "Admin User",
      recipients: "0",
      success: "—",
      failed: "—"
    },
    {
      id: "ANN-2026-0004",
      title: "Thông báo lớp học đặc biệt",
      desc: "Gửi thông tin tài liệu lớp học chuyên đề AI Automation đặc biệt cho học viên VIP.",
      scope: "course",
      scopeName: "Course",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      priority: "high",
      priorityName: "Cao",
      status: "failed",
      statusName: "Giao thất bại",
      publishedAt: "18/04/2026 09:20",
      author: "Instructor",
      recipients: "12",
      success: "9 (75%)",
      failed: "3 (25%)"
    },
    {
      id: "ANN-2026-0005",
      title: "Cập nhật bài tập khóa n8n",
      desc: "Đã có bài tập mới cho module 3 khóa học Web Automation n8n.",
      scope: "course",
      scopeName: "Course",
      course: "Web Automation n8n nâng cao",
      courseCode: "n8n",
      priority: "medium",
      priorityName: "Trung bình",
      status: "published",
      statusName: "Đã xuất bản",
      publishedAt: "28/05/2026 15:45",
      author: "Instructor",
      recipients: "42",
      success: "42 (100%)",
      failed: "0 (0%)"
    }
  ]);

  // States
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterScope, setFilterScope] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal open state for Creation/Edition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<AnnouncementItem | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTargetAudience, setFormTargetAudience] = useState<'global' | 'ai' | 'n8n'>('global');
  const [formPublishingMode, setFormPublishingMode] = useState<'immediate' | 'scheduled'>('immediate');
  const [formScheduledTime, setFormScheduledTime] = useState('');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const [lastSelectedAnn, setLastSelectedAnn] = useState<AnnouncementItem | null>(null);
  const activeAnnouncement = announcements.find(a => a.id === selectedId) || lastSelectedAnn;

  React.useEffect(() => {
    const found = announcements.find(a => a.id === selectedId);
    if (found) {
      setLastSelectedAnn(found);
    }
  }, [selectedId, announcements]);

  // Filter logic
  const filteredAnnouncements = announcements.filter(item => {
    if (filterScope && item.scope !== filterScope) return false;
    if (filterCourse && item.courseCode !== filterCourse) return false;
    if (filterStatus && item.status !== filterStatus) return false;
    if (filterPriority && item.priority !== filterPriority) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenCreate = () => {
    setEditItem(null);
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormContent('');
    setFormTargetAudience('global');
    setFormPublishingMode('immediate');
    setFormScheduledTime('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementItem) => {
    setEditItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug || generateSlug(item.title));
    setFormExcerpt(item.excerpt || '');
    setFormContent(item.desc);
    setFormTargetAudience(item.courseCode === 'ai' ? 'ai' : item.courseCode === 'n8n' ? 'n8n' : 'global');
    setFormPublishingMode(item.publishingMode || 'immediate');
    setFormScheduledTime(item.scheduledTime || '');
    setIsModalOpen(true);
  };

  const handleUnpublish = () => {
    if (!editItem) return;
    setAnnouncements(prev => prev.map(a => {
      if (a.id === editItem.id) {
        return {
          ...a,
          status: 'draft',
          statusName: 'Bản nháp',
          publishedAt: '—'
        };
      }
      return a;
    }));
    alert('Đã chuyển trạng thái thông báo thành Bản nháp!');
    setIsModalOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      // Edit
      setAnnouncements(prev => prev.map(a => {
        if (a.id === editItem.id) {
          const courseNames = { 
            global: '—',
            ai: 'AI Agent & Vibe Coding Bootcamp', 
            n8n: 'n8n Automation Only'
          };
          const audienceName = formTargetAudience === 'global' ? 'Global' : 'Course';
          return {
            ...a,
            title: formTitle,
            slug: formSlug,
            excerpt: formExcerpt,
            desc: formContent,
            scope: formTargetAudience === 'global' ? 'global' : 'course',
            scopeName: audienceName,
            course: courseNames[formTargetAudience],
            courseCode: formTargetAudience === 'global' ? '' : formTargetAudience,
            publishingMode: formPublishingMode,
            scheduledTime: formScheduledTime,
            status: formPublishingMode === 'immediate' ? 'published' : 'draft',
            statusName: formPublishingMode === 'immediate' ? 'Đã xuất bản' : 'Bản nháp',
            publishedAt: formPublishingMode === 'immediate' ? (a.publishedAt === '—' ? new Date().toLocaleString('vi-VN') : a.publishedAt) : 'Scheduled'
          };
        }
        return a;
      }));
      alert('Đã cập nhật thông báo thành công!');
    } else {
      // Create new
      const courseNames = { 
        global: '—',
        ai: 'AI Agent & Vibe Coding Bootcamp', 
        n8n: 'n8n Automation Only'
      };
      const newAnn: AnnouncementItem = {
        id: `ANN-2026-000${announcements.length + 1}`,
        title: formTitle,
        slug: formSlug,
        excerpt: formExcerpt,
        desc: formContent,
        scope: formTargetAudience === 'global' ? 'global' : 'course',
        scopeName: formTargetAudience === 'global' ? 'Global' : 'Course',
        course: courseNames[formTargetAudience],
        courseCode: formTargetAudience === 'global' ? '' : formTargetAudience,
        priority: 'medium',
        priorityName: 'Trung bình',
        publishingMode: formPublishingMode,
        scheduledTime: formScheduledTime,
        status: formPublishingMode === 'immediate' ? 'published' : 'draft',
        statusName: formPublishingMode === 'immediate' ? 'Đã xuất bản' : 'Bản nháp',
        publishedAt: formPublishingMode === 'immediate' ? new Date().toLocaleString('vi-VN') : 'Scheduled',
        author: 'Admin User',
        recipients: formTargetAudience === 'global' ? '1,248' : formTargetAudience === 'ai' ? '38' : '42',
        success: formTargetAudience === 'global' ? '1,245 (99.8%)' : formTargetAudience === 'ai' ? '38 (100%)' : '42 (100%)',
        failed: formTargetAudience === 'global' ? '3 (0.2%)' : '0 (0%)'
      };
      setAnnouncements([newAnn, ...announcements]);
      alert('Thông báo mới đã được tạo thành công!');
    }
    setIsModalOpen(false);
  };

  const handleArchive = (id: string) => {
    if (confirm('Bạn có chắc muốn lưu trữ thông báo này?')) {
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, status: 'draft', statusName: 'Bản nháp' } : a));
      alert('Đã lưu trữ thông báo thành công!');
    }
  };

  // KPI calculations
  const kpiPublished = announcements.filter(a => a.status === 'published').length + 23; // Offsets to match mockup numbers
  const kpiDrafts = announcements.filter(a => a.status === 'draft').length + 5;
  const kpiFailed = announcements.filter(a => a.status === 'failed').length + 2;
  const kpiRecipients = "1,248";

  const getPriorityBadgeClass = (priority: string) => {
    if (priority === 'high') return 'badge-red';
    if (priority === 'low') return 'badge-gray';
    return 'badge-orange';
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === 'published') return 'badge-green';
    if (status === 'failed') return 'badge-red';
    return 'badge-gray';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .scope-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 6px;
          border-radius: 4px;
          font-size: 10.5px;
          font-weight: 500;
        }
        .scope-global { background-color: #f0fdf4; color: #16a34a; }
        .scope-course { background-color: #eff6ff; color: #1d4ed8; }
        
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }
        .timeline-item {
          display: flex;
          gap: 10px;
          font-size: 11.5px;
          position: relative;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 14px;
          bottom: -16px;
          width: 1px;
          background-color: var(--border-passive);
        }
        .timeline-item:last-child::before {
          display: none;
        }
        .timeline-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 2px solid var(--border-passive);
          z-index: 1;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .timeline-dot.green { border-color: var(--color-green); background-color: var(--color-green); }
        .timeline-dot.red { border-color: var(--color-red); background-color: var(--color-red); }
        .timeline-dot.blue { border-color: var(--color-indigo); background-color: var(--color-indigo); }
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .timeline-title { font-weight: 600; color: var(--text-primary); }
        .timeline-time { font-size: 10px; color: var(--text-secondary); }
        .timeline-desc { color: var(--text-secondary); font-size: 11px; }

        .action-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 14px;
        }
        
        /* Modal Styles */
        .modal {
          display: flex;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(28, 28, 28, 0.4);
          backdrop-filter: blur(4px);
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <PageHeader
        title="Quản lý thông báo"
        subtitle="Tạo và quản lý thông báo gửi đến học viên và giảng viên."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              className="btn-black" 
              id="create-ann-btn" 
              onClick={handleOpenCreate}
              style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={14} />
              <span>Tạo thông báo</span>
            </button>
          </>
        }
      />

      {/* KPI GRID ROW (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-label">Đã xuất bản</span>
          </div>
          <div class="kpi-value-container" style={{ marginTop: '2px' }}>
            <span class="kpi-value" id="kpi-published" style={{ fontSize: '20px' }}>{kpiPublished}</span>
            <span class="kpi-trend trend-up" style={{ fontSize: '11px' }}>+12%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-label">Bản nháp</span>
          </div>
          <div class="kpi-value-container" style={{ marginTop: '2px' }}>
            <span class="kpi-value" id="kpi-drafts" style={{ fontSize: '20px' }}>{kpiDrafts}</span>
            <span class="kpi-trend trend-up" style={{ fontSize: '11px', color: 'var(--color-indigo)' }}>+2</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-label">Đã lưu trữ</span>
          </div>
          <div class="kpi-value-container" style={{ marginTop: '2px' }}>
            <span class="kpi-value" id="kpi-archived" style={{ fontSize: '20px' }}>4</span>
            <span class="kpi-trend trend-up" style={{ fontSize: '11px', color: 'var(--color-orange)' }}>+1</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-label">Giao thất bại</span>
          </div>
          <div class="kpi-value-container" style={{ marginTop: '2px' }}>
            <span class="kpi-value" id="kpi-failed" style={{ fontSize: '20px', color: 'var(--color-red)' }}>{kpiFailed}</span>
            <span class="kpi-trend trend-down" style={{ fontSize: '11px', color: 'var(--color-red)' }}>-1</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-label">Tổng người nhận</span>
          </div>
          <div class="kpi-value-container" style={{ marginTop: '2px' }}>
            <span class="kpi-value" id="kpi-recipients" style={{ fontSize: '20px' }}>{kpiRecipients}</span>
            <span class="kpi-trend trend-up" style={{ fontSize: '11px' }}>+8%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>
      </section>

      {/* MAIN CONTENT GRID (2/3 Left, 1/3 Right) */}
      <section 
        className={`dashboard-grid ${!selectedId ? 'drawer-closed' : ''}`} 
        id="ann-grid"
      >
        {/* LEFT COLUMN: Filters & Table */}
        <div className="grid-col-left">
          
          <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              
              <div className="form-group" style={{ marginBottom: 0, minWidth: '140px', flex: 1 }}>
                <select 
                  className="form-control form-select" 
                  id="filter-scope" 
                  style={{ padding: '4px 8px' }}
                  value={filterScope}
                  onChange={(e) => setFilterScope(e.target.value)}
                >
                  <option value="">Tất cả scope</option>
                  <option value="global">Global</option>
                  <option value="course">Course</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '150px', flex: 1.2 }}>
                <select 
                  className="form-control form-select" 
                  id="filter-course" 
                  style={{ padding: '4px 8px' }}
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                >
                  <option value="">Tất cả khóa học</option>
                  <option value="ai">AI Agent & Vibe Coding</option>
                  <option value="n8n">Web Automation n8n</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '140px', flex: 1 }}>
                <select 
                  className="form-control form-select" 
                  id="filter-status" 
                  style={{ padding: '4px 8px' }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                  <option value="failed">Giao thất bại</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '120px', flex: 1 }}>
                <select 
                  className="form-control form-select" 
                  id="filter-priority" 
                  style={{ padding: '4px 8px' }}
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="">Tất cả ưu tiên</option>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>

              <button 
                className="btn-secondary" 
                id="filter-reset-btn" 
                style={{ padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', height: '30px' }}
                onClick={() => {
                  setFilterScope('');
                  setFilterCourse('');
                  setFilterStatus('');
                  setFilterPriority('');
                  setSearchQuery('');
                  setSelectedId(null);
                }}
              >
                <RotateCcw style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách thông báo</h2>
                <span className="panel-subtitle" id="ann-count-label">{filteredAnnouncements.length} thông báo</span>
              </div>
            </div>

            <div className="table-container">
              <table id="ann-table">
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Scope</th>
                    <th className="col-secondary">Khóa học</th>
                    <th className="col-secondary">Ưu tiên</th>
                    <th>Trạng thái</th>
                    <th className="col-secondary">Xuất bản lúc</th>
                    <th className="col-secondary">Người tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnnouncements.map((item) => (
                    <tr 
                      key={item.id} 
                      style={{ cursor: 'pointer' }}
                      className={selectedId === item.id ? 'highlight-row' : ''}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600 }}>{item.title}</span>
                          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>/{item.id.toLowerCase()}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`scope-badge ${item.scope === 'global' ? 'scope-global' : 'scope-course'}`}>
                          {item.scopeName}
                        </span>
                      </td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.course}</td>
                      <td className="col-secondary">
                        <span className={`badge ${getPriorityBadgeClass(item.priority)}`}>{item.priorityName}</span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(item.status)}`}>{item.statusName}</span>
                      </td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.publishedAt}</td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.author}</td>
                      <td>
                        <button 
                          className="btn-icon-only view-details-btn" 
                          title="Xem chi tiết"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(item.id);
                          }}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginator */}
            <div className="pagination-container">
              <span id="pagination-label">Hiển thị 1 - {filteredAnnouncements.length} trong {filteredAnnouncements.length} thông báo</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown" defaultValue="20 / trang">
                <option value="20 / trang">20 / trang</option>
              </select>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Detail Drawer */}
        <div className="grid-col-right">
          {activeAnnouncement && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="student-profile-header" style={{ paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="student-profile-name" style={{ fontSize: '15px' }}>Chi tiết thông báo</span>
                  <span className="cert-id" id="drawer-ann-id">{activeAnnouncement.id}</span>
                </div>
                <button 
                  className="btn-icon-only" 
                  id="close-drawer-btn" 
                  style={{ position: 'absolute', right: 0, top: 0 }} 
                  title="Đóng panel"
                  onClick={() => setSelectedId(null)}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`badge ${getStatusBadgeClass(activeAnnouncement.status)}`} id="drawer-status-badge">
                  {activeAnnouncement.statusName.toUpperCase()}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} id="drawer-publish-time">
                  Xuất bản lúc: {activeAnnouncement.publishedAt}
                </span>
              </div>

              {/* General info */}
              <div className="detail-section-title">
                <span>Thông tin chung</span>
                <Info size={13} style={{ marginLeft: '4px' }} />
              </div>
              <div className="detail-list">
                <div className="detail-item" style={{ alignItems: 'flex-start' }}>
                  <span className="detail-label">Tiêu đề</span>
                  <span className="detail-value" id="drawer-title" style={{ fontWeight: 600, maxWidth: '180px', textAlign: 'right' }}>
                    {activeAnnouncement.title}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phạm vi (Scope)</span>
                  <span className={`scope-badge ${activeAnnouncement.scope === 'global' ? 'scope-global' : 'scope-course'}`} id="drawer-scope">
                    {activeAnnouncement.scopeName}
                  </span>
                </div>
                {activeAnnouncement.scope === 'course' && (
                  <div className="detail-item" id="drawer-course-row">
                    <span className="detail-label">Khóa học áp dụng</span>
                    <span className="detail-value" id="drawer-course-name" style={{ fontWeight: 600, textAlign: 'right', maxWidth: '180px' }}>
                      {activeAnnouncement.course}
                    </span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Độ ưu tiên</span>
                  <span className={`badge ${getPriorityBadgeClass(activeAnnouncement.priority)}`} id="drawer-priority">
                    {activeAnnouncement.priorityName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Người tạo</span>
                  <span className="detail-value" id="drawer-author">{activeAnnouncement.author}</span>
                </div>
              </div>

              {/* Content block */}
              <div className="detail-section-title">
                <span>Nội dung thông báo</span>
                <FileText size={13} style={{ marginLeft: '4px' }} />
              </div>
              <div className="note-edit-box" id="drawer-content" style={{ lineHeight: 1.4, padding: '12px', fontSize: '12px' }}>
                {activeAnnouncement.desc}
              </div>

              {/* Statistics */}
              <div className="detail-section-title">
                <span>Thống kê gửi</span>
                <BarChart2 size={13} style={{ marginLeft: '4px' }} />
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Tổng người nhận</span>
                  <span className="detail-value" id="drawer-recipients" style={{ fontWeight: 600 }}>
                    {activeAnnouncement.recipients}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Đã gửi thành công</span>
                  <span className="detail-value" id="drawer-success" style={{ color: 'var(--color-green)', fontWeight: 600 }}>
                    {activeAnnouncement.success}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Giao thất bại</span>
                  <span className="detail-value" id="drawer-failed" style={{ color: 'var(--color-red)', fontWeight: 600 }}>
                    {activeAnnouncement.failed}
                  </span>
                </div>
              </div>

              <div className="action-grid-2x2" style={{ marginTop: '18px', borderTop: '1px solid var(--border-passive)', paddingTop: '12px' }}>
                <button 
                  className="btn-secondary" 
                  id="drawer-edit-btn" 
                  style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center', height: '28px' }}
                  onClick={() => handleOpenEdit(activeAnnouncement)}
                >
                  <Pencil size={12} />
                  <span>Chỉnh sửa</span>
                </button>
                <button 
                  className="btn-secondary" 
                  id="drawer-archive-btn" 
                  style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center', height: '28px' }}
                  onClick={() => handleArchive(activeAnnouncement.id)}
                >
                  <Archive size={12} />
                  <span>Lưu trữ</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </section>

      {/* Create / Edit Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id="create-modal"
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="panel"
              style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '8px', width: '500px', maxWidth: '90%', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-passive)' }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-passive)', paddingBottom: '10px', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }} id="modal-headline">
                {editItem ? 'Edit Broadcast: Announcements Page' : 'Create Broadcast: Announcements Page'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="btn-icon-only" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Announcement Title <span className="required" style={{ color: 'var(--color-red)' }}>*</span>
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="ann-title-input" 
                  placeholder="e.g. Cập nhật tài liệu: Hướng dẫn cấu hình n8n webhook" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    setFormSlug(generateSlug(e.target.value));
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Slug URL <span className="required" style={{ color: 'var(--color-red)' }}>*</span>
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="ann-slug-input" 
                  placeholder="e.g. cap-nhat-tai-lieu-cau-hinh-webhook" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Brief Excerpt</label>
                <textarea 
                  className="form-control form-textarea" 
                  id="ann-excerpt-input" 
                  rows={2}
                  placeholder="Thông báo về việc..." 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px', fontFamily: 'inherit', resize: 'vertical' }}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Detailed Content Text (Markdown / HTML) <span className="required" style={{ color: 'var(--color-red)' }}>*</span>
                </label>
                <textarea 
                  className="form-control form-textarea" 
                  id="ann-content-input" 
                  rows={4} 
                  placeholder="### Cập nhật tài liệu..." 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px', fontFamily: 'inherit', resize: 'vertical' }}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Target Audience</label>
                <select 
                  className="form-control form-select" 
                  id="ann-audience-input" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={formTargetAudience}
                  onChange={(e) => setFormTargetAudience(e.target.value as any)}
                >
                  <option value="global">Toàn bộ học viên (Global)</option>
                  <option value="ai">AI Agent & Vibe Coding Bootcamp</option>
                  <option value="n8n">n8n Automation Only</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Publishing Mode</label>
                <select 
                  className="form-control form-select" 
                  id="ann-pubmode-input" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={formPublishingMode}
                  onChange={(e) => setFormPublishingMode(e.target.value as any)}
                >
                  <option value="immediate">Publish Immediately</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              {formPublishingMode === 'scheduled' && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Scheduled Time Slot</label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    id="ann-schedtime-input" 
                    required 
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                    value={formScheduledTime}
                    onChange={(e) => setFormScheduledTime(e.target.value)}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px', borderTop: '1px solid var(--border-passive)', paddingTop: '12px' }}>
                {editItem && (
                  <button 
                    type="button" 
                    onClick={handleUnpublish} 
                    className="btn-secondary" 
                    style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 500, height: 'auto', marginRight: 'auto', color: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                  >
                    Unpublish
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn-secondary" 
                  style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 500, height: 'auto' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-black" 
                  style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 500, height: 'auto' }}
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </motion.div>
  );
}
