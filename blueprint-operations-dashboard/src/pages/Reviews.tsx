/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  X,
  Calendar,
  ChevronDown,
  Download,
  Star,
  User,
  Check,
  EyeOff,
  Trash2
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface ModerationLog {
  action: string;
  actor: string;
  time: string;
  note: string;
}

interface ReviewItem {
  id: string;
  name: string;
  email: string;
  avatarClass: string;
  avatarText: string;
  course: string;
  courseCode: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'hidden';
  statusName: string;
  date: string;
  reply: string;
  moderationLogs?: ModerationLog[];
}

interface ReviewsProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Reviews({ courses, onToggleSidebar }: ReviewsProps) {
  // Mock Data matching reviews.html
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "REV-2026-0001",
      name: "Võ Thị Khánh",
      email: "khanh.vo@email.com",
      avatarClass: "avatar-vt",
      avatarText: "VT",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      rating: 5,
      comment: "Khóa học rất thực tế. Giảng viên giải thích cặn kẽ và các bài thực hành giúp tôi tự xây dựng được Agent chạy tự động.",
      status: "pending",
      statusName: "Chờ duyệt",
      date: "05/06/2026 14:22",
      reply: "",
      moderationLogs: []
    },
    {
      id: "REV-2026-0002",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      avatarClass: "avatar-nv",
      avatarText: "NV",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      rating: 5,
      comment: "Tuyệt vời! Nội dung học cập nhật những tool mới nhất như Cursor AI, v0 dev. Rất đáng tiền.",
      status: "approved",
      statusName: "Đã duyệt",
      date: "04/06/2026 09:15",
      reply: "Cảm ơn bạn đã phản hồi! Chúc bạn ứng dụng tốt các tool AI vào công việc.",
      moderationLogs: [
        {
          action: "Phê duyệt",
          actor: "Admin User",
          time: "04/06/2026 09:15",
          note: "Hệ thống tự động duyệt dựa trên cấu hình tin cậy."
        }
      ]
    },
    {
      id: "REV-2026-0003",
      name: "Trần Thị Bình",
      email: "binh.tran@email.com",
      avatarClass: "avatar-tt",
      avatarText: "TT",
      course: "Web Automation n8n nâng cao",
      courseCode: "n8n",
      rating: 4,
      comment: "Bài thực hành hơi nhanh một chút đối với người mới. Nhưng workflow mẫu rất chất lượng.",
      status: "approved",
      statusName: "Đã duyệt",
      date: "02/06/2026 18:40",
      reply: "",
      moderationLogs: [
        {
          action: "Phê duyệt",
          actor: "Admin User",
          time: "02/06/2026 18:40",
          note: "Hệ thống tự động duyệt dựa trên cấu hình tin cậy."
        }
      ]
    },
    {
      id: "REV-2026-0004",
      name: "Lê Minh Châu",
      email: "chau.le@email.com",
      avatarClass: "avatar-lm",
      avatarText: "LM",
      course: "Web Automation n8n nâng cao",
      courseCode: "n8n",
      rating: 2,
      comment: "Hệ thống nộp bài lỗi liên tục, không chấm được điểm.",
      status: "hidden",
      statusName: "Đã ẩn",
      date: "28/05/2026 11:10",
      reply: "Chào Châu, ban kỹ thuật đã liên hệ hỗ trợ riêng để kiểm tra tài khoản nộp bài của bạn rồi nhé.",
      moderationLogs: [
        {
          action: "Ẩn review",
          actor: "Admin User",
          time: "28/05/2026 11:10",
          note: "Ẩn review do nội dung khiếu nại kỹ thuật hệ thống LMS đang xử lý."
        }
      ]
    }
  ]);

  // Filters inputs
  const [filterCourse, setFilterCourse] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Selected item detail
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [lastSelectedReview, setLastSelectedReview] = useState<ReviewItem | null>(null);
  const activeReview = (activeIndex >= 0 ? reviews[activeIndex] : null) || lastSelectedReview;

  React.useEffect(() => {
    if (activeIndex >= 0 && reviews[activeIndex]) {
      setLastSelectedReview(reviews[activeIndex]);
    }
  }, [activeIndex, reviews]);

  // Reply state
  const [replyInput, setReplyInput] = useState('');
  const [moderationNoteInput, setModerationNoteInput] = useState('');

  const openDrawer = (item: ReviewItem, index: number) => {
    setActiveIndex(index);
    setReplyInput(item.reply);
    setModerationNoteInput('');
  };

  const handleSaveReply = () => {
    if (activeIndex === -1) return;
    setReviews(prev => prev.map((item, idx) => {
      if (idx === activeIndex) {
        return { ...item, reply: replyInput.trim() };
      }
      return item;
    }));
    alert('Đã lưu phản hồi đánh giá.');
  };

  const handleApprove = () => {
    if (activeIndex === -1) return;
    const noteVal = moderationNoteInput.trim() || 'Phê duyệt hiển thị đánh giá công khai.';
    setReviews(prev => prev.map((item, idx) => {
      if (idx === activeIndex) {
        const logs = item.moderationLogs ? [...item.moderationLogs] : [];
        logs.unshift({
          action: 'Phê duyệt',
          actor: 'Admin User',
          time: new Date().toLocaleString('vi-VN'),
          note: noteVal
        });
        return {
          ...item,
          status: 'approved',
          statusName: 'Đã duyệt',
          moderationLogs: logs
        };
      }
      return item;
    }));
    alert('Đã phê duyệt đánh giá thành công.');
  };

  const handleHide = () => {
    if (activeIndex === -1) return;
    const noteVal = moderationNoteInput.trim() || 'Ẩn đánh giá khỏi trang chủ.';
    setReviews(prev => prev.map((item, idx) => {
      if (idx === activeIndex) {
        const logs = item.moderationLogs ? [...item.moderationLogs] : [];
        logs.unshift({
          action: 'Ẩn review',
          actor: 'Admin User',
          time: new Date().toLocaleString('vi-VN'),
          note: noteVal
        });
        return {
          ...item,
          status: 'hidden',
          statusName: 'Đã ẩn',
          moderationLogs: logs
        };
      }
      return item;
    }));
    alert('Đã ẩn đánh giá.');
  };

  const handleReject = () => {
    if (activeIndex === -1) return;
    const noteVal = moderationNoteInput.trim() || 'Từ chối đánh giá do nội dung vi phạm hoặc spam.';
    if (confirm(`Bạn có chắc muốn từ chối/ẩn đánh giá của học viên ${activeReview?.name}?`)) {
      setReviews(prev => prev.map((item, idx) => {
        if (idx === activeIndex) {
          const logs = item.moderationLogs ? [...item.moderationLogs] : [];
          logs.unshift({
            action: 'Ẩn review',
            actor: 'Admin User',
            time: new Date().toLocaleString('vi-VN'),
            note: noteVal
          });
          return {
            ...item,
            status: 'hidden',
            statusName: 'Đã ẩn',
            moderationLogs: logs
          };
        }
        return item;
      }));
      alert('Đã từ chối/ẩn đánh giá.');
    }
  };

  const handleResetFilters = () => {
    setFilterCourse('');
    setFilterRating('');
    setFilterStatus('');
    setSearchQuery('');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={s <= rating ? "filled" : "empty"}
          />
        ))}
        <span className="rating-number">{rating}.0</span>
      </div>
    );
  };

  // Filter logic
  const filteredReviews = reviews.filter(item => {
    const matchesCourse = !filterCourse || item.courseCode === filterCourse;
    
    let matchesRating = true;
    if (filterRating) {
      if (filterRating === '5') matchesRating = item.rating === 5;
      else if (filterRating === '4') matchesRating = item.rating === 4;
      else if (filterRating === '3') matchesRating = item.rating <= 3;
    }

    const matchesStatus = !filterStatus || item.status === filterStatus;
    
    const matchesQuery = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCourse && matchesRating && matchesStatus && matchesQuery;
  });

  const handleExportReviews = () => {
    // CSV Header
    const headers = ["ID", "Học viên", "Email", "Khóa học", "Mã khóa học", "Đánh giá", "Bình luận", "Trạng thái", "Ngày tạo"];
    
    // CSV Rows
    const rows = filteredReviews.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.course.replace(/"/g, '""')}"`,
      r.courseCode,
      r.rating,
      `"${r.comment.replace(/"/g, '""')}"`,
      r.statusName,
      r.date
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // Use UTF-8 BOM to ensure Excel opens Vietnamese characters correctly
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reviews_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .star-rating {
          display: inline-flex;
          gap: 2px;
          align-items: center;
        }
        .star-rating svg {
          width: 13px;
          height: 13px;
          stroke-width: 1.5px;
        }
        .star-rating svg.filled {
          fill: #f59e0b;
          stroke: #d97706;
        }
        .star-rating svg.empty {
          fill: #f3f4f6;
          stroke: #d1d5db;
        }
        
        .rating-number {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          margin-left: 4px;
        }
        
        .comment-text {
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .reply-box {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 10px;
          font-size: 11.5px;
          color: var(--text-secondary);
          margin-top: 8px;
          position: relative;
        }
        .reply-box-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .action-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 14px;
        }
      `}</style>

      <PageHeader
        title="Kiểm duyệt đánh giá"
        subtitle="Quản lý, phản hồi và kiểm duyệt các đánh giá khóa học từ học viên."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExportReviews}
              className="btn-black h-8 px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* KPI GRID ROW (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Tổng đánh giá</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>1,248</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+12%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Đánh giá 5★</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>856</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+15%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Đánh giá 4★</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>284</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+8%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Rating trung bình</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>4.7★</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+0.1</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Chờ kiểm duyệt</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange-dark)' }}>{reviews.filter(r => r.status === 'pending').length}</span>
            <span className="badge badge-orange" style={{ fontSize: '9.5px', padding: '2px 4px' }}>Cần duyệt</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>hành động cần xử lý</span>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section
        className={`dashboard-grid ${activeIndex >= 0 ? '' : 'drawer-closed'}`}
        id="reviews-grid"
      >
        {/* LEFT COLUMN: Filters & Table */}
        <div className="grid-col-left">
          <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                
                {/* Search bar */}
                <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Tìm tên học viên, email, nội dung..."
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
                {(filterCourse || filterRating || filterStatus || searchQuery) && (
                  <button
                    onClick={handleResetFilters}
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
                      className="form-control form-select"
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả khóa học</option>
                      <option value="ai">AI Agent & Vibe Coding</option>
                      <option value="n8n">Web Automation n8n</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '120px' }}>
                    <select
                      className="form-control form-select"
                      value={filterRating}
                      onChange={(e) => setFilterRating(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả rating</option>
                      <option value="5">5 sao</option>
                      <option value="4">4 sao</option>
                      <option value="3">3 sao và dưới</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '140px' }}>
                    <select
                      className="form-control form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="hidden">Đã ẩn</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách đánh giá</h2>
                <span className="panel-subtitle">{filteredReviews.length} đánh giá</span>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th className="col-secondary">Khóa học</th>
                    <th>Đánh giá</th>
                    <th className="col-secondary">Nhận xét</th>
                    <th>Trạng thái</th>
                    <th className="col-secondary">Ngày đánh giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                        Không tìm thấy đánh giá nào khớp
                      </td>
                    </tr>
                  ) : (
                    filteredReviews.map((item, index) => {
                      let statusClass = 'badge-gray';
                      if (item.status === 'approved') statusClass = 'badge-green';
                      else if (item.status === 'pending') statusClass = 'badge-orange';
                      else if (item.status === 'hidden') statusClass = 'badge-red';

                      return (
                        <tr
                          key={item.id}
                          style={{ cursor: 'pointer' }}
                          className={activeIndex === index ? 'highlight-row' : ''}
                          onClick={() => openDrawer(item, index)}
                        >
                          <td>
                            <div className="col-student">
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="student-name">{item.name}</span>
                                <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{item.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="col-secondary">
                            <span className="course-title" style={{ fontWeight: 500 }}>{item.course}</span>
                          </td>
                          <td>{renderStars(item.rating)}</td>
                          <td className="col-secondary">
                            <div className="comment-text" title={item.comment}>{item.comment}</div>
                          </td>
                          <td><span className={`badge ${statusClass}`}>{item.statusName}</span></td>
                          <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.date}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
                              <button className="btn-icon-only" title="Xem chi tiết & Kiểm duyệt" onClick={() => openDrawer(item, index)}>
                                <Eye size={12} />
                              </button>
                              <button className="btn-icon-only" title="Hành động khác">
                                <MoreHorizontal size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginator */}
            <div className="pagination-container">
              <span>Hiển thị 1 - {filteredReviews.length} trong {filteredReviews.length} đánh giá</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown">
                <option>10 / trang</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Detail Drawer */}
        {activeReview && (
          <div className="grid-col-right">
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="student-profile-header" style={{ paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="student-profile-name" style={{ fontSize: '15px' }}>Chi tiết kiểm duyệt</span>
                  <span className="cert-id">{activeReview.id}</span>
                </div>
                <button
                  className="btn-icon-only"
                  style={{ position: 'absolute', right: 0, top: 0 }}
                  title="Đóng panel"
                  onClick={() => setActiveIndex(-1)}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`badge ${
                  activeReview.status === 'approved' ? 'badge-green' : activeReview.status === 'pending' ? 'badge-orange' : 'badge-red'
                }`}>
                  {activeReview.statusName.toUpperCase()}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ngày gửi: {activeReview.date}</span>
              </div>

              {/* Reviewer Info */}
              <div className="detail-section-title">
                <span>Học viên đánh giá</span>
                <User style={{ width: '13px', height: '13px' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <div className={`avatar ${activeReview.avatarClass}`} style={{ width: '36px', height: '36px', fontSize: '13px' }}>
                  {activeReview.avatarText}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{activeReview.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{activeReview.email}</span>
                </div>
              </div>

              <div className="detail-list" style={{ marginTop: '12px' }}>
                <div className="detail-item" style={{ alignItems: 'flex-start' }}>
                  <span className="detail-label">Khóa học</span>
                  <span className="detail-value" style={{ fontWeight: 600, maxWidth: '180px', textAlign: 'right' }}>
                    {activeReview.course}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Độ lớn đánh giá</span>
                  {renderStars(activeReview.rating)}
                </div>
              </div>

              {/* Content block */}
              <div className="detail-section-title">
                <span>Nhận xét chi tiết</span>
              </div>
              <div className="note-edit-box" style={{ lineHeight: 1.4, padding: '12px', fontSize: '12px', fontStyle: 'italic' }}>
                "{activeReview.comment}"
              </div>

              {/* Reply Form */}
              <div className="detail-section-title">
                <span>Phản hồi đánh giá (Admin/Instructor)</span>
              </div>
              <div className="form-group" style={{ marginTop: '6px', marginBottom: 0 }}>
                <textarea
                  className="form-control"
                  rows={3}
                  style={{ fontSize: '12px', padding: '8px' }}
                  placeholder="Nhập phản hồi công khai của giảng viên hoặc ban quản trị..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <button
                    className="btn-small"
                    style={{ height: '24px', padding: '0 8px', fontSize: '10px' }}
                    onClick={handleSaveReply}
                  >
                    <span>Lưu phản hồi</span>
                  </button>
                </div>
              </div>

              {activeReview.reply && (
                <div className="reply-box">
                  <div className="reply-box-title">
                    <span>Phản hồi đã lưu:</span>
                  </div>
                  <span>{activeReview.reply}</span>
                </div>
              )}

              {/* Moderation Notes */}
              <div className="detail-section-title" style={{ marginTop: '14px' }}>
                <span>Ghi chú duyệt & Lịch sử</span>
              </div>
              
              <div className="form-group" style={{ marginTop: '6px' }}>
                <label className="form-label" style={{ fontSize: '11px' }}>Ghi chú duyệt (Nội bộ)</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 10px', fontSize: '12px' }}
                  placeholder="Nhập lý do ẩn hoặc lưu ý khác..."
                  value={moderationNoteInput}
                  onChange={(e) => setModerationNoteInput(e.target.value)}
                />
              </div>

              <div className="timeline" style={{ marginTop: '12px', fontSize: '11px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                {activeReview.moderationLogs && activeReview.moderationLogs.length > 0 ? (
                  activeReview.moderationLogs.map((log, lIdx) => {
                    let dotColor = 'gray';
                    if (log.action.includes('duyệt') || log.action.includes('Approve')) dotColor = 'green';
                    else if (log.action.includes('Ẩn') || log.action.includes('Hide')) dotColor = 'orange';
                    else dotColor = 'red';

                    return (
                      <div className="timeline-item" key={lIdx} style={{ marginBottom: '8px' }}>
                        <div className={`timeline-dot ${dotColor}`}></div>
                        <div className="timeline-content" style={{ paddingLeft: '12px' }}>
                          <span className="timeline-title" style={{ fontWeight: 600, display: 'block' }}>{log.action} bởi {log.actor}</span>
                          <span className="timeline-time" style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>{log.time}</span>
                          <span className="timeline-desc" style={{ color: 'var(--text-primary)', display: 'block', marginTop: '2px' }}>{log.note}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '11px' }}>Chưa có lịch sử xử lý.</span>
                )}
              </div>

              {/* Moderate Actions */}
              <div className="action-grid-3" style={{ marginTop: '18px', borderTop: '1px solid var(--border-passive)', paddingTop: '12px' }}>
                <button
                  className="btn-black"
                  style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center', height: '28px', backgroundColor: 'var(--color-green)', borderColor: 'var(--color-green)' }}
                  onClick={handleApprove}
                >
                  <Check style={{ width: '12px', height: '12px' }} />
                  <span>Phê duyệt</span>
                </button>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center', height: '28px' }}
                  onClick={handleHide}
                >
                  <EyeOff style={{ width: '12px', height: '12px' }} />
                  <span>Ẩn review</span>
                </button>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center', height: '28px', color: 'var(--color-red)', borderColor: 'var(--border-passive)' }}
                  onClick={handleReject}
                >
                  <Trash2 style={{ width: '12px', height: '12px' }} />
                  <span>Từ chối</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}
